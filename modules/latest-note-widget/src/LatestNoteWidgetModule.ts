import { NativeModule, requireOptionalNativeModule } from "expo";

declare class LatestNoteWidgetModule extends NativeModule {
  saveNote(id: string, title: string, body: string): Promise<void>;
  clearNote(): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireOptionalNativeModule<LatestNoteWidgetModule>(
  "LatestNoteWidget",
);
