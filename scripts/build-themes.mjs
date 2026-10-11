import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const upstream = JSON.parse(readFileSync(new URL('upstream/orng-zed.json', root), 'utf8'));
const check = process.argv.includes('--check');

// Each group names one Zed color and its closest VS Code equivalents.
// Keep alpha channels; an opaque FF suffix can be omitted without changing the color.
const color = value => value.length === 9 && value.slice(-2).toLowerCase() === 'ff'
  ? value.slice(0, 7).toUpperCase()
  : value.toUpperCase();
const ui = {
  'border': ['widget.border', 'dropdown.border', 'input.border', 'editorWidget.border', 'editorSuggestWidget.border', 'editorHoverWidget.border', 'menu.separatorBackground', 'tree.indentGuidesStroke', 'notifications.border'],
  'border.variant': ['editorGroup.border', 'panel.border', 'peekView.border', 'chat.requestBorder', 'inlineChat.border'],
  'border.focused': ['focusBorder', 'inputOption.activeBorder', 'tab.activeBorderTop', 'panelTitle.activeBorder', 'editorGroup.focusedEmptyBorder', 'inlineChatInput.focusBorder'],
  'border.transparent': ['scrollbar.shadow', 'editor.lineHighlightBorder', 'diffEditor.insertedLineBackground', 'diffEditor.removedLineBackground'],
  'elevated_surface.background': ['editorWidget.background', 'editorSuggestWidget.background', 'editorHoverWidget.background', 'quickInput.background', 'menu.background', 'notifications.background', 'breadcrumbPicker.background', 'peekViewResult.background'],
  'surface.background': ['activityBar.background', 'sideBar.background', 'peekViewTitle.background'],
  'background': ['sideBarSectionHeader.background', 'editorGroupHeader.noTabsBackground', 'notificationCenterHeader.background', 'quickInputTitle.background', 'debugToolBar.background', 'inlineChat.background'],
  'element.background': ['button.background', 'button.secondaryBackground', 'dropdown.background', 'input.background', 'peekViewEditor.background', 'peekViewEditorGutter.background', 'chat.requestBackground', 'inlineChatInput.background'],
  'element.hover': ['button.hoverBackground', 'button.secondaryHoverBackground', 'list.hoverBackground', 'tab.hoverBackground', 'toolbar.hoverBackground'],
  'element.active': ['statusBarItem.hoverBackground', 'toolbar.activeBackground'],
  'element.selected': ['selection.background', 'list.activeSelectionBackground', 'list.focusBackground', 'list.inactiveSelectionBackground', 'editorSuggestWidget.selectedBackground', 'quickInputList.focusBackground', 'menu.selectionBackground', 'peekViewResult.selectionBackground', 'editor.inactiveSelectionBackground'],
  'drop_target.background': ['list.dropBackground', 'sideBar.dropBackground'],
  'text': ['foreground', 'button.foreground', 'button.secondaryForeground', 'dropdown.foreground', 'input.foreground', 'list.activeSelectionForeground', 'list.focusForeground', 'list.inactiveSelectionForeground', 'activityBar.foreground', 'sideBar.foreground', 'sideBarTitle.foreground', 'tab.activeForeground', 'tab.hoverForeground', 'panelTitle.activeForeground', 'statusBar.foreground', 'titleBar.activeForeground', 'notifications.foreground', 'breadcrumb.focusForeground', 'breadcrumb.activeSelectionForeground', 'editorWidget.foreground', 'editorSuggestWidget.foreground', 'editorHoverWidget.foreground', 'quickInput.foreground', 'menu.foreground', 'menu.selectionForeground', 'peekViewResult.fileForeground', 'peekViewResult.selectionForeground', 'peekViewTitleLabel.foreground', 'inlineChat.foreground'],
  'text.muted': ['descriptionForeground', 'tab.inactiveForeground', 'panelTitle.inactiveForeground', 'titleBar.inactiveForeground', 'breadcrumb.foreground', 'peekViewResult.lineForeground', 'peekViewTitleDescription.foreground', 'editorInlayHint.foreground'],
  'text.placeholder': ['input.placeholderForeground', 'inlineChatInput.placeholderForeground'],
  'text.disabled': ['disabledForeground'],
  'text.accent': ['textLink.foreground', 'list.highlightForeground', 'editorSuggestWidget.highlightForeground', 'badge.background', 'activityBarBadge.background', 'progressBar.background', 'debugIcon.breakpointForeground', 'chat.slashCommandForeground'],
  'icon': ['icon.foreground'],
  'icon.muted': ['activityBar.inactiveForeground'],
  'status_bar.background': ['statusBar.background', 'statusBar.noFolderBackground'],
  'title_bar.background': ['titleBar.activeBackground'],
  'title_bar.inactive_background': ['titleBar.inactiveBackground'],
  'tab_bar.background': ['editorGroupHeader.tabsBackground'],
  'tab.inactive_background': ['tab.inactiveBackground', 'tab.border'],
  'tab.active_background': ['tab.activeBackground'],
  'search.match_background': ['editor.findMatchHighlightBackground', 'minimap.findMatchHighlight', 'peekViewEditor.matchHighlightBackground', 'peekViewResult.matchHighlightBackground'],
  'search.active_match_background': ['editor.findMatchBackground'],
  'panel.background': ['panel.background'],
  'scrollbar.thumb.background': ['scrollbarSlider.background'],
  'scrollbar.thumb.hover_background': ['scrollbarSlider.hoverBackground', 'scrollbarSlider.activeBackground'],
  'editor.foreground': ['editor.foreground'],
  'editor.background': ['editor.background', 'minimap.background', 'editorInlayHint.background'],
  'editor.gutter.background': ['editorGutter.background'],
  'editor.subheader.background': ['editorStickyScroll.background', 'editorStickyScrollHover.background', 'breadcrumb.background'],
  'editor.active_line.background': ['editor.lineHighlightBackground', 'editor.rangeHighlightBackground'],
  'editor.line_number': ['editorLineNumber.foreground'],
  'editor.active_line_number': ['editorLineNumber.activeForeground'],
  'editor.invisible': ['editorWhitespace.foreground'],
  'editor.wrap_guide': ['editorRuler.foreground', 'editorIndentGuide.background1'],
  'editor.active_wrap_guide': ['editorIndentGuide.activeBackground1'],
  'editor.document_highlight.read_background': ['editor.wordHighlightBackground', 'editor.selectionHighlightBackground'],
  'editor.document_highlight.write_background': ['editor.wordHighlightStrongBackground'],
  'terminal.background': ['terminal.background'],
  'terminal.foreground': ['terminal.foreground'],
  'link_text.hover': ['textLink.activeForeground', 'editorLink.activeForeground'],
  'version_control.added': ['gitDecoration.addedResourceForeground', 'editorGutter.addedBackground', 'editorOverviewRuler.addedForeground', 'chat.linesAddedForeground'],
  'version_control.modified': ['gitDecoration.modifiedResourceForeground', 'editorGutter.modifiedBackground', 'editorOverviewRuler.modifiedForeground'],
  'version_control.deleted': ['gitDecoration.deletedResourceForeground', 'editorGutter.deletedBackground', 'editorOverviewRuler.deletedForeground', 'chat.linesRemovedForeground'],
  'version_control.word_added': ['diffEditor.insertedTextBackground'],
  'version_control.word_deleted': ['diffEditor.removedTextBackground'],
  'version_control.conflict_marker.ours': ['merge.currentHeaderBackground', 'merge.currentContentBackground'],
  'version_control.conflict_marker.theirs': ['merge.incomingHeaderBackground', 'merge.incomingContentBackground'],
  'conflict': ['gitDecoration.conflictingResourceForeground'],
  'created.background': ['diffEditorGutter.insertedLineBackground'],
  'deleted.background': ['diffEditorGutter.removedLineBackground'],
  'error': ['errorForeground', 'editorError.foreground', 'minimap.errorHighlight', 'inputValidation.errorForeground', 'editorBracketHighlight.unexpectedBracket.foreground'],
  'error.background': ['inputValidation.errorBackground'],
  'error.border': ['inputValidation.errorBorder'],
  'hint': ['editorHint.foreground'],
  'ignored': ['gitDecoration.ignoredResourceForeground'],
  'info': ['editorInfo.foreground', 'inputValidation.infoForeground'],
  'info.background': ['inputValidation.infoBackground'],
  'info.border': ['inputValidation.infoBorder'],
  'predictive': ['editorGhostText.foreground'],
  'success': ['gitDecoration.untrackedResourceForeground'],
  'warning': ['editorWarning.foreground', 'minimap.warningHighlight', 'inputValidation.warningForeground'],
  'warning.background': ['inputValidation.warningBackground', 'chat.slashCommandBackground'],
  'warning.border': ['inputValidation.warningBorder'],
};

