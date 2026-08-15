package com.trtq.thedailylog.latestnotewidget

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.view.View
import android.widget.RemoteViews
import androidx.core.net.toUri

class LatestNoteWidget : AppWidgetProvider() {
    override fun onUpdate(context: Context, manager: AppWidgetManager, ids: IntArray) =
        render(context, manager, ids)

    companion object {
        fun forceRender(context: Context) {
            val manager = AppWidgetManager.getInstance(context)
            val ids = manager.getAppWidgetIds(
                ComponentName(context, LatestNoteWidget::class.java)
            )
            render(context, manager, ids)
        }

        private fun buildEditIntent(
            context: Context,
            requestCode: Int,
            id: String = ""
        ): PendingIntent {
            val intent = Intent(Intent.ACTION_VIEW, "thedailylog://edit/${id}".toUri())
            intent.`package` = context.packageName
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
            return PendingIntent.getActivity(
                context,
                requestCode,
                intent,
                PendingIntent.FLAG_IMMUTABLE
            )
        }

        private fun render(context: Context, manager: AppWidgetManager, ids: IntArray) {
            val newView = RemoteViews(context.packageName, R.layout.widget_latest_note)
            val note = LatestNoteStore.read(context)

            newView.setOnClickPendingIntent(
                R.id.latest_note_add,
                buildEditIntent(context, 0)
            )
            if (note != null) {
                newView.setViewVisibility(R.id.latest_note_body, View.VISIBLE)
                newView.setViewVisibility(R.id.latest_note_placeholder, View.GONE)
                newView.setTextViewText(R.id.latest_note_title, note.title)
                newView.setTextViewText(R.id.latest_note_body, note.body)
                newView.setOnClickPendingIntent(
                    R.id.latest_note_container,
                    buildEditIntent(context, 1, note.id)
                )
            } else {
                newView.setTextViewText(R.id.latest_note_title, "")
                newView.setViewVisibility(R.id.latest_note_body, View.GONE)
                newView.setViewVisibility(R.id.latest_note_placeholder, View.VISIBLE)
                newView.setOnClickPendingIntent(
                    R.id.latest_note_container,
                    buildEditIntent(context, 1)
                )
            }
            manager.updateAppWidget(ids, newView)
        }
    }
}
