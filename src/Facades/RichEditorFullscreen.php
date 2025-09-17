<?php

namespace mdobes\RichEditorFullscreen\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \mdobes\RichEditorFullscreen\RichEditorFullscreen
 */
class RichEditorFullscreen extends Facade
{
    protected static function getFacadeAccessor()
    {
        return \mdobes\RichEditorFullscreen\RichEditorFullscreen::class;
    }
}
