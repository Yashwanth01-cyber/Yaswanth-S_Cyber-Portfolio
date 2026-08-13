export function renderMarkdown(md: string): string {
  let html = md;

  // Escape HTML
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Code blocks (fenced)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="rounded-lg border border-border bg-black/40 p-4 overflow-x-auto my-4"><code class="font-mono text-xs text-emerald-300">${code.trim()}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="font-mono text-xs text-emerald-300 bg-white/5 px-1.5 py-0.5 rounded">$1</code>');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-8 mb-3">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-emerald-400 hover:text-emerald-300 underline">$1</a>'
  );

  // Unordered lists
  html = html.replace(/(?:^|\n)((?:- .+\n?)+)/g, (match, list) => {
    const items = list.trim().split('\n').map((l: string) => l.replace(/^- /, ''));
    const lis = items.map((i: string) => `<li class="text-muted-foreground">${i}</li>`).join('');
    return `<ul class="list-disc list-inside space-y-1 my-3">${lis}</ul>`;
  });

  // Ordered lists
  html = html.replace(/(?:^|\n)((?:\d+\. .+\n?)+)/g, (match, list) => {
    const items = list.trim().split('\n').map((l: string) => l.replace(/^\d+\. /, ''));
    const lis = items.map((i: string) => `<li class="text-muted-foreground">${i}</li>`).join('');
    return `<ol class="list-decimal list-inside space-y-1 my-3">${lis}</ol>`;
  });

  // Paragraphs (lines that aren't already tags)
  html = html
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (/^<(h\d|ul|ol|pre|blockquote)/.test(trimmed)) return trimmed;
      return `<p class="text-muted-foreground leading-relaxed my-3">${trimmed.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('\n');

  return html;
}
