// admin.js — article generation via Anthropic API

let generatedArticle = null;

async function generateArticle() {
  const topic = document.getElementById('topic').value.trim();
  const type = document.getElementById('article-type').value;
  const affiliates = document.getElementById('affiliates').value.trim();
  const apiKey = document.getElementById('api-key').value.trim();

  if (!topic) return showStatus('error', 'Please enter a topic.');
  if (!apiKey) return showStatus('error', 'Please enter your Anthropic API key.');

  const btn = document.getElementById('gen-btn');
  btn.disabled = true;
  btn.textContent = 'Generating…';
  showStatus('info', 'Claude is writing your article — this takes about 15 seconds…');
  document.getElementById('preview-card').style.display = 'none';

  const typeDesc = {
    listicle: 'a numbered listicle (e.g. "Top 7 X for Y")',
    comparison: 'a head-to-head comparison article',
    guide: 'a practical step-by-step how-to guide',
    review: 'an in-depth product review'
  }[type];

  const tagLabel = {
    listicle: 'Listicle',
    comparison: 'Comparison',
    guide: 'Guide',
    review: 'Review'
  }[type];

  const prompt = `Write ${typeDesc} for an SEO affiliate content site about: "${topic}".

Requirements:
- 500–700 words
- SEO-optimised with natural keyword usage
- Naturally mention and recommend these affiliate tools where relevant: ${affiliates}
- After each affiliate tool mention, add a call-to-action link placeholder in this exact format: <a href="[AFFILIATE_LINK_ToolName]" class="affiliate-link">Try ToolName free →</a>
- Include an engaging intro paragraph, 3–5 sections each with an <h3> heading, and a short conclusion
- Conversational but authoritative tone
- Do NOT include the article title as an <h1> — just start with the intro paragraph after the title line

Format your response exactly like this:
TITLE: [article title here]
TAG: ${tagLabel}
MINS: [estimated read time as a number, e.g. 7]
---
[full article HTML body here using <p>, <h3>, <a> tags only]`;

  try {
    const PROXY = 'https://twilight-dawn-fc2e.claudiasmith98.workers.dev';
    const resp = await fetch(PROXY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await resp.json();
    if (data.error) throw new Error(data.error.message);

    const text = data.content.map(c => c.text || '').join('');
    const titleMatch = text.match(/TITLE:\s*(.+)/);
    const tagMatch = text.match(/TAG:\s*(.+)/);
    const minsMatch = text.match(/MINS:\s*(\d+)/);
    const bodyMatch = text.split('---\n')[1];

    if (!titleMatch || !bodyMatch) throw new Error('Unexpected response format. Try again.');

    const title = titleMatch[1].trim();
    const tag = tagMatch ? tagMatch[1].trim() : tagLabel;
    const mins = minsMatch ? parseInt(minsMatch[1]) : 6;
    const body = `<h2>${title}</h2>\n` + bodyMatch.trim();
    const excerpt = bodyMatch.replace(/<[^>]+>/g, '').split('.').slice(0, 2).join('.').trim() + '.';

    generatedArticle = { title, tag, mins, excerpt, body };

    document.getElementById('preview-output').innerHTML = body;
    document.getElementById('preview-card').style.display = 'block';
    showStatus('success', '✓ Article generated. Review it below, then publish.');
  } catch (err) {
    showStatus('error', 'Error: ' + err.message);
  }

  btn.disabled = false;
  btn.textContent = 'Generate article';
}

function publishArticle() {
  if (!generatedArticle) return;
  const id = saveArticle(generatedArticle);
  document.getElementById('preview-card').style.display = 'none';
  generatedArticle = null;
  showStatus('success', '✓ Published! <a href="article.html?id=' + id + '">View article →</a>');
  renderAdminList('admin-article-list');
}

function showStatus(type, html) {
  const el = document.getElementById('gen-status');
  el.style.display = 'block';
  el.className = 'status-bar status-' + type;
  el.innerHTML = html;
}
