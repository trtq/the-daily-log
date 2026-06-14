import { useState, useEffect, useRef, use } from "react";
import { useAppDispatch } from "@/store/store";
import * as SplashScreen from "expo-splash-screen";
import { initDb, deleteAllEntries } from "@/services/db/queries";
import { loadEntries, clearEntries } from "@/store/slices/entriesSlice";
import { setAuthenticated, clearAuth } from "@/store/slices/authSlice";
import { runSync, resetSync } from "@/store/slices/syncSlice";
import { supabase } from "@/services/supabase/client";
import { ThemeContext } from "@/components/ThemeWrapper/ThemeWrapper";

SplashScreen.preventAutoHideAsync();

export const DbWrapper = ({ children }: { children: React.ReactNode }) => {
  const { themeLoaded } = use(ThemeContext);
  const [dbReady, setDbReady] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const shouldSyncOnStart = useRef(false);
  const dispatch = useAppDispatch();

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
          shouldSyncOnStart.current = true;
        }
        setAuthReady(true);
      } else if (event === "SIGNED_IN") {
        dispatch(setAuthenticated());
        dispatch(runSync());
      } else if (event === "SIGNED_OUT") {
        dispatch(clearAuth());
        dispatch(clearEntries());
        dispatch(resetSync());
        deleteAllEntries().catch(console.error);
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (dbReady && authReady && themeLoaded) {
      SplashScreen.hideAsync();
      if (shouldSyncOnStart.current) {
        dispatch(runSync());
      }
    }
  }, [dbReady, authReady, themeLoaded, dispatch]);

  if (!dbReady || !authReady || !themeLoaded) return null;

  return children;
};
