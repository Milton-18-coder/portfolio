// --- PROJECT CASE STUDIES DATA ---
const projectData = {
  1: {
    title: "Algorithm Visualizer",
    category: "Web App",
    desc: "The Algorithm Visualizer is an interactive web-based sorting and pathfinding visualizer built to help students understand algorithms step-by-step. It features adjustable speed controls, custom wall creation, and animations for Dijkstra's, A*, BFS, DFS, Merge Sort, and Quick Sort. By utilizing standard HTML5 canvas overlays and asynchronous scheduling, the application ensures extremely smooth visuals.",
    client: "Academic Project",
    date: "April 2026",
    role: "Lead Developer",
    technologies: "React, CSS3, Vanilla JS, HTML5 Canvas, Algorithms",
    image: "project1.jpg",
    repo: "https://github.com/Milton-18-coder",
    live: "https://example.com"
  },
  2: {
    title: "Campus Event Hub",
    category: "Frontend",
    desc: "A creative event portal designed for university clubs. This project enables organizers to publish events and students to filter, register, and set reminders. It features a fully responsive layout with glassmorphic cards, transition animations, and dark/light dynamic styling.",
    client: "University Web Club",
    date: "December 2025",
    role: "Frontend Developer",
    technologies: "HTML5, CSS3, JavaScript, Vite, Tailwind CSS",
    image: "project2.jpg",
    repo: "https://github.com/Milton-18-coder",
    live: "https://example.com"
  },
  3: {
    title: "Study Group Finder",
    category: "UI/UX",
    desc: "A thorough UI/UX design project for a mobile app matching students in the same courses. The project involved conducting student interviews, mapping user journeys, creating low-fidelity wireframes, and building a fully interactive high-fidelity prototype in Figma. Tested with multiple student groups to optimize scheduling and communication flows.",
    client: "Personal Design Study",
    date: "November 2025",
    role: "UX Researcher & Designer",
    technologies: "Figma, Interactive Prototyping, User Research",
    image: "project3.jpg",
    repo: "https://figma.com",
    live: "https://dribbble.com"
  },
  4: {
    title: "Personal Portfolio",
    category: "Frontend",
    desc: "A highly interactive portfolio website built to showcase academic journey and projects. It implements a custom HTML5 canvas particle system that repels on mouse movement, custom cursors, smooth glassmorphic design, and an integrated intersection observer for sleek fade-in scroll reveals.",
    client: "Personal Project",
    date: "June 2026",
    role: "Developer",
    technologies: "HTML5, Vanilla JS, CSS Variables, Canvas API",
    image: "project4.jpg",
    repo: "https://github.com/Milton-18-coder",
    live: "https://example.com"
  },
  5: {
    title: "Student Kanban Board",
    category: "Web App",
    desc: "A task tracking application designed specifically for college coursework. Students can group tasks by course, set priority levels and due dates, and view a timeline. Features localized persistent storage and a Node/Express backend mock API to query academic calendars.",
    client: "Academic Project",
    date: "May 2025",
    role: "Full-Stack Developer",
    technologies: "React, Node.js, Express, MongoDB, CSS Modules",
    image: "project5.jpg",
    repo: "https://github.com/Milton-18-coder",
    live: "https://example.com"
  },
  6: {
    title: "Interactive Flashcard App",
    category: "UI/UX",
    desc: "An educational mobile-first study tool designed to aid active recall and spaced repetition. The UI features natural gestures, light animations, and custom study metrics logs, helping students track their learning progress over time.",
    client: "Personal Hobby Project",
    date: "January 2025",
    role: "Developer & Designer",
    technologies: "Figma, Vanilla JS, CSS Animations, LocalStorage",
    image: "project6.jpg",
    repo: "https://figma.com",
    live: "https://example.com"
  }
};

// --- INITIALIZE & STATE ---
document.addEventListener("DOMContentLoaded", () => {
  initCursor();
  initTheme();
  initTypewriter();
  initCanvas();
  initFilters();
  initObserver();
  initScrollTop();
  initContactForm();
  initMobileMenu();
  fetchGitHubRepos();
});

