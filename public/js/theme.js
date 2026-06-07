/**
 * 暗色模式 — localStorage 持久化
 */
(function () {
  const KEY = 'pudd1ng-theme';
  const btn = document.getElementById('themeBtn');
  const icon = btn ? btn.querySelector('i') : null;

  if (localStorage.getItem(KEY) === 'dark') {
    document.body.classList.add('dark');
  }
  updateIcon();

  if (btn) {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem(KEY, isDark ? 'dark' : 'light');
      updateIcon();
    });
  }

  function updateIcon() {
    if (!icon) return;
    const isDark = document.body.classList.contains('dark');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  }
})();
