# orng Theme Markdown Test

This file tests **Markdown** syntax highlighting for the orng VS Code theme.

## Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Text Formatting

This is **bold text** and this is *italic text*.

This is ***bold and italic*** text.

This is ~~strikethrough~~ text.

This is `inline code` within a paragraph.

## Links

[Regular link](https://example.com)

[Link with title](https://example.com "Example Website")

[Reference-style link][reference]

[reference]: https://example.com

Autolink: <https://example.com>

Email: <user@example.com>

## Lists

### Unordered List

- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
    - Deeply nested
- Item 3

### Ordered List

1. First item
2. Second item
   1. Nested item
   2. Another nested item
3. Third item

### Task List

- [x] Completed task
- [ ] Incomplete task
- [ ] Another task

## Blockquotes

> This is a blockquote.
> 
> It can span multiple lines.
>
> > Nested blockquote

## Code Blocks

```javascript
// JavaScript code block
const greeting = 'Hello, World!';
console.log(greeting);

function add(a, b) {
  return a + b;
}
```

```typescript
// TypeScript code block
interface User {
  id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: 'orng',
};
```

```css
/* CSS code block */
.button {
  background-color: #EC5B2B;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
}
```

```json
{
  "name": "orng",
  "version": "1.0.0",
  "themes": ["dark", "light"]
}
```

```bash
# Bash code block
npm install
npm run build
git commit -m "feat: add orng theme"
```

## Tables

| Feature | Dark Theme | Light Theme |
|---------|:----------:|:-----------:|
| Editor Background | `#161A22` | `#FFF7F1` |
| Primary Color | `#EC5B2B` | `#EC5B2B` |
| Text Color | `#EEEEEE` | `#1A1A1A` |

## Horizontal Rules

---

***

___

## Images

![Alt text for image](./image.png)

![Image with title](./image.png "Image Title")

## HTML in Markdown

<details>
<summary>Click to expand</summary>

This is hidden content that can be expanded.

- Item 1
- Item 2

</details>

<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>

## Footnotes

Here's a sentence with a footnote.[^1]

[^1]: This is the footnote content.

## Definition Lists

Term 1
: Definition for term 1

Term 2
: Definition for term 2
: Another definition for term 2

## Mathematical Expressions (if supported)

Inline math: $E = mc^2$

Block math:

$$
\frac{n!}{k!(n-k)!} = \binom{n}{k}
$$

## Escape Characters

\*Not italic\*

\`Not code\`

\[Not a link\]

## Emoji (if supported)

:smile: :rocket: :fire:

---

*End of Markdown test file*
