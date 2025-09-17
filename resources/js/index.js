import { Extension } from '@tiptap/core'

export default Extension.create({
    name: 'fullscreen',

    addCommands() {
        return {
            toggleFullscreen: () => ({ editor }) => {
                const editorWrapper = editor.options.element.closest('.fi-fo-rich-editor');
                if (editorWrapper) {
                    editorWrapper.classList.toggle('fullscreen');

                    // Update storage state
                    this.storage.isFullscreen = editorWrapper.classList.contains('fullscreen');

                    // Focus the editor after toggling
                    editor.view.focus();
                }
                return true;
            },
        };
    },

    addStorage() {
        return {
            isFullscreen: false,
        };
    },

    addKeyboardShortcuts() {
        return {
            'Escape': () => {
                if (this.storage.isFullscreen) {
                    return this.editor.commands.toggleFullscreen();
                }
            },
            'Mod-Shift-f': () => this.editor.commands.toggleFullscreen(),
        };
    },
})
