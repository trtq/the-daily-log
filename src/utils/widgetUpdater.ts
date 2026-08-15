import { store } from "@/store/store";
import LatestNoteWidget from "@modules/latest-note-widget";

export const startWidgetUpdater = () => {
  let lastUpdatedTimestamp: null | string = null;
  let wasLoading = false;
  let hasLoaded = false;

  return store.subscribe(() => {
    const { entries, isLoading, error } = store.getState().entries;

    if (wasLoading && !isLoading && error === null) {
      hasLoaded = true;
    }

    if (!hasLoaded) {
      wasLoading = isLoading;
    } else {
      const latest = entries[0];
      const latestTimestamp = latest ? latest.id + latest.updatedAt : "";

      if (lastUpdatedTimestamp !== latestTimestamp) {
        lastUpdatedTimestamp = latestTimestamp;
        if (latest) {
          LatestNoteWidget?.saveNote(
            latest.id,
            latest.title,
            latest.body.slice(0, 500),
          ).catch(console.error);
        } else {
          LatestNoteWidget?.clearNote().catch(console.error);
        }
      }
    }
  });
};
