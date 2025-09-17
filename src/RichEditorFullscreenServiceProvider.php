<?php

namespace mdobes\RichEditorFullscreen;

use Filament\Forms\Components\RichEditor;
use Filament\Support\Assets\Asset;
use Filament\Support\Assets\Css;
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;
use Filament\Support\Facades\FilamentIcon;
use Illuminate\Filesystem\Filesystem;
use Livewire\Features\SupportTesting\Testable;
use mdobes\RichEditorFullscreen\Testing\TestsRichEditorFullscreen;
use Spatie\LaravelPackageTools\Commands\InstallCommand;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class RichEditorFullscreenServiceProvider extends PackageServiceProvider
{
    public static string $name = 'rich-editor-fullscreen';

    public static string $viewNamespace = 'rich-editor-fullscreen';

    public function configurePackage(Package $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         * More info: https://github.com/spatie/laravel-package-tools
         */
        $package->name(static::$name)
            ->hasCommands($this->getCommands())
            ->hasInstallCommand(function (InstallCommand $command) {
                $command
                    ->publishConfigFile()
                    ->publishMigrations()
                    ->askToRunMigrations()
                    ->askToStarRepoOnGitHub('mdobes/rich-editor-fullscreen');
            });

        $configFileName = $package->shortName();

        if (file_exists($package->basePath("/../config/{$configFileName}.php"))) {
            $package->hasConfigFile();
        }

        if (file_exists($package->basePath('/../database/migrations'))) {
            $package->hasMigrations($this->getMigrations());
        }

        if (file_exists($package->basePath('/../resources/lang'))) {
            $package->hasTranslations();
        }

        if (file_exists($package->basePath('/../resources/views'))) {
            $package->hasViews(static::$viewNamespace);
        }
    }

    public function packageRegistered(): void {}

    public function packageBooted(): void
    {
        // Asset Registration
        FilamentAsset::register([
            // Main plugin assets
            Css::make('rich-editor-fullscreen-styles', __DIR__ . '/../resources/dist/rich-editor-fullscreen.css'),

            // TipTap extension for fullscreen functionality - register without package name
            Js::make('rich-content-plugins/fullscreen', __DIR__ . '/../resources/dist/rich-content-plugins/fullscreen.js')->loadedOnRequest(),
        ]);

        // Publish assets
        $this->publishes([
            __DIR__ . '/../resources/dist' => public_path('js/filament/rich-editor-fullscreen'),
        ], 'rich-editor-fullscreen-assets');

        FilamentAsset::registerScriptData(
            $this->getScriptData(),
            $this->getAssetPackageName()
        );

        // Icon Registration
        FilamentIcon::register($this->getIcons());

        // Register the plugin globally with RichEditor
        RichEditor::configureUsing(function (RichEditor $richEditor) {
            $richEditor->plugins([
                FullscreenRichContentPlugin::make(),
            ]);
        });

        // Handle Stubs
        if (app()->runningInConsole()) {
            foreach (app(Filesystem::class)->files(__DIR__ . '/../stubs/') as $file) {
                $this->publishes([
                    $file->getRealPath() => base_path("stubs/rich-editor-fullscreen/{$file->getFilename()}"),
                ], 'rich-editor-fullscreen-stubs');
            }
        }

        // Testing
        Testable::mixin(new TestsRichEditorFullscreen);
    }

    protected function getAssetPackageName(): ?string
    {
        return 'mdobes/filament-rich-editor-fullscreen';
    }

    /**
     * @return array<Asset>
     */
    protected function getAssets(): array
    {
        return [
            // Main plugin assets
            Css::make('rich-editor-fullscreen-styles', __DIR__ . '/../resources/dist/rich-editor-fullscreen.css'),

            // TipTap extension for fullscreen functionality
            Js::make('rich-content-plugins/fullscreen', __DIR__ . '/../resources/dist/rich-content-plugins/fullscreen.js')->loadedOnRequest(),
        ];
    }

    /**
     * @return array<class-string>
     */
    protected function getCommands(): array
    {
        return [];
    }

    /**
     * @return array<string>
     */
    protected function getIcons(): array
    {
        return [];
    }

    /**
     * @return array<string>
     */
    protected function getRoutes(): array
    {
        return [];
    }

    /**
     * @return array<string, mixed>
     */
    protected function getScriptData(): array
    {
        return [];
    }

    /**
     * @return array<string>
     */
    protected function getMigrations(): array
    {
        return [];
    }
}
