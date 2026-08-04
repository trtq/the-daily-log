import { registerWebModule, NativeModule } from 'expo';

import { LatestNoteWidgetModuleEvents } from './LatestNoteWidget.types';

class LatestNoteWidgetModule extends NativeModule<LatestNoteWidgetModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(LatestNoteWidgetModule, 'LatestNoteWidgetModule');
