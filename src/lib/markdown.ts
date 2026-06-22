// Small, dependency-free Markdown → HTML renderer for blog posts.
// Handles the subset we author in front-mattered .mdx posts: headings,
// paragraphs, bold/italic, inline code, links, blockquotes, hr, and
// unordered/ordered lists. Escapes HTML first so author content is safe.

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(s: string): string {
  // links [text](url)
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  // bold then italic
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  // inline code
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  return s;
}

export function markdownToHtml(md: string): string {
  // Escape first to neutralize any raw HTML in source.
  const escaped = escapeHtml(md);
  const lines = escaped.split(/\r?\n/);

  const out: string[] = [];
  let i = 0;
  let listType: "ul" | "ol" | null = null;

  const closeList = () => {
    if (listType) {
      out.push(`</${listType}>`);
      listType = null;
    }
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // blank line
    if (trimmed === "") {
      closeList();
      i++;
      continue;
    }

    // horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      closeList();
      out.push("<hr />");
      i++;
      continue;
    }

    // headings
    const h = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      closeList();
      const level = h[1].length;
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      i++;
      continue;
    }

    // blockquote (consecutive lines)
    if (/^&gt;\s?/.test(trimmed)) {
      closeList();
      const quoteLines: string[] = [];
      while (i < lines.length && /^&gt;\s?/.test(lines[i].trim())) {
        quoteLines.push(lines[i].trim().replace(/^&gt;\s?/, ""));
        i++;
      }
      out.push(`<blockquote>${inline(quoteLines.join(" "))}</blockquote>`);
      continue;
    }

    // ordered list item
    const ol = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (ol) {
      if (listType !== "ol") {
        closeList();
        out.push("<ol>");
        listType = "ol";
      }
      out.push(`<li>${inline(ol[2])}</li>`);
      i++;
      continue;
    }

    // unordered list item
    if (/^[-*+]\s+/.test(trimmed)) {
      if (listType !== "ul") {
        closeList();
        out.push("<ul>");
        listType = "ul";
      }
      out.push(`<li>${inline(trimmed.replace(/^[-*+]\s+/, ""))}</li>`);
      i++;
      continue;
    }

    // paragraph (gather consecutive non-empty, non-special lines)
    closeList();
    const para: string[] = [trimmed];
    i++;
    while (i < lines.length) {
      const next = lines[i].trim();
      if (
        next === "" ||
        /^(#{1,6})\s+/.test(next) ||
        /^&gt;\s?/.test(next) ||
        /^(\d+)\.\s+/.test(next) ||
        /^[-*+]\s+/.test(next) ||
        /^(-{3,}|\*{3,}|_{3,})$/.test(next)
      ) {
        break;
      }
      para.push(next);
      i++;
    }
    out.push(`<p>${inline(para.join(" "))}</p>`);
  }

  closeList();
  return out.join("\n");
}
