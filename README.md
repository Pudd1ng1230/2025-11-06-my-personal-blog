# 🍮 Pudd1ng's Personal Blog

基于 [Hexo 7.3.0](https://hexo.io/) 的个人博客，部署于 GitHub Pages。

> 🔗 在线访问: [pudd1ng1230.github.io](https://pudd1ng1230.github.io)

---

## 技术栈

| 层面 | 技术 |
|------|------|
| 静态生成 | Hexo 7.3.0 |
| 主题 | Hingle (by Dreamer-Paul) + 自定义 |
| 样式框架 | Kico |
| 图标 | Font Awesome 6.0.0 |
| 托管 | GitHub Pages |
| 语言 | 中文 (zh-CN) |

---

## 项目结构

```
.
├── index.html                    # 首页
├── 2025/11/06/欢迎来到我的博客/  # 文章 (按日期/标题)
├── archives/                     # 归档
├── categories/                   # 分类页 (日常/摄影/算法/随笔/探索)
├── tags/                         # 标签页
├── explore/                      # 探索页
├── create/                       # 创作页
├── interests/                    # 兴趣页
├── css/
│   ├── custom.css                # 核心自定义样式
│   └── category.css              # 分类/列表样式
└── static/
    ├── sidebar.js                # 侧边栏交互
    ├── panel.js                  # 面板切换
    ├── kico.css / kico.js        # Kico 框架
    ├── hingle.css / hingle.js    # Hingle 主题
    └── img/                      # 图片资源
```

---

## 功能特性

- 🌓 暗色/亮色主题切换
- 📱 响应式布局 + 侧边栏
- 🏷️ 分类 + 标签双体系
- 📅 按年月归档
- 🔗 B站 / GitHub 社交链接

---

## 本地运行

由于仓库只包含 Hexo 的生成输出（非源码），直接在浏览器打开 `index.html` 即可预览（CDN 资源需联网）。

完整开发环境（需要 Hexo 源码）：
```bash
npm install -g hexo-cli
hexo server        # → http://localhost:4000
```

---

## 许可证

© 2025 Pudd1ng. 主题基于 [Hingle](https://github.com/Dreamer-Paul/Hingle)。
