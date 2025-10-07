<?php

namespace mdobes\RichEditorFullscreen;

use Filament\Actions\Action;
use Filament\Forms\Components\RichEditor\Plugins\Contracts\RichContentPlugin;
use Filament\Forms\Components\RichEditor\RichEditorTool;
use Filament\Support\Facades\FilamentAsset;
use Tiptap\Core\Extension;

class FullscreenRichContentPlugin implements RichContentPlugin
{
    public function getId(): string
    {
        return 'fullscreen';
    }

    public static function make(): static
    {
        return app(static::class);
    }

    /**
     * @return array<string>
     */
    public function getTipTapJsExtensions(): array
    {
        return [
            FilamentAsset::getScriptSrc('rich-content-plugins/fullscreen'),
        ];
    }

    /**
     * @return array<RichEditorTool>
     */
    public function getEditorTools(): array
    {
        return [
            RichEditorTool::make('fullscreen')
                ->icon('heroicon-o-arrows-pointing-out')
                ->label(__('rich-editor-fullscreen::editor.fullscreen'))
                ->extraAttributes([
                    'data-tool' => 'fullscreen',
                    'data-label-fullscreen' => __('rich-editor-fullscreen::editor.fullscreen'),
                    'data-label-exit-fullscreen' => __('rich-editor-fullscreen::editor.exit_fullscreen'),
                ])
                ->jsHandler(<<<'JS'
                    $getEditor()?.commands.toggleFullscreen()
                JS),
        ];
    }

    /**
     * @return array<Extension>
     */
    public function getTipTapPhpExtensions(): array
    {
        return [];
    }

    /**
     * @return array<Action>
     */
    public function getEditorActions(): array
    {
        return [];
    }
}
