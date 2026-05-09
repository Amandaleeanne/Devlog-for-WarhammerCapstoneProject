/**
 * posts.js — Central data layer
 * Fetches the posts registry and provides helper functions.
 * 
 * To add a new post:
 *  1. Write your .md file and place it in /posts/
 *  2. Add an entry to /posts/posts.json
 *  3. Commit and push — done!
 */

window.Blog = window.Blog || {};

/**
 * Fetch the post registry.
 * Returns an array of post metadata objects (sorted newest first).
 */
Blog.fetchPosts = async function () {
  try {
    const res = await fetch('posts/posts.json?cb=' + Date.now());
    if (!res.ok) throw new Error('Could not load posts.json');
    const data = await res.json();
    // Sort by date descending
    return (data.posts || []).sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (err) {
    console.error('Blog.fetchPosts error:', err);
    return [];
  }
};

/**
 * Fetch the raw Markdown for a given post slug.
 */
Blog.fetchPostContent = async function (slug) {
  const res = await fetch(`posts/${slug}.md`);
  if (!res.ok) throw new Error(`Post not found: ${slug}`);
  return res.text();
};

/**
 * Format a date string like "2025-04-01" → "April 1, 2025"
 */
Blog.formatDate = function (dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

/**
 * Estimate reading time from a markdown string.
 */
Blog.readTime = function (md) {
  const words = md.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 220));
  return `${mins} min read`;
};

/**
 * Get a query param from the current URL.
 */
Blog.getParam = function (name) {
  return new URLSearchParams(window.location.search).get(name);
};
