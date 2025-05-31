document.addEventListener('DOMContentLoaded', () => {

  // THEME SWITCHING
  // =========================================
  //

  const themeContainer = document.querySelector("html");
  const localStorageTheme = localStorage.getItem("theme");
  const themeToggleButton = document.querySelector("[data-theme-toggle]");
  const iconDark = document.querySelector(".ic-theme-dark");
  const iconLight = document.querySelector(".ic-theme-light");

  function getLocalStorageTheme(localStorageTheme) {
    return localStorageTheme !== null ? localStorageTheme : "light";
  }

  function updateTheme({ theme, buttonEl }) {
    const newTitle = theme === "dark" ? "Claro" : "Oscuro";
    buttonEl.setAttribute("title", newTitle);

    // Toggle icon based on theme
    if (theme === "dark") {
      iconLight.classList.remove("d-none");
      iconDark.classList.add("d-none");
    } else {
      iconLight.classList.add("d-none");
      iconDark.classList.remove("d-none");
    }

    // Apply the theme globally to the entire document
    themeContainer.setAttribute("data-theme", theme);
  }

  let currentThemeSetting = getLocalStorageTheme(localStorageTheme);
  updateTheme({ theme: currentThemeSetting, buttonEl: themeToggleButton });

  themeToggleButton.addEventListener("click", () => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

    localStorage.setItem("theme", newTheme);
    updateTheme({ theme: newTheme, buttonEl: themeToggleButton });

    currentThemeSetting = newTheme;
  });


  // NAVBAR HEIGHT DETECTION
  // =========================================
  //

  const navbar = document.getElementById('main-navbar');

  function updateNavbarHeight(entries) {
    const navbarHeight = entries[0].target.offsetHeight;

    // Update CSS variable
    document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
  }

  const initialHeight = navbar.offsetHeight;

  // Set initial --navbar-height variable with the default height
  document.documentElement.style.setProperty('--navbar-height', `${initialHeight}px`);

  // Use ResizeObserver to detect changes in the #main-navbar element's size
  const resizeObserver = new ResizeObserver(updateNavbarHeight);
  resizeObserver.observe(navbar);


  // SIDEBAR FUNCTIONALITY
  // =========================================
  //

  (function() {
    const bodyElement = document.body;
    const sidebarContainer = document.querySelector(".app-sidebar");
    // const sidebarBreakpoint = window.matchMedia("(max-width: 1400px)");
    const menuButton = document.querySelector(".menu-button");

    function openSidebar() {   
      bodyElement.classList.add("has-sidebar-open");
      sidebarContainer.classList.add("is-open");
      menuButton.classList.add("d-none");
    }

    function closeSidebar() {  
      bodyElement.classList.remove("has-sidebar-open");
      sidebarContainer.classList.remove("is-open");
      menuButton.classList.remove("d-none");
    }

    // Event delegation for open and close controllers
    document.addEventListener("click", (e) => {
      const openController = e.target.closest("[data-open-sidebar]");
      const closeController = e.target.closest("[data-close-sidebar]");

      if (openController) {
        e.preventDefault();
        openSidebar();
      }

      if (closeController) {
        e.preventDefault();
        closeSidebar();
      }
    });
  })();


  // DIALOG FUNCTIONALITY
  // =========================================
  //

  (function() {
    const dialogContainer = document.querySelectorAll(".dialog");
    const bodyElement = document.body;

    document.addEventListener("click", (e) => {
      const openController = e.target.closest("[data-dialog-action='open']");
      const closeController = e.target.closest("[data-dialog-action='close']");

      if (openController) {
        e.preventDefault();
        const dialogID = openController.getAttribute("data-dialog-target");
        const currentDialogContainer = document.getElementById(dialogID);
        bodyElement.classList.add("has-dialog-active");
        currentDialogContainer.classList.toggle("is-active");
      }

      if (closeController) {
        e.preventDefault();
        for (let dc of dialogContainer) {
          dc.classList.remove("is-active");
        }
        bodyElement.classList.remove("has-dialog-active");
      }
    });
  })();
});
