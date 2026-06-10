// render.js — shared rendering helpers

const ARTICLE_IMAGES = [
  'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80',
  'https://images.unsplash.com/photo-1655720828083-f9bdbd70a6e3?w=600&q=80',
  'https://images.unsplash.com/photo-1684369175833-4b445ad6bfb5?w=600&q=80',
  'https://images.unsplash.com/photo-1676277791608-ac54525aa94d?w=600&q=80',
  'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80',
  'https://images.unsplash.com/photo-1680016861993-18e4b9cf1ace?w=600&q=80',
  'https://images.unsplash.com/photo-1686191128892-3b37add4c844?w=600&q=80',
];

function getImage(id) {
  return ARTICLE_IMAGES[id % ARTICLE_IMAGES.length];
}

function renderArticleGrid(containerId) {
  const articles = getArticles();
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = articles.map((a, i) => `
    <a href="article.html?id=${a.id}" class="article-card">
      <div class="card-img" style="background-image: url('${a.image || getImage(i)}')"></div>
      <div class="card-body">
        <span class="tag">${a.tag}</span>
        <h3>${a.title}</h3>
        <p>${a.excerpt}</p>
        <span class="read-more">${a.mins} min read →</span>
      </div>
    </a>
  `).join('');
}

function renderArticlePage(containerId, id) {
  const articles = getArticles();
  const article = articles.find(a => a.id === id);
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!article) {
    el.innerHTML = '<p>Article not found. <a href="index.html">Back to home</a></p>';
    return;
  }
  document.title = article.title + ' — AIToolsInsider';
  document.getElementById('page-desc').content = article.excerpt;
  const idx = articles.indexOf(article);
  const img = article.image || getImage(idx);
  el.innerHTML = `<div class="article-hero-img" style="background-image:url('${img}')"></div>` + article.body;
}

function renderAdminList(containerId) {
  const articles = getArticles();
  const el = document.getElementById(containerId);
  if (!el) return;
  if (articles.length === 0) {
    el.innerHTML = '<p style="color:#666; font-size:14px;">No articles yet. Generate one above.</p>';
    return;
  }
  el.innerHTML = `<table class="affiliate-table">
    <thead><tr><th>Title</th><th>Tag</th><th>Read time</th><th></th></tr></thead>
    <tbody>
      ${articles.map(a => `
        <tr>
          <td>${a.title}</td>
          <td><span class="tag">${a.tag}</span></td>
          <td>${a.mins} min</td>
          <td><a href="article.html?id=${a.id}" target="_blank">View →</a></td>
        </tr>
      `).join('')}
    </tbody>
  </table>`;
}
