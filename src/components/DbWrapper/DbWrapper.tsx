import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import { initDb } from "@/utils/db/queries";
import { loadEntries, clearEntries } from "@/store/slices/entriesSlice";
import { setAuth, clearAuth } from "@/store/slices/authSlice";
import { supabase } from "@/utils/supabase/client";
import { AppDispatch } from "@/store/store";

export const DbWrapper = ({ children }: { children: React.ReactNode }) => {
  const [dbReady, setDbReady] = useState(false);
  const [authReady, setAuthReady] = useState(false);
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
          dispatch(
            setAuth({ token: session.access_token, userId: session.user.id }),
          );
        }
        // mark auth as resolved regardless — null session means not logged in
        setAuthReady(true);
      } else if (event === "SIGNED_IN") {
        dispatch(
          setAuth({ token: session!.access_token, userId: session!.user.id }),
        );
        dispatch(loadEntries());
      } else if (event === "TOKEN_REFRESHED") {
        dispatch(
          setAuth({ token: session!.access_token, userId: session!.user.id }),
        );
      } else if (event === "SIGNED_OUT") {
        dispatch(clearAuth());
        dispatch(clearEntries());
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (dbReady && authReady) {
      SplashScreen.hideAsync();
    }
  }, [dbReady, authReady]);

  if (!dbReady || !authReady) return null;

  return children;
};
