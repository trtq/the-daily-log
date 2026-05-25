import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import { initDb, deleteAllEntries } from "@/utils/db/queries";
import { loadEntries, clearEntries } from "@/store/slices/entriesSlice";
import { setAuthenticated, clearAuth } from "@/store/slices/authSlice";
import { runSync, resetSync } from "@/store/slices/syncSlice";
import { supabase } from "@/utils/supabase/client";
import type { AppDispatch } from "@/store/store";

export const DbWrapper = ({ children }: { children: React.ReactNode }) => {
  const [dbReady, setDbReady] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  // tracks whether INITIAL_SESSION fired with an active session,
  // so we can trigger sync only after both DB and auth are confirmed ready
  const initialSessionHadSession = useRef(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    initDb()
      .then(() => dispatch(loadEntries()))
      .catch(console.error)
      .finally(() => setDbReady(true));
  }, [dispatch]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        if (session) {
          dispatch(setAuthenticated());
          initialSessionHadSession.current = true;
        }
        // mark auth as resolved regardless — null session means not logged in
        setAuthReady(true);
      } else if (event === "SIGNED_IN") {
        dispatch(setAuthenticated());
        // DB is guaranteed ready by the time the user reaches the login screen
        dispatch(runSync());
      } else if (event === "SIGNED_OUT") {
        dispatch(clearAuth());
        dispatch(clearEntries());
        dispatch(resetSync());
        deleteAllEntries().catch(console.error);
      }
      // TOKEN_REFRESHED: supabase client handles the new token internally,
      // getSession() always returns the current token — no Redux update needed
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (dbReady && authReady) {
      SplashScreen.hideAsync();
      // app restarted with an existing session — safe to sync now that DB is ready
      if (initialSessionHadSession.current) {
        dispatch(runSync());
      }
    }
  }, [dbReady, authReady, dispatch]);

  if (!dbReady || !authReady) return null;

  return children;
};
