# Changelog

All notable changes to `rich-editor-fullscreen` will be documented in this file.

## 1.3.1 - 2026-08-22

### Fixed

- Stylesheet build migrated to the Tailwind v4 CLI
- Security advisories patched in the dependency tree (minimatch, brace-expansion, nanoid)
- Corrected GitHub Security Advisory URL in the security policy

### Added

- Security policy with a private vulnerability reporting channel
- Dependabot configuration with grouped tiptap updates and a cooldown

### Changed

- GitHub Actions pinned to commit SHAs
- JS tests now run on Node 22
- Dependency updates: tiptap 2.27.2, esbuild 0.28.2, postcss 8.5.26, vitest 4.1.10, prettier 3.9.6, prettier-plugin-tailwindcss 0.8.1, jsdom 30.0.1

### Removed

- Dependencies made obsolete by the Tailwind v4 migration
- Dev tooling excluded from the distributed package archive

## 1.3.0 - 2026-03-18

### Added

- Fullscreen toggle with dynamic icon (enter/exit states)
- Multi-editor support using Alpine `$dispatch` events
- Fullscreen state persistence across Livewire re-renders
- Test suite (PHP + JS) and CI workflow for Filament v4/v5 compatibility
- Filament v5 / Laravel 11+ support in dev dependencies

### Fixed

- Memory leak: cleanup MutationObserver and event listeners on editor destroy
- Duplicate asset registration in `getAssets()`
- Missing semicolons in CSS
- Initial button label now set from data attributes on editor create

### Removed

- Unused `RichEditorFullscreen` facade (referenced non-existent class)
- Unused boilerplate methods and their call sites
- Unused migration and config publish steps from install command

## 1.2.0 - 2025-09-27

- fix: Styles have been adapted for the mobile version, and the "Blocks" panel layout has been fixed on both versions.

## 1.1.0 - 2025-09-19

- fix: Positioning the Blocks panel, resetting full-screen mode after closing the modal window

## 1.0.0 - 2025-09-17

- initial release
