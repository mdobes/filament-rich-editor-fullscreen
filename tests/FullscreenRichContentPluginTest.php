<?php

use Filament\Forms\Components\RichEditor\Plugins\Contracts\RichContentPlugin;
use mdobes\RichEditorFullscreen\FullscreenRichContentPlugin;

it('implements RichContentPlugin interface', function () {
    expect(FullscreenRichContentPlugin::make())
        ->toBeInstanceOf(RichContentPlugin::class);
});

it('has correct id', function () {
    expect(FullscreenRichContentPlugin::make()->getId())
        ->toBe('fullscreen');
});

it('returns editor tools with fullscreen tool', function () {
    $tools = FullscreenRichContentPlugin::make()->getEditorTools();

    expect($tools)->toHaveCount(1);
    expect($tools[0]->getName())->toBe('fullscreen');
});

it('returns js extensions', function () {
    $extensions = FullscreenRichContentPlugin::make()->getTipTapJsExtensions();

    expect($extensions)->toBeArray()->toHaveCount(1);
});

it('returns no php extensions', function () {
    expect(FullscreenRichContentPlugin::make()->getTipTapPhpExtensions())
        ->toBeEmpty();
});

it('returns no editor actions', function () {
    expect(FullscreenRichContentPlugin::make()->getEditorActions())
        ->toBeEmpty();
});
