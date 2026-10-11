# Upstream orng theme

`orng-zed.json` is the unmodified theme from [elithrar/orng-zed](https://github.com/elithrar/orng-zed/blob/59c49cb3b30102f71e38ac152692f98b3d4a4294/themes/orng.json), pinned to commit `59c49cb3b30102f71e38ac152692f98b3d4a4294`.

Author: Matt Silverlock / Cloudflare. Apache-2.0; copyright 2025 Cloudflare, Inc. See the repository's [LICENSE](../LICENSE).

The conversion in `scripts/build-themes.mjs` starts from the upstream palette and preserves italics and bold. Readability adjustments increase line-number contrast in both themes, darken faint light-theme syntax colors, and give the light theme a visible active-line background. These adjustments apply consistently to syntax scopes and semantic tokens. Diff overlays also use the opacity adjustment described below. VS Code and Zed use different grammars and UI layouts, so token classification and component geometry can differ.

VS Code-only controls use the closest Zed surface or element color. Buttons use Zed's neutral element colors. All six bracket colors use Zed's punctuation color. VS Code has no theme keys for Zed's dim ANSI palette or multiplayer cursors beyond the local cursor; those are omitted.

Diffs retain Zed's original red and blue RGB values and gutter backgrounds. Word highlights use 15% opacity (`26` alpha), because VS Code also applies them to whole added/deleted lines behind syntax text. This keeps comments and similarly colored tokens readable. Full-line overlays remain transparent to avoid stacking the tints. Range highlights use Zed's translucent active-line background.

To update, replace the snapshot from a specific upstream commit, update the pinned link above, then run `npm run build` and `npm test`. Keep the upstream snapshot intact; make mapping and readability changes in the conversion instead of editing generated themes.
