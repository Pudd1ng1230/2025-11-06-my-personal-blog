const express = require('express');
const path = require('path');
const fs = require('fs');
const { marked } = require('marked');
const fm = require('front-matter');

const app = express();
const PORT = process.env.PORT || 8888;

const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));

// ── 读取文章 ──────────────────────────────────────────
function getAllPosts() {
  const dir = path.join(__dirname, 'content', 'posts');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
      const { attributes, body } = fm(raw);
      const slug = f.replace(/\.md$/, '');
      return {
        slug,
        title: attributes.title || slug,
        date: attributes.date || '1970-01-01',
        category: attributes.category || '测试',
        excerpt: attributes.excerpt || body.replace(/[#*>`\n]/g, '').slice(0, 150) + '…',
        body,
        year: slug.slice(0, 4),
        month: slug.slice(5, 7),
        day: slug.slice(8, 10),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** 读取页面 Markdown */
function getPageContent(name) {
  const p = path.join(__dirname, 'content', 'pages', name + '.md');
  if (!fs.existsSync(p)) return '';
  const { body } = fm(fs.readFileSync(p, 'utf-8'));
  return marked.parse(body);
}

/** 读取友链数据 */
function getFriends() {
  const p = path.join(__dirname, 'data', 'friends.json');
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

/** 计算站点统计 */
function getStats(posts) {
  const totalWords = posts.reduce((sum, p) => sum + p.body.replace(/[#*>`\n\s]/g, '').length, 0);
  const firstPost = posts[posts.length - 1];
  const siteStart = firstPost ? new Date(firstPost.date) : new Date('2025-11-06');
  const runDays = Math.floor((Date.now() - siteStart.getTime()) / 86400000);
  const lastUpdate = posts.length > 0 ? posts[0].date : '—';

  return {
    articleCount: posts.length,
    totalWords,
    runDays,
    lastUpdate,
  };
}

// ── 路由 ──────────────────────────────────────────────
app.get('/', (req, res) => {
  const all = getAllPosts();
  const cat = req.query.cat || '';
  const categories = ['测试', '相册', '絮语', '探索'];
  const posts = cat ? all.filter(p => p.category === cat) : all;
  const stats = getStats(all);

  res.render('home', {
    title: 'Pudd1ng',
    posts,
    categories,
    activeCat: cat,
    stats,
  });
});

app.get('/post/:slug', (req, res) => {
  const posts = getAllPosts();
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).render('404', { title: '404' });
  const idx = posts.indexOf(post);
  res.render('post', {
    title: post.title + ' - Pudd1ng',
    post: { ...post, html: marked.parse(post.body) },
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx < posts.length - 1 ? posts[idx + 1] : null,
  });
});

// 归档
app.get('/archive', (req, res) => {
  const posts = getAllPosts();
  const map = {};
  posts.forEach(p => {
    if (!map[p.year]) map[p.year] = {};
    if (!map[p.year][p.month]) map[p.year][p.month] = [];
    map[p.year][p.month].push(p);
  });
  const archives = Object.entries(map).sort((a, b) => b[0].localeCompare(a[0]));
  res.render('archive', { title: '归档 - Pudd1ng', archives });
});

// 关于
app.get('/about', (req, res) => {
  res.render('about', { title: '关于 - Pudd1ng', content: getPageContent('about') });
});

// 留言板
app.get('/guestbook', (req, res) => {
  res.render('guestbook', { title: '留言板 - Pudd1ng', content: getPageContent('guestbook') });
});

// 友链
app.get('/friends', (req, res) => {
  const friends = getFriends();
  const allTags = [...new Set(friends.flatMap(f => f.tags || []))].sort();
  res.render('friends', { title: '友链 - Pudd1ng', friends, allTags });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

app.listen(PORT, () => {
  console.log(`🍮 Pudd1ng 博客已启动: http://localhost:${PORT}`);
});
