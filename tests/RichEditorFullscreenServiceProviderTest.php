<?php

use Filament\Support\Facades\FilamentAsset;

it('registers css asset', function () {
    $styles = FilamentAsset::getStyles();

    $ids = array_map(fn ($style) => $style->getId(), $styles);

    expect($ids)->toContain('rich-editor-fullscreen-styles');
});

it('registers js asset', function () {
    $scripts = FilamentAsset::getScripts();

    $ids = array_map(fn ($script) => $script->getId(), $scripts);

    expect($ids)->toContain('rich-content-plugins/fullscreen');
});

it('registers fullscreen plugin on RichEditor globally', function () {
    $plugin = \mdobes\RichEditorFullscreen\FullscreenRichContentPlugin::make();

    expect($plugin->getId())->toBe('fullscreen');
    expect($plugin->getEditorTools())->toHaveCount(1);
});

it('has translations for all locales', function (string $locale) {
    $path = __DIR__ . "/../resources/lang/{$locale}/editor.php";

    expect(file_exists($path))->toBeTrue();
    expect(require $path)->toBeArray()->not->toBeEmpty();
})->with(['en', 'cs', 'ru']);
