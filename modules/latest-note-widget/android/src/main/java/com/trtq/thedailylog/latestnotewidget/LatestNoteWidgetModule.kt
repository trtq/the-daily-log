package com.trtq.thedailylog.latestnotewidget

import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class LatestNoteWidgetModule : Module() {

    private val context
        get() = appContext.reactContext ?: throw Exceptions.ReactContextLost()

    override fun definition() = ModuleDefinition {
        Name("LatestNoteWidget")

        AsyncFunction("saveNote") { id: String, title: String, body: String ->
            LatestNoteStore.write(context, Note(id, title, body))
            LatestNoteWidget.forceRender(context)
        }

        AsyncFunction("clearNote") { ->
            LatestNoteStore.clear(context)
            LatestNoteWidget.forceRender(context)
        }
    }
}
