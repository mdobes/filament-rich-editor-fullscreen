import { Extension } from '@tiptap/core'

export default Extension.create({
    name: 'fullscreen',

    onCreate() {
        if (this.storage.classObserver) return;

        const editorWrapper = this.editor.options.element.closest('.fi-fo-rich-editor');
        if (!editorWrapper) return;

        const observer = new MutationObserver(() => {
            if (this.storage.isFullscreen && !editorWrapper.classList.contains('fullscreen')) {
                editorWrapper.classList.add('fullscreen');
            }
            editorWrapper.dispatchEvent(new CustomEvent('fi-fo-rich-editor:classchange', {
                detail: {
                    classList: editorWrapper.className,
                    isFullscreen: editorWrapper.classList.contains('fullscreen'),
                }
            }));
        });

        observer.observe(editorWrapper, { attributes: true, attributeFilter: ['class'] });
        this.storage.classObserver = observer;
    },

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
