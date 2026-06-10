// render.js — shared rendering helpers

function renderArticleGrid(containerId) {
  const articles = getArticles();
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = articles.map(a => `
    <a href="article.html?id=${a.id}" class="article-card">
      <span class="tag">${a.tag}</span>
      <h3>${a.title}</h3>
      <p>${a.excerpt}</p>
      <span class="read-more">${a.mins} min read →</span>
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
  el.innerHTML = article.body;
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
