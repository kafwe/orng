# Upstream orng theme

`orng-zed.json` is the unmodified theme from [elithrar/orng-zed](https://github.com/elithrar/orng-zed/blob/59c49cb3b30102f71e38ac152692f98b3d4a4294/themes/orng.json), pinned to commit `59c49cb3b30102f71e38ac152692f98b3d4a4294`.

Author: Matt Silverlock / Cloudflare. Apache-2.0; copyright 2025 Cloudflare, Inc. See the repository's [LICENSE](../LICENSE).

The conversion in `scripts/build-themes.mjs` preserves upstream RGB values, alpha channels, italics, and bold. Each Zed syntax category maps to TextMate scopes; semantic tokens use the closest corresponding category. VS Code and Zed use different grammars and UI layouts, so token classification and component geometry can differ even with identical colors.

VS Code-only controls use the closest Zed surface or element color. Buttons use Zed's neutral element colors. All six bracket colors use Zed's punctuation color. VS Code has no theme keys for Zed's dim ANSI palette or multiplayer cursors beyond the local cursor; those are omitted.

Diffs use the original word-highlight colors and gutter backgrounds; full-line overlays are transparent so VS Code does not obscure syntax with Zed's opaque light-mode backgrounds. Range highlights use Zed's translucent active-line background for the same reason.

To update, replace the snapshot from a specific upstream commit, update the pinned link above, then run `npm run build` and `npm test`. Keep upstream colors intact; make mapping changes in the conversion instead of editing generated themes.