// Avoid meta.function-call / meta.function.parameters / meta.type.annotation:
// those scopes also wrap child expressions and would paint unrelated tokens.
const scopes = {
  'embedded': ['meta.embedded', 'source.embedded'],
  'primary': ['source', 'text'],
  'comment': ['comment', 'punctuation.definition.comment'],
  'comment.doc': ['comment.documentation'],
  'keyword': ['keyword', 'storage.type', 'storage.modifier', 'punctuation.definition.keyword'],
  'function': ['entity.name.function', 'support.function', 'variable.function'],
  'attribute': ['entity.other.attribute-name'],
  'string': ['string'],
  'string.regex': ['string.regexp'],
  'string.special': ['string.special'],
  'string.special.symbol': ['constant.other.symbol'],
  'constant': ['constant.language', 'support.constant', 'variable.other.constant'],
  'number': ['constant.numeric'],
  'variable': ['variable', 'entity.name.variable', 'support.variable', 'variable.parameter'],
  'type': ['support.type', 'entity.name.type', 'entity.name.class', 'entity.name.interface'],
  'punctuation': ['punctuation'],
  'punctuation.bracket': ['punctuation.section', 'punctuation.definition.bracket', 'meta.brace', 'meta.bracket'],
  'punctuation.delimiter': ['punctuation.separator', 'punctuation.terminator'],
  'namespace': ['entity.name.namespace', 'support.other.namespace'],
  'emphasis.strong': ['markup.bold'],
  'emphasis': ['markup.italic'],
  'link_text': ['string.other.link.title', 'string.other.link.description', 'markup.underline.link', 'markup.underline.link.text'],
  'link_uri': ['markup.underline.link.markdown', 'markup.underline.link.image.markdown', 'string.other.link', 'markup.underline.link.destination'],
  'string.escape': ['constant.character.escape'],
  'property': ['variable.other.property', 'variable.other.object.property', 'support.type.property-name', 'meta.object-literal.key'],
  'operator': ['keyword.operator'],
  'enum': ['entity.name.type.enum', 'support.type.enum'],
  'constructor': ['entity.name.function.constructor', 'support.class.constructor'],
  'variable.special': ['variable.language', 'variable.language.special'],
  'preproc': ['meta.preprocessor', 'keyword.control.directive', 'punctuation.definition.directive'],
  'label': ['entity.name.label'],
  'variant': ['constant.other.enum', 'variable.other.enummember'],
  'selector': ['entity.other.attribute-name.class.css', 'entity.other.attribute-name.id.css', 'entity.name.tag.css'],
  'selector.pseudo': ['entity.other.attribute-name.pseudo-class.css', 'entity.other.attribute-name.pseudo-element.css'],
  'punctuation.special': ['punctuation.definition.template-expression', 'punctuation.section.interpolation', 'punctuation.section.embedded.begin', 'punctuation.section.embedded.end'],
  'punctuation.list_marker': ['punctuation.definition.list', 'beginning.punctuation.definition.list', 'punctuation.definition.list_marker'],
  'text.literal': ['markup.raw', 'markup.inline.raw', 'markup.fenced_code.block'],
  'predictive': ['comment.unused'],
  'boolean': ['constant.language.boolean'],
  'punctuation.markup': ['punctuation.definition.heading', 'punctuation.definition.bold', 'punctuation.definition.italic', 'punctuation.definition.link'],
  'tag': ['entity.name.tag', 'support.class.component'],
  'title': ['entity.name.section', 'markup.heading'],
  'hint': ['meta.inlay-hint'],
};