// --- CUSTOM CURSOR ---
function initCursor() {
  const dot = document.getElementById("cursor-dot");
  const circle = document.getElementById("cursor-circle");
  
  if (!dot || !circle) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let circleX = mouseX;
  let circleY = mouseY;
  const lerpSpeed = 0.12;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot moves instantly
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Lagging circle movement loop
  function updateCircle() {
    circleX += (mouseX - circleX) * lerpSpeed;
    circleY += (mouseY - circleY) * lerpSpeed;
    
    circle.style.left = `${circleX}px`;
    circle.style.top = `${circleY}px`;
    
    requestAnimationFrame(updateCircle);
  }
  updateCircle();

  // Add hover effect to interactive elements
  const hoverElements = "a, button, .filter-btn, .project-card, .social-link, .modal-close";
  
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverElements)) {
      document.body.classList.add("cursor-hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverElements)) {
      document.body.classList.remove("cursor-hover");
    }
  });
}

// --- THEME SYSTEM ---
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  // Check storage or preference
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

// --- HERO TYPEWRITER ---
function initTypewriter() {
  const textContainer = document.getElementById("typewriter-text");
  if (!textContainer) return;

  const roles = ["Computer Science Student", "Frontend Developer", "Problem Solver"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      // Deleting characters
      textContainer.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // faster deletion
    } else {
      // Typing characters
      textContainer.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // normal typing
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      isDeleting = true;
      typingSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
      // Switch word
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // brief pause before new typing starts
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// --- HTML5 CANVAS PARTICLE SYSTEM ---
function initCanvas() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let animationId;
  let particlesArray = [];
  
  // Track mouse coordinates & action
  const mouse = {
    x: null,
    y: null,
    radius: 120 // repulsion circle radius
  };

  // Adjust size
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  window.addEventListener("resize", () => {
    cancelAnimationFrame(animationId);
    setCanvasSize();
  });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle representation
  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
      this.baseX = this.x; // fallback anchor
      this.baseY = this.y;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      // Bounce boundaries
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }

      // Mouse interactive repulsion logic
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          // Push particles back proportional to proximity
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let force = (mouse.radius - distance) / mouse.radius;
          let directionX = forceDirectionX * force * 5;
          let directionY = forceDirectionY * force * 5;
          
          this.x -= directionX;
          this.y -= directionY;
        }
      }

      // Default movement
      this.x += this.directionX;
      this.y += this.directionY;
      
      this.draw();
    }
  }

  // Populate particles array
  function initParticles() {
    particlesArray = [];
    // Adjust density by screen space width
    let numberOfParticles = (canvas.width * canvas.height) / 14000;
    numberOfParticles = Math.min(numberOfParticles, 120); // upper cap

    // Use current theme dynamic colors
    const isDark = document.documentElement.getAttribute("data-theme") !== "light";
    const particleColor = isDark ? "rgba(139, 92, 246, 0.2)" : "rgba(99, 102, 241, 0.25)";

    for (let i = 0; i < numberOfParticles; i++) {
      let size = (Math.random() * 2) + 1.5;
      let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
      let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
      let directionX = (Math.random() * 0.8) - 0.4;
      let directionY = (Math.random() * 0.8) - 0.4;
      
      particlesArray.push(new Particle(x, y, directionX, directionY, size, particleColor));
    }
  }

  // Draw connecting webs
  function connect() {
    let opacityValue = 1;
    const isDark = document.documentElement.getAttribute("data-theme") !== "light";
    const lineBase = isDark ? "139, 92, 246" : "99, 102, 241";
    
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 110) {
          opacityValue = 1 - (distance / 110);
          ctx.strokeStyle = `rgba(${lineBase}, ${opacityValue * 0.15})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Core loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    
    connect();
    animationId = requestAnimationFrame(animate);
  }

  // Watch theme changes to update particle colors
  const themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "data-theme") {
        initParticles();
      }
    });
  });
  themeObserver.observe(document.documentElement, { attributes: true });

  // Init
  setCanvasSize();
  animate();
}

// --- PROJECT FILTERING ---
function initFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach(btn => {
    // Prevent duplicate event bindings
    if (btn.dataset.filterBound) return;
    btn.dataset.filterBound = "true";

    btn.addEventListener("click", () => {
      // Toggle button active classes
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const filterValue = btn.getAttribute("data-filter");
      const projectCards = document.querySelectorAll(".project-card");
      
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        
        if (filterValue === "all" || cardCategory === filterValue) {
          // Remove display none, transition fade-in
          card.style.display = "flex";
          setTimeout(() => {
            card.classList.remove("fade-out");
            card.classList.add("fade-in");
          }, 50);
        } else {
          // Fade out, then display none
          card.classList.remove("fade-in");
          card.classList.add("fade-out");
          setTimeout(() => {
            if (card.classList.contains("fade-out")) {
              card.style.display = "none";
            }
          }, 400); // synchronizes with CSS fade animation delay
        }
      });
    });
  });
}

// --- DETAIL MODALS SYSTEM ---
const modal = document.getElementById("project-modal");
const closeBtn = document.getElementById("modal-close-btn");

if (modal && closeBtn) {
  closeBtn.addEventListener("click", closeProjectModal);
  
  // Close on backdrop clicking
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  // Close on ESC keyboard press
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeProjectModal();
    }
  });
}

function openProjectModal(id) {
  const data = projectData[id];
  if (!data || !modal) return;

  // Fill tags & attributes
  document.getElementById("modal-image").src = data.image;
  document.getElementById("modal-image").alt = `${data.title} Interface`;
  document.getElementById("modal-tag").textContent = data.category;
  document.getElementById("modal-title").textContent = data.title;
  document.getElementById("modal-desc").textContent = data.desc;
  document.getElementById("modal-client").textContent = data.client;
  document.getElementById("modal-date").textContent = data.date;
  document.getElementById("modal-role").textContent = data.role;
  document.getElementById("modal-technologies").textContent = data.technologies;
  
  // Configure action buttons
  const repoBtn = document.getElementById("modal-repo-btn");
  const liveBtn = document.getElementById("modal-live-btn");
  
  repoBtn.href = data.repo;
  liveBtn.href = data.live;

  // Open modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Freeze scroll
}

function closeProjectModal() {
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = ""; // Re-enable scroll
}

// --- INTERSECTION OBSERVER (REVEALS) ---
function initObserver() {
  const options = {
    root: null,
    threshold: 0.15,
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, options);

  const targets = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right, .reveal-stagger");
  targets.forEach(target => observer.observe(target));

  // Sync scroll headers active class
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("header nav a");

  window.addEventListener("scroll", () => {
    let currentId = "";
    sections.forEach(section => {
      const top = window.scrollY;
      const offset = section.offsetTop - 150;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      
      if (top >= offset && top < offset + height) {
        currentId = id;
      }
    });

    if (currentId !== "") {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        }
      });
    }

    // Shrink header on scroll
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// --- SCROLL TO TOP ---
function initScrollTop() {
  const btn = document.getElementById("scroll-top-btn");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// --- MOBILE MENU DRAWER ---
function initMobileMenu() {
  const toggleBtn = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const links = document.querySelectorAll("#nav-menu a");

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("open");
    
    // Change bars to cross icon
    const icon = toggleBtn.querySelector("i");
    if (navMenu.classList.contains("open")) {
      icon.className = "fa-solid fa-xmark";
    } else {
      icon.className = "fa-solid fa-bars";
    }
  });

  // Close when clicking nav-link
  links.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      toggleBtn.querySelector("i").className = "fa-solid fa-bars";
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove("open");
      toggleBtn.querySelector("i").className = "fa-solid fa-bars";
    }
  });
}

// --- CONTACT FORM VALIDATION & SIMULATED SUBMIT ---
function initContactForm() {
  const form = document.getElementById("portfolio-contact-form");
  if (!form) return;

  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const subjectInput = document.getElementById("contact-subject");
  const messageInput = document.getElementById("contact-message");
  const submitBtn = document.getElementById("form-submit-btn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() === "") {
      showError("name", true);
      isValid = false;
    } else {
      showError("name", false);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showError("email", true);
      isValid = false;
    } else {
      showError("email", false);
    }

    // Validate Subject
    if (subjectInput.value.trim() === "") {
      showError("subject", true);
      isValid = false;
    } else {
      showError("subject", false);
    }

    // Validate Message
    if (messageInput.value.trim() === "") {
      showError("message", true);
      isValid = false;
    } else {
      showError("message", false);
    }

    if (isValid) {
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending... <i class="fa-solid fa-circle-notch fa-spin"></i>`;
      submitBtn.style.background = "linear-gradient(135deg, var(--secondary), var(--primary))";

      fetch("https://formsubmit.co/ajax/miltonjoshwa20@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: nameInput.value,
          email: emailInput.value,
          subject: subjectInput.value,
          message: messageInput.value
        })
      })
      .then(response => {
        if (!response.ok) throw new Error("Network error");
        return response.json();
      })
      .then(data => {
        if (data.success === "false" || data.success === false) {
          throw new Error(data.message || "FormSubmit rejected submission");
        }
        
        // Success state
        submitBtn.innerHTML = `Message Sent! <i class="fa-solid fa-check"></i>`;
        submitBtn.style.background = "#22c55e"; // success green
        form.reset();

        // Reset labels
        document.querySelectorAll(".form-control").forEach(control => {
          control.dispatchEvent(new Event("placeholder-shown"));
        });

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = "";
        }, 3000);
      })
      .catch(error => {
        console.error("Form submission error:", error);
        submitBtn.innerHTML = `Error sending! <i class="fa-solid fa-triangle-exclamation"></i>`;
        submitBtn.style.background = "#ef4444"; // error red
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = "";
        }, 3000);
      });
    }
  });

  // Helper to trigger UI errors
  function showError(field, show) {
    const errorEl = document.getElementById(`error-${field}`);
    const inputEl = document.getElementById(`contact-${field}`);
    
    if (!errorEl || !inputEl) return;

    if (show) {
      errorEl.style.display = "block";
      inputEl.style.borderColor = "#ef4444";
    } else {
      errorEl.style.display = "none";
      inputEl.style.borderColor = "";
    }
  }

  // Clear errors when user starts typing
  const fields = ["name", "email", "subject", "message"];
  fields.forEach(field => {
    const el = document.getElementById(`contact-${field}`);
    if (el) {
      el.addEventListener("input", () => {
        showError(field, false);
      });
    }
  });
}

