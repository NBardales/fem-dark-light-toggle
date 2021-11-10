// get the toggle button
const toggleButton = document.getElementById("themeSwitch");
let setDarkMode = () => {
  console.log('setDarkMode');
  document.body.classList = 'dark';
}

let setLightMode = () => {
  console.log('setLightMode');
  document.body.classList = 'light';
}

// set theme from local storage
const setColorMode = () => {
  console.log('setColorMode');
  console.log(localStorage.getItem('colorMode'));

  if (localStorage.getItem('colorMode') == 'dark') {
    setDarkMode();
    toggleButton.setAttribute("aria-pressed", "false");
  } else if (localStorage.getItem('colorMode') == 'light') {
    setLightMode();
    toggleButton.setAttribute("aria-pressed", "true");
  } 
}

// check user's color scheme and watch for changes
const checkMode = () => {
  if (localStorage.getItem('colorMode') == null) {
    if (window.matchMedia("(prefers-color-scheme: light)").matches){
      toggleButton.setAttribute("aria-pressed", "true");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      toggleButton.setAttribute("aria-pressed", "false");
    }
  }
}

const checkModeChange = () => {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    console.log('checkModeChange');
    checkMode();
  })
}

setColorMode();
checkMode();
checkModeChange();

// Theme Toggle 
toggleButton.addEventListener('click', (event) => {
  if (toggleButton.getAttribute("aria-pressed") == "false") {
      toggleButton.setAttribute("aria-pressed", "true");
      setLightMode();
      localStorage.setItem('colorMode', 'light');
  } else {
    toggleButton.setAttribute("aria-pressed", "false");
    setDarkMode();
      localStorage.setItem('colorMode', 'dark');
  }
})