const semantic = {
  namespace: 'namespace', type: 'type', class: 'type', interface: 'type', struct: 'type',
  typeParameter: 'type', enum: 'enum', enumMember: 'variant', decorator: 'attribute',
  function: 'function', method: 'function', macro: 'preproc', label: 'label',
  variable: 'variable', parameter: 'variable', property: 'property',
  'variable.readonly': 'variable', 'property.readonly': 'property',
  keyword: 'keyword', modifier: 'keyword', string: 'string', number: 'number',
  regexp: 'string.regex', operator: 'operator', comment: 'comment',
};

function tokenStyle(entry) {
  return {
    foreground: color(entry.color),
    // Reset inherited styling as well as supplying Zed's italics and bold.
    fontStyle: [entry.font_style === 'italic' ? 'italic' : '', entry.font_weight >= 700 ? 'bold' : ''].filter(Boolean).join(' '),
  };
}

for (const theme of upstream.themes) {
  const s = theme.style;
  assert.deepEqual(Object.keys(scopes).sort(), Object.keys(s.syntax).sort(), 'Every Zed syntax category must be mapped');
  const colors = {};
  for (const [key, targets] of Object.entries(ui)) {
    assert.ok(s[key], `Missing upstream color: ${key}`);
    for (const target of targets) {
      assert.ok(!(target in colors), `Duplicate UI mapping: ${target}`);
      colors[target] = color(s[key]);
    }
  }
  for (const name of ['Black', 'Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Cyan', 'White']) {
    colors[`terminal.ansi${name}`] = color(s[`terminal.ansi.${name.toLowerCase()}`]);
    colors[`terminal.ansiBright${name}`] = color(s[`terminal.ansi.bright_${name.toLowerCase()}`]);
  }
  colors['editorCursor.foreground'] = color(s.players[0].cursor);
  colors['terminalCursor.foreground'] = color(s.players[0].cursor);
  colors['editor.selectionBackground'] = color(s.players[0].selection);
  colors['terminal.selectionBackground'] = color(s.players[0].selection);
  colors['minimap.selectionHighlight'] = color(s.players[0].selection);
  colors['badge.foreground'] = color(s['surface.background']);
  colors['activityBarBadge.foreground'] = color(s['surface.background']);
  // Zed uses neutral punctuation for brackets, not VS Code's rainbow palette.
  for (let i = 1; i <= 6; i++) colors[`editorBracketHighlight.foreground${i}`] = color(s.syntax['punctuation.bracket'].color);
  colors['editorBracketMatch.background'] = color(s['editor.document_highlight.read_background']);
  colors['editorBracketMatch.border'] = color(s['border.focused']);
  // VS Code layers word highlights behind unchanged syntax colors, including
  // entire added/deleted lines. Keep Zed's RGB hues but use a lighter overlay.
  for (const key of ['diffEditor.insertedTextBackground', 'diffEditor.removedTextBackground']) {
    colors[key] = `${colors[key].slice(0, 7)}26`;
  }

  const output = {
    $schema: 'vscode://schemas/color-theme', name: theme.name, type: theme.appearance,
    semanticHighlighting: true, colors,
    semanticTokenColors: Object.fromEntries(Object.entries(semantic).map(([selector, category]) => {
      const { foreground, fontStyle } = tokenStyle(s.syntax[category]);
      return [selector, { foreground, italic: fontStyle.includes('italic'), bold: fontStyle.includes('bold'), underline: false }];
    })),
    tokenColors: Object.entries(scopes).map(([category, scope]) => ({ name: category, scope, settings: tokenStyle(s.syntax[category]) })),
  };
  const path = new URL(`themes/orng-${theme.appearance}-color-theme.json`, root);
  const content = JSON.stringify(output, null, 2) + '\n';
  if (check) assert.equal(readFileSync(path, 'utf8'), content, `${theme.name} has drifted; run npm run build`);
  else writeFileSync(path, content);
  console.log(`${theme.name}: ${Object.keys(colors).length} UI colors, ${Object.keys(scopes).length} syntax categories ${check ? 'verified' : 'generated'}.`);
}
