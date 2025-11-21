document.addEventListener("DOMContentLoaded", () => {
  // --- Theme Toggle Logic ---
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  // Set initial theme based on local storage or system preference
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    html.setAttribute("data-theme", currentTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute("data-theme", "dark");
  } else {
    html.setAttribute("data-theme", "light");
  }

  // Update button icon based on current theme
  const updateThemeIcon = () => {
    const theme = html.getAttribute("data-theme");
    if (theme === "dark") {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  };

  updateThemeIcon(); // Initial icon set

  // Event listener for toggling the theme
  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon();
  });


  // --- HAMBURGER MENU LOGIC ---
  const menuToggle = document.getElementById("menu-toggle");
  const navList = document.getElementById("nav-list");

  // Toggle menu visibility and update icon
  const toggleMenu = () => {
      navList.classList.toggle("open");

      // Change icon between bars (open) and times (close)
      if (navList.classList.contains("open")) {
        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
      } else {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
  }

  menuToggle.addEventListener("click", toggleMenu);
  
  // Close menu when a link is clicked (improves mobile UX)
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      // Only close if the menu is open (for mobile view)
      if (navList.classList.contains('open')) {
        toggleMenu(); 
      }
    });
  });


  // --- Dynamic Typing Effect Logic ---
  const dynamicTextElement = document.querySelector(".dynamic-text");
  const phrases = [
    "IT Manager ⚙️",
    "Front End Developer 💻",
    "Wordpress & Wix Designer 🌐",
    "Maritime Officer ⚓",
    "Photographer 📸",
    "Licensed Drone Operator 🚁"
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeText() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      // Deleting character
      dynamicTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Typing character
      dynamicTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typingSpeed = 100;

    // Check if phrase is fully typed
    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000; // Pause after typing
      isDeleting = true;
    } 
    // Check if phrase is fully deleted
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next phrase
      typingSpeed = 500; // Pause before starting next phrase
    } 
    // Speed up deletion
    else if (isDeleting) {
      typingSpeed = 50;
    }

    setTimeout(typeText, typingSpeed);
  }

  // Start the typing animation
  typeText();
});