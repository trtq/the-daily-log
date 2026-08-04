import * as React from 'react';

import { LatestNoteWidgetViewProps } from './LatestNoteWidget.types';

export default function LatestNoteWidgetView(props: LatestNoteWidgetViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
