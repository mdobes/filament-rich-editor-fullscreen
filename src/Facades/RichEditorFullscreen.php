<?php

namespace mdobes\RichEditorFullscreen\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \mdobes\RichEditorFullscreen\FullscreeenRichContentPlugin
 */
class RichEditorFullscreen extends Facade
{
    protected static function getFacadeAccessor()
    {
        return \mdobes\RichEditorFullscreen\FullscreeenRichContentPlugin::class;
    }
}
