document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     SETTINGS
  ========================================================= */

  const whatsappNumber = "994775017202";

  /* =========================================================
     HEADER SCROLL
  ========================================================= */

  const header = document.getElementById("header");

  function handleHeaderScroll() {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  handleHeaderScroll();
  window.addEventListener("scroll", handleHeaderScroll);

  /* =========================================================
     MOBILE MENU
  ========================================================= */

  const menuBtn = document.getElementById("menuBtn");
  const navbar = document.getElementById("navbar");

  if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
      navbar.classList.toggle("active");
      document.body.classList.toggle("menu-open");

      const icon = menuBtn.querySelector("i");

      if (icon) {
        if (navbar.classList.contains("active")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        } else {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });
  }

  /* =========================================================
     CLOSE MOBILE MENU AFTER CLICK
  ========================================================= */

  document.querySelectorAll(".navbar a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!navbar || !menuBtn) return;

      navbar.classList.remove("active");
      document.body.classList.remove("menu-open");

      const icon = menuBtn.querySelector("i");

      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });
  });

  /* =========================================================
     ESC CLOSE MENU
  ========================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    if (navbar) {
      navbar.classList.remove("active");
    }

    document.body.classList.remove("menu-open");

    if (menuBtn) {
      const icon = menuBtn.querySelector("i");

      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    }
  });

  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const href = this.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight -
        15;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* =========================================================
     ACTIVE NAV LINK
  ========================================================= */

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    if (!sections.length || !navLinks.length) return;

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 160;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (
        href === `#${currentSection}` ||
        href === `index.html#${currentSection}`
      ) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);

  /* =========================================================
     FAQ ACCORDION
  ========================================================= */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
      });

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  /* =========================================================
     SERVICE BUTTONS
  ========================================================= */

  const serviceSelect = document.getElementById("service");

  document.querySelectorAll("[data-service]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const serviceName = button.dataset.service;

      if (!serviceName || !serviceSelect) return;

      event.preventDefault();

      const options = Array.from(serviceSelect.options);

      const matchingOption = options.find(
        (option) =>
          option.value.toLowerCase() === serviceName.toLowerCase() ||
          option.textContent.trim().toLowerCase() === serviceName.toLowerCase(),
      );

      if (matchingOption) {
        serviceSelect.value = matchingOption.value;
      }

      const contactSection = document.getElementById("contact");

      if (contactSection) {
        const headerHeight = header ? header.offsetHeight : 0;

        const targetPosition =
          contactSection.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          15;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  /* =========================================================
     DEADLINE MIN DATE
  ========================================================= */

  const deadlineInput = document.getElementById("deadline");

  if (deadlineInput) {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    deadlineInput.min = `${year}-${month}-${day}`;
  }

  /* =========================================================
     DATE FORMAT
  ========================================================= */

  function formatDate(dateValue) {
    if (!dateValue) {
      return "Qeyd edilməyib";
    }

    const date = new Date(`${dateValue}T00:00:00`);

    return new Intl.DateTimeFormat("az-AZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }

  /* =========================================================
     ORDER FORM → WHATSAPP
  ========================================================= */

  const orderForm = document.getElementById("orderForm");

  if (orderForm) {
    orderForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name")?.value.trim() || "";

      const phone = document.getElementById("phone")?.value.trim() || "";

      const service = document.getElementById("service")?.value || "";

      const deadline = document.getElementById("deadline")?.value || "";

      const message = document.getElementById("message")?.value.trim() || "";

      /* =====================================================
         VALIDATION
      ===================================================== */

      if (!name) {
        alert("Zəhmət olmasa adınızı qeyd edin.");
        return;
      }

      if (!phone) {
        alert("Zəhmət olmasa telefon nömrənizi qeyd edin.");
        return;
      }

      if (!service) {
        alert("Zəhmət olmasa xidmət növünü seçin.");
        return;
      }

      if (!message) {
        alert("Zəhmət olmasa sifariş haqqında məlumat yazın.");
        return;
      }

      /* =====================================================
         WHATSAPP MESSAGE
      ===================================================== */

      const whatsappMessage = `
Salam. Xidmət sifariş etmək istəyirəm.

👤 Ad: ${name}
📞 Əlaqə nömrəsi: ${phone}
📌 Xidmət: ${service}
📅 Son tarix: ${formatDate(deadline)}

📝 Sifariş haqqında:
${message}

Xahiş edirəm qiymət və icra müddəti haqqında məlumat verin.
      `.trim();

      /* =====================================================
         OPEN WHATSAPP
      ===================================================== */

      const encodedMessage = encodeURIComponent(whatsappMessage);

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      window.open(whatsappURL, "_blank");
    });
  }

  /* =========================================================
     FLOATING WHATSAPP
  ========================================================= */

  const floatingWhatsApp = document.querySelector(".floating-whatsapp");

  if (floatingWhatsApp) {
    floatingWhatsApp.addEventListener("click", (event) => {
      /*
       Əgər link artıq index.html#contact-dirsə,
       detail səhifələrdə onu saxlayırıq.
      */

      const href = floatingWhatsApp.getAttribute("href");

      if (
        href &&
        (href.includes("#contact") || href.includes("index.html#contact"))
      ) {
        return;
      }

      event.preventDefault();

      const defaultMessage =
        "Salam. Xidmətləriniz haqqında məlumat almaq istəyirəm.";

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

      window.open(whatsappURL, "_blank");
    });
  }

  /* =========================================================
     BACK TO TOP
  ========================================================= */

  const backToTop = document.getElementById("backToTop");

  function handleBackToTop() {
    if (!backToTop) return;

    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }

  handleBackToTop();

  window.addEventListener("scroll", handleBackToTop);

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =========================================================
     REVEAL ANIMATION
  ========================================================= */

  const revealElements = document.querySelectorAll(
    ".service-card, " +
      ".why-card, " +
      ".process-card, " +
      ".portfolio-card, " +
      ".pricing-card, " +
      ".pdf-service-card, " +
      ".pdf-use-card, " +
      ".pdf-process-card, " +
      ".design-service-card, " +
      ".design-audience-card, " +
      ".design-process-card",
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");

            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    revealElements.forEach((element) => {
      element.classList.add("reveal-item");

      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("reveal-visible");
    });
  }

  /* =========================================================
     DASHBOARD ENTRANCE
  ========================================================= */

  const dashboardCard = document.querySelector(".dashboard-card");

  if (dashboardCard) {
    setTimeout(() => {
      dashboardCard.classList.add("dashboard-loaded");
    }, 250);
  }

  /* =========================================================
     PAGE READY
  ========================================================= */

  document.body.classList.add("page-ready");
});