// --- GITHUB REPOS DYNAMIC FETCH SYSTEM ---
let fetchedProjectData = {};

async function fetchGitHubRepos() {
  const username = "Milton-18-coder";
  const grid = document.querySelector(".projects-grid");
  if (!grid) return;

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`);
    if (!response.ok) throw new Error("Failed to fetch repositories");
    let repos = await response.json();
    
    // Filter out forks
    repos = repos.filter(repo => !repo.fork);
    
    if (repos.length === 0) {
      grid.innerHTML = `<p class="error-msg" style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No public repositories found for ${username}.</p>`;
      return;
    }

    // Limit to 2 repositories
    const displayRepos = repos.slice(0, 2);
    grid.innerHTML = ""; // Clear existing static cards
    fetchedProjectData = {}; // Reset

    displayRepos.forEach((repo, index) => {
      const id = index + 1;
      let imageUrl = `project${((index) % 6) + 1}.jpg`; // cycle through project1.jpg - project6.jpg
      
      // Use custom image for Library Management repositories
      if (repo.name.toLowerCase().includes("library")) {
        imageUrl = "library_management.png";
      }
      
      // Determine category based on repo language or topics
      let category = "Repository";
      const lang = repo.language ? repo.language.toLowerCase() : "";
      if (["javascript", "typescript", "html", "css", "vue", "angular"].includes(lang)) {
        category = "Frontend";
      } else if (["python", "java", "c++", "c", "go", "php", "ruby", "rust"].includes(lang)) {
        category = "Backend";
      } else if (repo.topics && (repo.topics.includes("web") || repo.topics.includes("webapp"))) {
        category = "Web App";
      }

      // Map dynamic project data for case study modals
      fetchedProjectData[id] = {
        title: formatRepoName(repo.name),
        category: category,
        desc: repo.description || "A public repository containing project source code, configurations, and implementation details.",
        client: "GitHub Open Source",
        date: formatDate(repo.updated_at),
        role: "Creator & Maintainer",
        technologies: getRepoTechnologies(repo),
        image: imageUrl,
        repo: repo.html_url,
        live: repo.homepage || repo.html_url
      };

      // Create tags
      const tags = [];
      if (repo.language) tags.push(repo.language);
      if (repo.topics && repo.topics.length > 0) {
        tags.push(...repo.topics.slice(0, 3));
      }
      // Deduplicate tags and limit to 4
      const uniqueTags = [...new Set(tags)].slice(0, 4);
      const tagsHtml = uniqueTags.map(tag => `<span>${tag}</span>`).join("");

      const cardHtml = `
        <div class="glass-panel project-card reveal-up active" data-category="${category.toLowerCase().replace(" ", "")}" id="project-${id}">
          <div class="project-img-wrapper">
            <span class="project-category">${category}</span>
            <img src="${imageUrl}" alt="${repo.name} Cover">
          </div>
          <div class="project-info">
            <div>
              <h3>${formatRepoName(repo.name)}</h3>
              <p>${repo.description || "No description provided."}</p>
              <div class="project-tags">
                ${tagsHtml}
              </div>
            </div>
            <div class="project-link-group">
              <button class="project-btn-detail" onclick="openFetchedProjectModal(${id})">View Case Study <i class="fa-solid fa-arrow-right"></i></button>
              <div class="project-external-links">
                <a href="${repo.html_url}" target="_blank" aria-label="GitHub Repository"><i class="fa-brands fa-github"></i></a>
                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" aria-label="Live Demo"><i class="fa-solid fa-arrow-up-right-from-square"></i>` : ""}
              </div>
            </div>
          </div>
        </div>
      `;
      grid.insertAdjacentHTML("beforeend", cardHtml);
    });

    // Re-initialize filter bindings
    initFilters();
    
    // Trigger scroll intersection observer for new cards
    if (typeof initObserver === "function") {
      const observerOpts = { root: null, threshold: 0.1, rootMargin: "0px" };
      const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      }, observerOpts);
      document.querySelectorAll(".project-card").forEach(el => obs.observe(el));
    }
  } catch (error) {
    console.error("Error loading GitHub repos:", error);
  }
}

function formatRepoName(name) {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function getRepoTechnologies(repo) {
  const techs = [];
  if (repo.language) techs.push(repo.language);
  if (repo.topics && repo.topics.length > 0) {
    techs.push(...repo.topics);
  }
  return techs.length > 0 ? techs.join(", ") : "GitHub Repo, Code Base";
}

function openFetchedProjectModal(id) {
  const data = fetchedProjectData[id] || projectData[id];
  if (!data || !modal) return;

  // Fill tags & attributes
  document.getElementById("modal-image").src = data.image;
  document.getElementById("modal-image").alt = `${data.title} Interface`;
  document.getElementById("modal-tag").textContent = data.category;
  document.getElementById("modal-title").textContent = data.title;
  document.getElementById("modal-desc").textContent = data.desc;
  document.getElementById("modal-client").textContent = data.client;
  document.getElementById("modal-date").textContent = data.date;
  document.getElementById("modal-role").textContent = data.role;
  document.getElementById("modal-technologies").textContent = data.technologies;
  
  // Configure action buttons
  const repoBtn = document.getElementById("modal-repo-btn");
  const liveBtn = document.getElementById("modal-live-btn");
  
  repoBtn.href = data.repo;
  liveBtn.href = data.live;

  // Open modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Freeze scroll
}
