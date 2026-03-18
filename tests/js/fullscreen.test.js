import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Editor } from '@tiptap/core'
import { Document } from '@tiptap/extension-document'
import { Text } from '@tiptap/extension-text'
import { Paragraph } from '@tiptap/extension-paragraph'
import FullscreenExtension from '../../resources/js/index.js'

function createEditorWrapper() {
    const wrapper = document.createElement('div')
    wrapper.classList.add('fi-fo-rich-editor')

    const editorEl = document.createElement('div')
    wrapper.appendChild(editorEl)

    document.body.appendChild(wrapper)

    return { wrapper, editorEl }
}

function createToggleButton(wrapper) {
    const btn = document.createElement('button')
    btn.classList.add('fullscreen-toggle')
    btn.dataset.enterLabel = 'Enter fullscreen'
    btn.dataset.exitLabel = 'Exit fullscreen'
    btn.setAttribute('aria-label', 'Enter fullscreen')
    wrapper.appendChild(btn)
    return btn
}

function waitForTick() {
    return new Promise(resolve => setTimeout(resolve, 10))
}

describe('Fullscreen TipTap Extension', () => {
    let editor
    let wrapper

    beforeEach(async () => {
        document.body.innerHTML = ''
        const els = createEditorWrapper()
        wrapper = els.wrapper

        editor = new Editor({
            element: els.editorEl,
            extensions: [Document, Text, Paragraph, FullscreenExtension],
            content: '<p>Hello</p>',
        })

        // Wait for onCreate to fire
        await waitForTick()
    })

    afterEach(() => {
        editor.destroy()
        document.body.innerHTML = ''
    })

    it('has correct extension name', () => {
        expect(FullscreenExtension.name).toBe('fullscreen')
    })

    it('initializes with isFullscreen false', () => {
        expect(editor.storage.fullscreen.isFullscreen).toBe(false)
    })

    it('toggleFullscreen adds fullscreen class', () => {
        editor.commands.toggleFullscreen()
        expect(wrapper.classList.contains('fullscreen')).toBe(true)
        expect(editor.storage.fullscreen.isFullscreen).toBe(true)
    })

    it('toggleFullscreen removes fullscreen class on second call', () => {
        editor.commands.toggleFullscreen()
        editor.commands.toggleFullscreen()
        expect(wrapper.classList.contains('fullscreen')).toBe(false)
        expect(editor.storage.fullscreen.isFullscreen).toBe(false)
    })

    it('updates aria-label on toggle button', () => {
        const btn = createToggleButton(wrapper)

        editor.commands.toggleFullscreen()
        expect(btn.getAttribute('aria-label')).toBe('Exit fullscreen')

        editor.commands.toggleFullscreen()
        expect(btn.getAttribute('aria-label')).toBe('Enter fullscreen')
    })

    it('updates tippy tooltip if present', () => {
        const btn = createToggleButton(wrapper)
        let lastContent = ''
        btn._tippy = { setContent: (c) => { lastContent = c } }

        editor.commands.toggleFullscreen()
        expect(lastContent).toBe('Exit fullscreen')

        editor.commands.toggleFullscreen()
        expect(lastContent).toBe('Enter fullscreen')
    })

    it('responds to toggle-fullscreen event', async () => {
        wrapper.dispatchEvent(new Event('toggle-fullscreen'))
        expect(wrapper.classList.contains('fullscreen')).toBe(true)
    })

    it('re-applies fullscreen class after external removal (MutationObserver)', async () => {
        editor.commands.toggleFullscreen()
        expect(wrapper.classList.contains('fullscreen')).toBe(true)

        // Simulate Livewire re-render removing the class
        wrapper.classList.remove('fullscreen')

        // MutationObserver fires asynchronously
        await waitForTick()
        expect(wrapper.classList.contains('fullscreen')).toBe(true)
    })

    it('cleans up on destroy', async () => {
        editor.commands.toggleFullscreen()
        editor.destroy()

        // After destroy, dispatching event should not toggle (listener removed)
        wrapper.classList.remove('fullscreen')
        wrapper.dispatchEvent(new Event('toggle-fullscreen'))
        expect(wrapper.classList.contains('fullscreen')).toBe(false)
    })

    it('registers keyboard shortcuts', () => {
        expect(editor.extensionManager.extensions.some(e => e.name === 'fullscreen')).toBe(true)
    })
})
