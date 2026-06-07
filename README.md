# 🍮 Pudd1ng's Personal Blog

纯手写 **Express + EJS** 个人博客，零框架依赖。

> 🔧 本地: `http://localhost:8888`

---

## 快速开始

```bash
npm install
npm run dev    # 开发模式 (自动重启)
npm start      # 生产模式
```

---

## 功能

- 🖼️ 全屏英雄区（背景图 + Canvas 粒子 + 打字机）
- 📑 三栏布局（个人简介 / 分类筛选+文章 / 站点统计）
- 🏷️ 四分类：测试 / 相册 / 絮语 / 探索
- 📅 归档（按年月折叠）
- 🔗 友链（卡片网格 + 标签筛选）
- 💬 留言板
- 🙋 关于页
- 🌓 暗色模式（localStorage 持久化）

---

## 写文章

`content/posts/YYYY-MM-DD-slug.md`：

```markdown
---
title: 文章标题
date: 2025-12-01
category: 测试
---
正文 Markdown…
```

---

## 项目结构

```
├── server.js           # Express 入口
├── views/              # EJS 模板
├── public/             # CSS / JS / 图片
├── content/posts/      # Markdown 文章
├── content/pages/      # 独立页面 Markdown
└── data/               # 友链 JSON
```

---

## 部署

```bash
npm start              # → :8888
```

配合 Nginx 反向代理 + 自有域名即可上线。

---

© 2025 Pudd1ng · 纯手写 · 无框架
