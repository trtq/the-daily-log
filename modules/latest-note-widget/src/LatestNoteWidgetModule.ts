import { NativeModule, requireNativeModule } from 'expo';

import { LatestNoteWidgetModuleEvents } from './LatestNoteWidget.types';

declare class LatestNoteWidgetModule extends NativeModule<LatestNoteWidgetModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<LatestNoteWidgetModule>('LatestNoteWidget');
