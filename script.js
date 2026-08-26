// =========================================
// BYTEBITES - WEBSITE SCRIPT
// =========================================

const header = document.getElementById("header");
const navToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section");
const year = document.getElementById("year");

// =========================================
// FOOTER YEAR
// =========================================

if (year) {
  year.textContent = new Date().getFullYear();
}


// =========================================
// HEADER SCROLL
// =========================================

function handleHeader() {
  if (!header) return;

  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleHeader);
handleHeader();


// =========================================
// MOBILE NAVIGATION
// =========================================

function closeMenu() {
  if (!navMenu || !navToggle) return;

  navMenu.classList.remove("open");
  navToggle.classList.remove("active");

  navToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  document.body.classList.remove("menu-open");
}


if (navToggle && navMenu) {

  navToggle.addEventListener("click", () => {

    const isOpen =
      navMenu.classList.toggle("open");

    navToggle.classList.toggle(
      "active",
      isOpen
    );

    navToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    document.body.classList.toggle(
      "menu-open",
      isOpen
    );

  });

}


navLinks.forEach((link) => {

  link.addEventListener(
    "click",
    closeMenu
  );

});


// =========================================
// ACTIVE NAVIGATION
// =========================================

const observerOptions = {
  root: null,
  rootMargin: "-35% 0px -55% 0px",
  threshold: 0
};


if (sections.length > 0) {

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          const id =
            entry.target.getAttribute("id");

          navLinks.forEach((link) => {

            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`
            );

          });

        });

      },
      observerOptions
    );


  sections.forEach((section) => {

    sectionObserver.observe(section);

  });

}


// =========================================
// REVEAL ANIMATION
// =========================================

const revealElements =
  document.querySelectorAll(".reveal");


if (revealElements.length > 0) {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("show");

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });

}


// =========================================
// CLOSE MENU WHEN CLICKING OUTSIDE
// =========================================

document.addEventListener(
  "click",
  (event) => {

    if (!navMenu || !navToggle) return;

    if (
      navMenu.classList.contains("open") &&
      !navMenu.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {

      closeMenu();

    }

  }
);


// =========================================
// CLOSE MENU WITH ESCAPE
// =========================================

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {
      closeMenu();
    }

  }
);

  // =========================================
// KIRIM PESAN PELANGGAN KE WHATSAPP BYTEBITES
// =========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // NOMOR WHATSAPP BYTEBITES
    const bytebitesNumber = "6283821050066";

    const text =
      `Halo ByteBites! 👋\n\n` +
      `Nama: ${name}\n` +
      `No. WhatsApp: ${phone}\n` +
      `Pesanan: ${message}`;

    const whatsappURL =
      `https://wa.me/${bytebitesNumber}?text=${encodeURIComponent(text)}`;

    window.location.href = whatsappURL;
  });
}
