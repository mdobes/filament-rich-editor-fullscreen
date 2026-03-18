<?php

namespace mdobes\RichEditorFullscreen\Tests;

use BladeUI\Heroicons\BladeHeroiconsServiceProvider;
use BladeUI\Icons\BladeIconsServiceProvider;
use Filament\Actions\ActionsServiceProvider;
use Filament\Forms\FormsServiceProvider;
use Filament\Infolists\InfolistsServiceProvider;
use Filament\Notifications\NotificationsServiceProvider;
use Filament\Support\SupportServiceProvider;
use Illuminate\Database\Eloquent\Factories\Factory;
use Livewire\LivewireServiceProvider;
use mdobes\RichEditorFullscreen\RichEditorFullscreenServiceProvider;
use Orchestra\Testbench\TestCase as Orchestra;

class TestCase extends Orchestra
{
    protected function setUp(): void
    {
        parent::setUp();

        Factory::guessFactoryNamesUsing(
            fn (string $modelName) => 'mdobes\\RichEditorFullscreen\\Database\\Factories\\' . class_basename($modelName) . 'Factory'
        );
    }

    protected function getPackageProviders($app)
    {
        $providers = [
            ActionsServiceProvider::class,
            BladeHeroiconsServiceProvider::class,
            BladeIconsServiceProvider::class,
            FormsServiceProvider::class,
            InfolistsServiceProvider::class,
            LivewireServiceProvider::class,
            NotificationsServiceProvider::class,
            SupportServiceProvider::class,
            RichEditorFullscreenServiceProvider::class,
        ];

        // Filament v4
        foreach ([
            'Filament\FilamentServiceProvider',
            'Filament\Tables\TablesServiceProvider',
            'Filament\Widgets\WidgetsServiceProvider',
            'RyanChandler\BladeCaptureDirective\BladeCaptureDirectiveServiceProvider',
        ] as $provider) {
            if (class_exists($provider)) {
                $providers[] = $provider;
            }
        }

        // Filament v5
        foreach ([
            'Filament\Schemas\SchemasServiceProvider',
        ] as $provider) {
            if (class_exists($provider)) {
                $providers[] = $provider;
            }
        }

        return $providers;
    }

    public function getEnvironmentSetUp($app)
    {
        config()->set('database.default', 'testing');
    }
}