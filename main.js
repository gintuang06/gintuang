/* ==========================================================
   ENGINEERING PORTFOLIO - MAIN JS
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     LOADER
     ========================================================== */
  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader?.classList.add("hide");
    }, 900);
  });

  /* ==========================================================
     THEME TOGGLE + LOCAL STORAGE
     ========================================================== */
  const toggleBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
  }

  toggleBtn?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");

    if (current === "light") {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });

  /* ==========================================================
     SCROLL PROGRESS
     ========================================================== */
  const progressBar =
    document.querySelector("#scroll-progress span");

  window.addEventListener("scroll", () => {
    const winScroll =
      document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const percent = (winScroll / height) * 100;

    if (progressBar) {
      progressBar.style.width = percent + "%";
    }
  });

  /* ==========================================================
     MOBILE MENU
     ========================================================== */
  const burger = document.getElementById("nav-burger");
  const navLinks = document.getElementById("nav-links");

  burger?.addEventListener("click", () => {
    burger.classList.toggle("open");
    navLinks.classList.toggle("open");

    const expanded =
      burger.getAttribute("aria-expanded") === "true";

    burger.setAttribute(
      "aria-expanded",
      !expanded
    );
  });

  navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      burger?.classList.remove("open");
      navLinks.classList.remove("open");
      burger?.setAttribute(
        "aria-expanded",
        "false"
      );
    });
  });

  /* ==========================================================
     REVEAL ON SCROLL
     ========================================================== */
  const revealElements =
    document.querySelectorAll(".reveal");

  const revealObserver =
    new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        threshold: 0.15
      }
    );

  revealElements.forEach(el =>
    revealObserver.observe(el)
  );

  /* ==========================================================
     HERO ROTATOR
     ========================================================== */
  const rotator =
    document.getElementById("role-rotator");

  const roles = [
    "Problem Solver",
    "Engineer",
    "Builder",
    "Innovator",
    "Designer",
    "Programmer",
    "Systems Thinker"
  ];

  let roleIndex = 0;

  if (rotator) {
    setInterval(() => {
      roleIndex++;

      rotator.style.opacity = 0;

      setTimeout(() => {
        rotator.textContent =
          roles[roleIndex % roles.length];

        rotator.style.opacity = 1;
      }, 250);

    }, 2200);
  }

  /* ==========================================================
     COUNTERS
     ========================================================== */
  const counters =
    document.querySelectorAll("[data-count]");

  const countObserver =
    new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const element = entry.target;

        const target =
          Number(element.dataset.count);

        const suffix =
          element.dataset.suffix || "";

        let current = 0;

        const step =
          Math.max(1, target / 80);

        const interval =
          setInterval(() => {

            current += step;

            if (current >= target) {
              current = target;
              clearInterval(interval);
            }

            element.textContent =
              Math.floor(current) + suffix;

          }, 20);

        countObserver.unobserve(element);

      });

    });

  counters.forEach(counter =>
    countObserver.observe(counter)
  );

  /* ==========================================================
     EXPERIENCE ACCORDION
     ========================================================== */
  document
    .querySelectorAll("[data-exp-toggle]")
    .forEach(btn => {

      btn.addEventListener("click", () => {

        const state =
          btn.getAttribute("aria-expanded") === "true";

        btn.setAttribute(
          "aria-expanded",
          String(!state)
        );
      });
    });

  /* ==========================================================
     PROJECT FILTERS
     ========================================================== */
  const filterButtons =
    document.querySelectorAll(".filter-btn");

  const projectCards =
    document.querySelectorAll(".project-card");

  const searchInput =
    document.getElementById("project-search");

  const emptyState =
    document.getElementById("project-empty");

  let currentFilter = "all";

  function filterProjects() {

    const search =
      searchInput?.value.toLowerCase() || "";

    let visible = 0;

    projectCards.forEach(card => {

      const category =
        card.dataset.category.toLowerCase();

      const title =
        card.dataset.title.toLowerCase();

      const filterMatch =
        currentFilter === "all" ||
        category.includes(currentFilter);

      const searchMatch =
        title.includes(search);

      const show =
        filterMatch && searchMatch;

      card.hidden = !show;

      if (show) visible++;

    });

    if (emptyState) {
      emptyState.hidden = visible !== 0;
    }
  }

  filterButtons.forEach(btn => {

    btn.addEventListener("click", () => {

      filterButtons.forEach(b =>
        b.classList.remove("active")
      );

      btn.classList.add("active");

      currentFilter =
        btn.dataset.filter;

      filterProjects();

    });
  });

  searchInput?.addEventListener(
    "input",
    filterProjects
  );

  /* ==========================================================
     MODAL DATA
     ========================================================== */
  const modalData = {

    "panel-automation": {
      title: "Panel Layout Automation Engine",
      content: `
        <h3>Panel Layout Automation Engine</h3>
        <p class="modal-meta">AAON • Python • Inventor API</p>

        <p>
        Built a production automation tool that reads
        electrical configurations and automatically
        creates panel layouts inside Autodesk Inventor.
        </p>

        <h4>Highlights</h4>
        <ul>
          <li>Config-driven architecture</li>
          <li>Collision detection engine</li>
          <li>Region optimization algorithm</li>
          <li>Automatic component placement</li>
          <li>Business-impact reporting</li>
        </ul>
      `
    },

    "fsae-wing": {
      title: "Formula SAE Rear Wing",
      content: `
        <h3>Formula SAE Rear Wing</h3>
        <p class="modal-meta">FEA • Topology Optimization</p>

        <p>
        Reduced rear wing mass while maintaining
        structural integrity through simulation-driven
        design iterations.
        </p>
      `
    },

    "die-sim": {
      title: "Rigid Body Simulation",
      content: `
        <h3>Rigid Body Die Simulation</h3>
        <p>
        Simulated nonlinear motion using Lagrangian
        mechanics and numerical integration methods.
        </p>
      `
    },

    "biped-sim": {
      title: "Biped Dynamics Simulation",
      content: `
        <h3>Biped Dynamics</h3>
        <p>
        Holonomic constraint modeling and system
        simulation using symbolic mechanics.
        </p>
      `
    },

    "ode-solver": {
      title: "Adaptive ODE Solver",
      content: `
        <h3>Adaptive MATLAB Solver</h3>
        <p>
        Implemented adaptive step-size integration
        and benchmarked against standard MATLAB solvers.
        </p>
      `
    },

    "ritz-beam": {
      title: "Rayleigh-Ritz Beam Analysis",
      content: `
        <h3>Rayleigh-Ritz Approximation</h3>
        <p>
        Applied energy methods to approximate beam
        deformation and vibration behavior.
        </p>
      `
    }
  };

  const modalOverlay =
    document.getElementById("modal-overlay");

  const modalContent =
    document.getElementById("modal-content");

  const modalClose =
    document.getElementById("modal-close");

  document
    .querySelectorAll("[data-modal-open]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const key =
          button.dataset.modalOpen;

        if (!modalData[key]) return;

        modalContent.innerHTML =
          modalData[key].content;

        modalOverlay.hidden = false;
      });
    });

  modalClose?.addEventListener(
    "click",
    () => modalOverlay.hidden = true
  );

  modalOverlay?.addEventListener(
    "click",
    e => {
      if (e.target === modalOverlay) {
        modalOverlay.hidden = true;
      }
    }
  );

  /* ==========================================================
     FOOTER YEAR
     ========================================================== */
  const footerYear =
    document.getElementById("footer-year");

  if (footerYear) {
    footerYear.textContent =
      new Date().getFullYear();
  }

  /* ==========================================================
     CONTACT FORM
     ========================================================== */
  const form =
    document.getElementById("contact-form");

  const status =
    document.getElementById("form-status");

  form?.addEventListener("submit", e => {

    e.preventDefault();

    const formData =
      new FormData(form);

    const name =
      formData.get("name")?.trim();

    const email =
      formData.get("email")?.trim();

    const message =
      formData.get("message")?.trim();

    if (!name || !email || !message) {

      status.textContent =
        "Please complete all fields.";

      return;
    }

    status.textContent =
      "Message validated. Connect Formspree or EmailJS to receive submissions.";

    form.reset();
  });

  /* ==========================================================
     CUSTOM CURSOR
     ========================================================== */
  const dot =
    document.getElementById("cursor-dot");

  const ring =
    document.getElementById("cursor-ring");

  if (dot && ring && window.innerWidth > 768) {

    document.addEventListener(
      "mousemove",
      e => {

        dot.style.left =
          `${e.clientX}px`;

        dot.style.top =
          `${e.clientY}px`;

        ring.style.left =
          `${e.clientX}px`;

        ring.style.top =
          `${e.clientY}px`;
      }
    );

    document
      .querySelectorAll("a, button")
      .forEach(el => {

        el.addEventListener(
          "mouseenter",
          () =>
            ring.classList.add("active")
        );

        el.addEventListener(
          "mouseleave",
          () =>
            ring.classList.remove("active")
        );
      });
  }

  /* ==========================================================
     SKILL BARS
     ========================================================== */
  document.querySelectorAll(".skill-row")
    .forEach(row => {

      const level =
        Number(row.dataset.level);

      const fill =
        row.querySelector(".skill-fill");

      const pct =
        row.querySelector(".skill-pct");

      const observer =
        new IntersectionObserver(entries => {

          if (!entries[0].isIntersecting) return;

          fill.style.width =
            level + "%";

          let current = 0;

          const timer =
            setInterval(() => {

              current++;

              pct.textContent =
                current + "%";

              if (current >= level) {
                clearInterval(timer);
              }

            }, 15);

          observer.disconnect();

        });

      observer.observe(row);

    });

  /* ==========================================================
     RADAR CHART
     ========================================================== */
  function drawRadarChart() {

    const canvas =
      document.getElementById("radar-canvas");

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    const values =
      [88, 90, 72, 78, 82, 70];

    const labels = [
      "CAD",
      "Code",
      "Mfg",
      "Data",
      "FEA",
      "PM"
    ];

    const cx = 220;
    const cy = 220;
    const radius = 140;
    const count = labels.length;

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    for (let r = 1; r <= 5; r++) {

      ctx.beginPath();

      for (let i = 0; i < count; i++) {

        const angle =
          (Math.PI * 2 * i) / count -
          Math.PI / 2;

        const x =
          cx +
          Math.cos(angle) *
          (radius * r / 5);

        const y =
          cy +
          Math.sin(angle) *
          (radius * r / 5);

        if (i === 0)
          ctx.moveTo(x, y);
        else
          ctx.lineTo(x, y);
      }

      ctx.closePath();
      ctx.strokeStyle =
        "rgba(120,120,120,.3)";
      ctx.stroke();
    }

    ctx.beginPath();

    values.forEach((value, i) => {

      const angle =
        (Math.PI * 2 * i) / count -
        Math.PI / 2;

      const dist =
        (value / 100) * radius;

      const x =
        cx + Math.cos(angle) * dist;

      const y =
        cy + Math.sin(angle) * dist;

      if (i === 0)
        ctx.moveTo(x, y);
      else
        ctx.lineTo(x, y);
    });

    ctx.closePath();

    ctx.fillStyle =
      "rgba(34,211,211,.25)";

    ctx.strokeStyle =
      "#22d3d3";

    ctx.fill();
    ctx.stroke();
  }

  drawRadarChart();

  /* ==========================================================
     BLUEPRINT GRID
     ========================================================== */

  const gridCanvas =
    document.getElementById(
      "blueprint-canvas"
    );

  if (gridCanvas) {

    const ctx =
      gridCanvas.getContext("2d");

    function drawGrid() {

      gridCanvas.width =
        window.innerWidth;

      gridCanvas.height =
        window.innerHeight;

      ctx.clearRect(
        0,
        0,
        gridCanvas.width,
        gridCanvas.height
      );

      ctx.strokeStyle =
        "rgba(34,211,211,.05)";

      for (
        let x = 0;
        x < gridCanvas.width;
        x += 40
      ) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(
          x,
          gridCanvas.height
        );
        ctx.stroke();
      }

      for (
        let y = 0;
        y < gridCanvas.height;
        y += 40
      ) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(
          gridCanvas.width,
          y
        );
        ctx.stroke();
      }
    }

    drawGrid();

    window.addEventListener(
      "resize",
      drawGrid
    );
  }

});