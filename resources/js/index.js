import { Extension } from '@tiptap/core'

export default Extension.create({
    name: 'fullscreen',

    onCreate() {
        const editorWrapper = this.editor.options.element.closest('.fi-fo-rich-editor');
        if (!editorWrapper) return;

        // Listen for toggle-fullscreen event dispatched by the toolbar button via Alpine $dispatch
        editorWrapper.addEventListener('toggle-fullscreen', () => {
            this.editor.commands.toggleFullscreen();
        });

        const observer = new MutationObserver(() => {
            editorWrapper.dispatchEvent(new CustomEvent('fi-fo-rich-editor:classchange', {
                detail: {
                    classList: editorWrapper.className,
                    isFullscreen: editorWrapper.classList.contains('fullscreen'),
                }
            }));
        });

        observer.observe(editorWrapper, { attributes: true, attributeFilter: ['class'] });
    },

    addCommands() {
        return {
            toggleFullscreen: () => ({ editor }) => {
                const editorWrapper = editor.options.element.closest('.fi-fo-rich-editor');
                if (editorWrapper) {
                    editorWrapper.classList.toggle('fullscreen');

                    const isFullscreen = editorWrapper.classList.contains('fullscreen');

                    // Update tooltip on the fullscreen button
                    const btn = editorWrapper.querySelector('.fullscreen-toggle');
                    if (btn) {
                        const label = isFullscreen
                            ? btn.dataset.exitLabel
                            : btn.dataset.enterLabel;

                        btn.setAttribute('aria-label', label);

                        if (btn._tippy) {
                            btn._tippy.setContent(label);
                        }
                    }

                    // Focus the editor after toggling
                    editor.view.focus();
                }
                return true;
            },
        };
    },

    addKeyboardShortcuts() {
        return {
            'Escape': () => {
                const editorWrapper = this.editor.options.element.closest('.fi-fo-rich-editor');
                if (editorWrapper?.classList.contains('fullscreen')) {
                    return this.editor.commands.toggleFullscreen();
                }
                return false;
            },
            'Mod-Shift-f': () => this.editor.commands.toggleFullscreen(),
        };
    },
})