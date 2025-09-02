const toggleButton = document.getElementById('darkMode');
const rootElement = document.documentElement;

function setTheme(theme) {
  if (theme === 'dark') {
    rootElement.classList.add('dark');
  } else {
    rootElement.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  if (rootElement.classList.contains('dark')) {
    setTheme('light');
    document.getElementById('map').setAttribute('fill', 'black');
    document.getElementById('map').setAttribute('stroke', 'white');
    toggleButton.textContent = 'Light';
  } else {
    setTheme('dark');
    document.getElementById('map').setAttribute('fill', 'white');
    document.getElementById('map').setAttribute('stroke', 'black');
    toggleButton.innerHTML = 'Dark';
  }
}

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
  setTheme(savedTheme);
} else if (systemPrefersDark) {
  setTheme('dark');
}

toggleButton.addEventListener('click', toggleTheme);