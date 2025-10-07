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
                    
                    // Update fullscreen button icon
                    const fullscreenButton = editorWrapper.querySelector('[data-tool="fullscreen"]');
                    if (fullscreenButton) {

                        const labelFullscreen = fullscreenButton.getAttribute('data-label-fullscreen');
                        const labelExitFullscreen = fullscreenButton.getAttribute('data-label-exit-fullscreen');

                        // Update icon
                        const icon = fullscreenButton.querySelector('svg');
                        if (icon) {
                            icon.innerHTML = this.storage.isFullscreen
                                ? '<path stroke-linecap="round" stroke-linejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />'
                                : '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />';
                        }

                        // Update text in label, aria-label, title
                        const nextLabel = this.storage.isFullscreen
                            ? (labelExitFullscreen || labelFullscreen)
                            : (labelFullscreen || labelExitFullscreen);

                        if (nextLabel) {
                            const labelElement = fullscreenButton.querySelector('[data-slot="label"]');
                            if (labelElement) labelElement.textContent = nextLabel;
                            fullscreenButton.setAttribute('aria-label', nextLabel);
                            fullscreenButton.setAttribute('title', nextLabel);

                            // Update tooltip if present
                            const tooltipAttr = fullscreenButton.getAttribute('x-tooltip');
                            if (tooltipAttr) {
                                fullscreenButton.setAttribute(
                                    'x-tooltip',
                                    tooltipAttr.replace(/content:\s*'([^']*)'/, `content: '${nextLabel.replace(/'/g, "\\'")}'`)
                                );
                            }
                            if (fullscreenButton._tippy?.setContent) {
                                fullscreenButton._tippy.setContent(nextLabel);
                            }
                        }
                    }

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
