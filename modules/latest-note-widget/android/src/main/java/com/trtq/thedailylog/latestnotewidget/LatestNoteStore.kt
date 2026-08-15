package com.trtq.thedailylog.latestnotewidget

import android.content.Context
import androidx.core.content.edit

object LatestNoteStore {
    private const val PREFS_NAME = "latest_note_widget"
    private const val ID_KEY = "id"
    private const val TITLE_KEY = "title"
    private const val BODY_KEY = "body"

    private fun prefs(context: Context) =
        context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

    fun clear(context: Context) = prefs(context).edit { clear() }

    fun write(context: Context, note: Note) {
        prefs(context).edit {
            putString(ID_KEY, note.id)
            putString(TITLE_KEY, note.title)
            putString(BODY_KEY, note.body)
        }
    }
    fun read(context: Context): Note? {
        val id = prefs(context).getString(ID_KEY, null) ?: return null
        val title = prefs(context).getString(TITLE_KEY, null) ?: ""
        val text = prefs(context).getString(BODY_KEY, null) ?: ""
        return Note(id, title, text)
    }
}