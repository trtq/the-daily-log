import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import { initDb } from "@/utils/db/queries";
import { loadEntries } from "@/store/slices/entriesSlice";
import { AppDispatch } from "@/store/store";

export const DbWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    initDb()
      .then(() => dispatch(loadEntries()))
      // loadEntries failures are handled in Redux state — this only catches initDb errors
      .catch(console.error)
      .finally(() => {
        setIsReady(true);
        SplashScreen.hideAsync();
      });
  }, [dispatch]);

  if (!isReady) return null;

  return children;
};
