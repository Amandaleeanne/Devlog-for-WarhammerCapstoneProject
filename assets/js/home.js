/**
 * home.js — Renders the post card list on index.html
 */

(async function () {
  const grid = document.getElementById('posts-grid');
  const countEl = document.getElementById('post-count');

  const posts = await Blog.fetchPosts();

  if (posts.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>No posts yet</h3>
        <p>The first dispatch from the war room is coming soon.</p>
      </div>`;
    countEl.textContent = '0 posts';
    return;
  }

  countEl.textContent = `${posts.length} post${posts.length !== 1 ? 's' : ''}`;

  grid.innerHTML = posts.map((post, i) => {
    const featured = i === 0 ? 'featured' : '';
    const videoTag = post.hasVideo
      ? `<span class="post-card-video-badge">Includes video</span>`
      : '';

    return `
      <a class="post-card ${featured}" href="post.html?slug=${encodeURIComponent(post.slug)}">
        <div class="post-card-meta">
          ${post.tag ? `<span class="post-card-tag">${escHtml(post.tag)}</span>` : ''}
          <span class="post-card-date">${Blog.formatDate(post.date)}</span>
        </div>
        <h2 class="post-card-title">${escHtml(post.title)}</h2>
        ${post.excerpt ? `<p class="post-card-excerpt">${escHtml(post.excerpt)}</p>` : ''}
        <div class="post-card-footer">
          ${post.readTime ? `<span class="post-card-readtime">${escHtml(post.readTime)}</span>` : ''}
          ${videoTag}
        </div>
      </a>`;
  }).join('');
})();

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
