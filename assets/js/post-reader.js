/**
 * post-reader.js
 * 
 * Reads ?slug=... from the URL, fetches the matching .md file,
 * renders it via Marked.js, and handles special video tokens.
 *
 * VIDEO EMBEDDING IN MARKDOWN
 * ────────────────────────────
 * To embed a video in a post, use these special tokens in the .md file:
 *
 *   Local / GitHub-hosted video file:
 *     [video:assets/videos/demo.mp4 caption:"UI walkthrough"]
 *
 *   YouTube embed:
 *     [video:https://www.youtube.com/watch?v=VIDEO_ID caption:"Demo"]
 *     [video:https://youtu.be/VIDEO_ID]
 *     [video:https://youtube.com/shorts/VIDEO_ID]
 *
 * Caption is optional. The token must be on its own line.
 */

(async function () {
  const article = document.getElementById('post-article');
  const slug = Blog.getParam('slug');

  if (!slug) {
    renderError('No post specified.', article);
    return;
  }

  // Fetch post metadata from registry
  const posts = await Blog.fetchPosts();
  const meta = posts.find(p => p.slug === slug);

  // Fetch raw markdown
  let md;
  try {
    md = await Blog.fetchPostContent(slug);
  } catch (e) {
    renderError('Post not found. It may have been moved or deleted.', article);
    return;
  }

  // Update page title
  const postTitle = (meta && meta.title) || slug;
  document.title = `${postTitle} — Spearhead Companion Dev Blog`;

  // Configure Marked with heading IDs for anchor navigation
  marked.use({
    gfm: true,
    breaks: false,
    renderer: {
      heading({ text, depth }) {
        const slug = text
          .toLowerCase()
          .replace(/<[^>]*>/g, '')
          .replace(/&amp;/g, 'and')
          .replace(/&/g, 'and')
          .replace(/\+/g, 'and')
          .replace(/[^\w\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-');

        return `<h${depth} id="${slug}">${text}</h${depth}>\n`;
      }
    }
  });

  // Process video tokens BEFORE markdown parsing
  const { processed, videoBlocks } = extractVideoTokens(md);

  // Parse markdown to HTML
  let html = marked.parse(processed);

  // Inject video blocks back in
  html = reinjectVideos(html, videoBlocks);

  // Build the article DOM
  const tag      = (meta && meta.tag)  || 'Update';
  const date     = (meta && meta.date) ? Blog.formatDate(meta.date) : '';
  const rt       = Blog.readTime(md);
  const sub      = (meta && meta.subtitle) || '';
  const prevPost = findAdjacentPost(posts, slug, -1);
  const nextPost = findAdjacentPost(posts, slug, +1);

  article.innerHTML = `
    <header class="post-header">
      <div class="post-meta-top">
        <span class="post-tag">${esc(tag)}</span>
        ${date ? `<span class="post-date">${esc(date)}</span>` : ''}
      </div>

      <h1 class="post-title">${esc(postTitle)}</h1>

      ${sub ? `<p class="post-subtitle">${esc(sub)}</p>` : ''}

      <div class="post-header-meta">
        <span>⏱ ${rt}</span>
        ${(meta && meta.hasVideo) ? '<span>▶ Includes video</span>' : ''}
      </div>
    </header>

    <div class="post-body" id="post-body">
      ${html}
    </div>

    <nav class="post-nav">
      ${nextPost
        ? `<a class="post-nav-link prev" href="post.html?slug=${esc(nextPost.slug)}">← ${esc(nextPost.title)}</a>`
        : '<span></span>'}

      ${prevPost
        ? `<a class="post-nav-link next" href="post.html?slug=${esc(prevPost.slug)}">${esc(prevPost.title)} →</a>`
        : '<span></span>'}
    </nav>
  `;
})();

/* ─── VIDEO TOKEN PROCESSING ─────────────────────────── */

const VIDEO_PLACEHOLDER = 'VIDEOBLOCKSLOT%d';
const VIDEO_REGEX = /\[video:([^\]\n]+)\]/g;

function extractVideoTokens(md) {
  const videoBlocks = [];
  let index = 0;

  const processed = md.replace(VIDEO_REGEX, (match, raw) => {
    const { src, caption } = parseVideoToken(raw.trim());

    videoBlocks.push({ src, caption });

    const placeholder = VIDEO_PLACEHOLDER.replace('%d', index++);

    return `\n\n${placeholder}\n\n`;
  });

  return { processed, videoBlocks };
}

function parseVideoToken(raw) {
  const captionMatch = raw.match(/caption:"([^"]+)"/);

  const caption = captionMatch
    ? captionMatch[1]
    : null;

  const src = raw
    .replace(/caption:"[^"]+"\s*/g, '')
    .trim();

  return { src, caption };
}

function reinjectVideos(html, videoBlocks) {
  // Marked wraps placeholders in <p> tags, so we match both cases
  return html.replace(
    /<p>\s*VIDEOBLOCKSLOT(\d+)\s*<\/p>|VIDEOBLOCKSLOT(\d+)/g,
    (match, idx1, idx2) => {
      const idx = parseInt(
        idx1 !== undefined ? idx1 : idx2,
        10
      );

      const block = videoBlocks[idx];

      if (!block) return '';

      return buildVideoHTML(block.src, block.caption);
    }
  );
}

function extractYouTubeId(url) {
  const cleanUrl = url.split('?')[0];

  const match = cleanUrl.match(
    /(?:youtube\.com\/watch\/?|youtube\.com\/shorts\/|youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );

  // fallback for standard watch?v=
  if (!match) {
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);

    return watchMatch
      ? watchMatch[1]
      : null;
  }

  return match[1];
}

function buildVideoHTML(src, caption) {
  const label = caption || 'Video';

  let innerHtml;

  const videoId = extractYouTubeId(src);

  if (videoId) {
    const isShort = src.includes('/shorts/');

    innerHtml = `
      <div class="video-embed-wrapper ${isShort ? 'ratio-9-16' : 'ratio-16-9'}">
        <iframe
          src="https://www.youtube.com/embed/${videoId}"
          title="${esc(label)}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>`;
  } else {
    const ext = src.split('.').pop().toLowerCase();

    const mimeMap = {
      mp4: 'video/mp4',
      webm: 'video/webm',
      ogg: 'video/ogg',
      mov: 'video/quicktime'
    };

    const mime = mimeMap[ext] || 'video/mp4';

    innerHtml = `
      <div class="video-embed-wrapper">
        <video controls preload="metadata">
          <source src="${esc(src)}" type="${esc(mime)}" />
          Your browser does not support the video tag.
        </video>
      </div>`;
  }

  return `
    <div class="video-embed">
      <p class="video-embed-label">${esc(label)}</p>
      ${innerHtml}
    </div>`;
}

/* ─── HELPERS ────────────────────────────────────────── */

function findAdjacentPost(posts, currentSlug, direction) {
  const idx = posts.findIndex(p => p.slug === currentSlug);

  if (idx === -1) return null;

  return posts[idx + direction] || null;
}

function renderError(msg, container) {
  container.innerHTML = `
    <div class="empty-state full-page">
      <h3>Oops</h3>

      <p>${msg}</p>

      <a
        href="index.html"
        style="
          margin-top:16px;
          display:inline-block;
          font-family:var(--font-mono);
          font-size:0.8rem;
          color:var(--accent-light)
        ">
        ← Back to Dev Log
      </a>
    </div>`;
}

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}