function setTheme() {
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)"); // 是深色
  if (isDarkTheme.matches) {
    document.documentElement.dataset.theme = "dark";
  } else {
    document.documentElement.dataset.theme = "light";
  }
}
setTheme();

window.matchMedia("(prefers-color-scheme: dark)").onchange = () => { 
  setTheme();
}