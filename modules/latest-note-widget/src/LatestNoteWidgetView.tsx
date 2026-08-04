import { requireNativeView } from 'expo';
import * as React from 'react';

import { LatestNoteWidgetViewProps } from './LatestNoteWidget.types';

const NativeView: React.ComponentType<LatestNoteWidgetViewProps> =
  requireNativeView('LatestNoteWidget');

export default function LatestNoteWidgetView(props: LatestNoteWidgetViewProps) {
  return <NativeView {...props} />;
}
