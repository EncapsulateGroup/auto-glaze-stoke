const scriptSource = document.currentScript?.getAttribute("src") || "assets/js/main.js";
const basePath = scriptSource.includes("../") ? "../" : "";
document.body.classList.add("page-transition-enabled");
document.body.insertAdjacentHTML(
  "afterbegin",
  '<div class="page-transition-curtain" aria-hidden="true"></div>'
);

// These shared definitions render the repeated site chrome on every static page.
const pages = [
  { label: "Home", href: "./", innerHref: "../", slug: "" },
  { label: "Windscreen Repair", href: "windscreen-repair/", innerHref: "../windscreen-repair/", slug: "windscreen-repair" },
  { label: "Windscreen Replacement", href: "windscreen-replacement/", innerHref: "../windscreen-replacement/", slug: "windscreen-replacement" },
  { label: "Our Work", href: "our-work/", innerHref: "../our-work/", slug: "our-work" },
  { label: "FAQ", href: "faq/", innerHref: "../faq/", slug: "faq" },
  { label: "Contact Us", href: "contact-us/", innerHref: "../contact-us/", slug: "contact-us" },
];

const contactDetails = {
  address: "60 Nile St, Stoke-on-Trent ST6 2BH",
  phone: "01782 281884",
  phoneHref: "tel:+441782281884",
};

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/autoglazestoke",
    icon: "social-02.png",
  },
];

function currentSlug() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const last = parts.at(-1) === "index.html" ? parts.at(-2) : parts.at(-1);
  return pages.some((page) => page.slug === last) ? last : "";
}

function pageHref(page) {
  return basePath ? page.innerHref : page.href;
}

function activeClass(page) {
  return page.slug === currentSlug() ? ' class="active"' : "";
}

function navigationLinks() {
  return pages
    .map((page) => `<li><a${activeClass(page)} href="${pageHref(page)}">${page.label}</a></li>`)
    .join("");
}

function headerMarkup() {
  return `
    <header class="site-header">
      <div class="header-inner">
        <a class="logo" href="${basePath || "./"}"><img src="${basePath}assets/img/logo.png" alt="AutoGlaze"></a>
        <nav class="desktop-nav" aria-label="Primary navigation">
          <ul>${navigationLinks()}</ul>
        </nav>
        <div class="header-actions">
          <a class="phone-top" href="${contactDetails.phoneHref}"><span>Call our local team</span>${contactDetails.phone}</a>
          <a class="btn btn-green quote-button" href="${basePath}contact-us/">Get a quote</a>
          <button class="menu-toggle" data-menu-open aria-label="Open menu" aria-expanded="false" aria-controls="site-menu"><span></span><span></span><span></span></button>
        </div>
      </div>
    </header>
    <aside class="menu-overlay" aria-label="Site menu" aria-hidden="true">
      <div class="menu-panel" id="site-menu">
        <button class="menu-close" data-menu-close aria-label="Close menu">×</button>
        <img class="menu-logo" src="${basePath}assets/img/logo.png" alt="AutoGlaze">
        <ul class="menu-links">
          ${navigationLinks()}
        </ul>
        <a class="menu-phone" href="${contactDetails.phoneHref}">${contactDetails.phone}</a>
      </div>
      <button class="menu-backdrop" data-menu-backdrop aria-label="Close menu"></button>
    </aside>`;
}

function socialMarkup() {
  return socialLinks
    .map(
      (social) =>
        `<a href="${social.href}" aria-label="${social.label}"><img src="${basePath}assets/img/social/${social.icon}" alt=""></a>`
    )
    .join("");
}

function footerMarkup() {
  return `
    <footer class="site-footer">
      <div class="footer-main">
        <div class="footer-brand">
          <img class="footer-logo" src="${basePath}assets/img/logo.png" alt="AutoGlaze">
          <p>Fully experienced, reliable and competent vehicle-glass specialists. We aim for customer satisfaction throughout every aspect of our work.</p>
        </div>
        <nav class="footer-nav" aria-label="Footer navigation">
          <h4>Page Links</h4>
          <div class="slashes"></div>
          <ul class="footer-links">
            ${navigationLinks()}
          </ul>
        </nav>
        <div class="footer-contact">
          <h4>Contact</h4>
          <div class="slashes"></div>
          <ul class="footer-contact-list">
            <li>${contactDetails.address}</li>
            <li><a href="${contactDetails.phoneHref}">${contactDetails.phone}</a></li>
          </ul>
          <div class="socials">
            ${socialMarkup()}
          </div>
          <a class="btn btn-green btn-small" href="${basePath}contact-us/">Get in touch</a>
        </div>
      </div>
      <div class="copyright">© ${new Date().getFullYear()} AutoGlaze Stoke. All rights reserved. Built and hosted by <a href="https://encapsulategroup.co.uk/">Encapsulate Marketing.</a></div>
    </footer>`;
}

function contactFormMarkup() {
  return `
    <form action="${basePath}api/enquiry" method="post">
      <div class="form-grid">
        <input type="hidden" name="source" value="${window.location.pathname}">
        <div class="field honeypot"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div>
        <div class="field"><label>Name<input name="name" placeholder="Name" autocomplete="name" maxlength="100" required></label></div>
        <div class="field"><label>Company<input name="company" placeholder="Company" autocomplete="organization" maxlength="120"></label></div>
        <div class="field"><label>Phone Number<input type="tel" name="phone" placeholder="Phone Number" autocomplete="tel" maxlength="30" required></label></div>
        <div class="field"><label>Email<input type="email" name="email" placeholder="Email" autocomplete="email" maxlength="254" required></label></div>
        <div class="field full"><label>Message<textarea name="message" placeholder="Message" maxlength="3000" required></textarea></label></div>
      </div>
      <div class="form-status" aria-live="polite"></div>
      <button class="btn btn-green submit" type="submit">Submit</button>
    </form>`;
}

function contactBandMarkup() {
  if (currentSlug() === "contact-us") {
    return `
      <section class="contact-band contact-map-band">
        <div class="contact-map-frame">
          <iframe class="map" title="${contactDetails.address}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=60%20Nile%20St%2C%20Stoke-on-Trent%20ST6%202BH&amp;t=m&amp;z=15&amp;output=embed&amp;iwloc=near"></iframe>
        </div>
      </section>`;
  }

  return `
    <section class="contact-band">
      <div class="contact-grid">
        <iframe class="map" title="${contactDetails.address}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=60%20Nile%20St%2C%20Stoke-on-Trent%20ST6%202BH&amp;t=m&amp;z=15&amp;output=embed&amp;iwloc=near"></iframe>
        <div class="contact-info">
          <h2>Contact Us</h2>
          <div class="slashes"></div>
          <ul class="contact-list">
            <li>${contactDetails.address}</li>
            <li><a href="${contactDetails.phoneHref}">${contactDetails.phone}</a></li>
          </ul>
        </div>
        <div class="contact-form-wrap">
          ${contactFormMarkup()}
        </div>
      </div>
    </section>`;
}

function renderGlobalElements() {
  const header = document.querySelector(".site-header");
  if (header) {
    document.querySelector(".menu-overlay")?.remove();
    header.outerHTML = headerMarkup();
  }

  const footer = document.querySelector(".site-footer");
  if (footer) {
    footer.outerHTML = footerMarkup();
  } else {
    document.querySelector("main")?.insertAdjacentHTML("afterend", footerMarkup());
  }

  document.querySelectorAll(".contact-band").forEach((section) => {
    section.outerHTML = contactBandMarkup();
  });

  document.querySelectorAll(".contact-form-wrap form, .contact-main .content-panel form").forEach((form) => {
    form.outerHTML = contactFormMarkup();
  });
}

renderGlobalElements();

if (currentSlug() === "contact-us") {
  document.querySelectorAll(".contact-main .side-panel").forEach((panel) => {
    panel.querySelector(".side-list")?.remove();
    if (!panel.querySelector(".contact-sidebar-details")) {
      panel.insertAdjacentHTML(
        "afterbegin",
        `<div class="contact-sidebar-details">
          <h4>Contact Details</h4>
          <ul class="contact-list">
            <li>${contactDetails.address}</li>
            <li><a href="${contactDetails.phoneHref}">${contactDetails.phone}</a></li>
          </ul>
        </div>`
      );
    }
  });
}

document.querySelectorAll(".repair-intro-section .side-panel").forEach((panel) => {
  if (currentSlug() === "contact-us" || panel.querySelector(".side-panel-cta")) return;

  panel.insertAdjacentHTML(
    "beforeend",
    `<a class="btn btn-green side-panel-cta" href="${basePath}contact-us/">Contact Us</a>`
  );
});

document.querySelectorAll("main img:not(.hero-background), iframe").forEach((element) => {
  element.setAttribute("loading", "lazy");
});
document.querySelectorAll("img").forEach((image) => {
  image.setAttribute("decoding", "async");
});

// Normalise visible legacy copy so headings and page titles follow one editorial standard.
if (currentSlug() === "faq") {
  const faqHeading = document.querySelector("main h2");
  if (faqHeading) faqHeading.textContent = "Answers From Your Local Vehicle-Glass Specialists";
}

if (currentSlug() === "contact-us") {
  document.title = "Contact Us For Reliable Windscreen Repairs • AutoGlaze";
  const contactHeading = document.querySelector(".contact-main h2");
  if (contactHeading) contactHeading.textContent = "Windscreen problems? Get in touch today";
}

document.querySelector(".work-gallery")?.setAttribute("id", "projects");
document.querySelector(".faq-list")?.closest(".section")?.setAttribute("id", "answers");

document.querySelectorAll("main .hero").forEach((hero) => {
  hero.querySelector(".hero-glass-arc")?.remove();
  hero.querySelector(".hero-watermark")?.remove();
});

const shortHero = document.querySelector(".hero.short");
if (shortHero && !shortHero.querySelector(".page-kicker")) {
  const title = shortHero.querySelector("h1");
  title?.insertAdjacentHTML("beforebegin", '<span class="page-kicker">AutoGlaze Stoke <i></i> Vehicle glass specialists</span>');
}

const menuButton = document.querySelector("[data-menu-open]");
const closeButton = document.querySelector("[data-menu-close]");
const backdrop = document.querySelector("[data-menu-backdrop]");
const menuOverlay = document.querySelector(".menu-overlay");

if (menuOverlay) menuOverlay.inert = true;

function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  menuButton?.setAttribute("aria-expanded", String(open));
  menuOverlay?.setAttribute("aria-hidden", String(!open));
  if (menuOverlay) menuOverlay.inert = !open;
  if (open) {
    closeButton?.focus();
  } else if (document.activeElement === closeButton || document.activeElement?.closest(".menu-overlay")) {
    menuButton?.focus();
  }
}

menuButton?.addEventListener("click", () => setMenu(true));
closeButton?.addEventListener("click", () => setMenu(false));
backdrop?.addEventListener("click", () => setMenu(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
  if (event.key !== "Tab" || !document.body.classList.contains("menu-open") || !menuOverlay) return;

  const focusable = [...menuOverlay.querySelectorAll("a[href], button:not([disabled])")];
  const first = focusable[0];
  const last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
});

document.querySelectorAll(".faq-question").forEach((button, index) => {
  const answer = button.closest(".faq-item")?.querySelector(".faq-answer");
  const answerId = `faq-answer-${index + 1}`;
  if (answer) answer.id = answerId;
  button.setAttribute("aria-controls", answerId);
  button.setAttribute("aria-expanded", "false");
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item?.classList.toggle("open") || false;
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

const revealTargets = document.querySelectorAll(
  ".section > *, .split > *, .intro-row > *, .sidebar-layout > *, .content-panel > h2, .content-panel > p, .content-panel > .feature-img, .side-list li, .hours li, .trust-strip span, .service-card, .icon-box, .gallery img, .faq-item, .cta-band > *, .contact-grid, .footer-main"
);

revealTargets.forEach((element, index) => {
  element.classList.add("reveal");
  element.style.setProperty("--reveal-delay", `${(index % 4) * 65}ms`);
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
  );
  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}

// Safety fallback: preserve the scroll animation without ever leaving content hidden.
window.setTimeout(() => {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}, 4000);

const balancedMediaPairs = [
  {
    media: ".home-page #about .photo-pair",
    content: ".home-page #about .dark-card",
  },
  {
    media: ".home-page .why-section .why-media",
    content: ".home-page .why-section .why-content",
  },
]
  .map(({ media, content }) => ({
    media: document.querySelector(media),
    image: document.querySelector(`${media} img`),
    content: document.querySelector(content),
  }))
  .filter(({ media, image, content }) => media && image && content);

function sizeBalancedMedia() {
  balancedMediaPairs.forEach(({ media, image, content }) => {
    media.style.removeProperty("height");
    image.style.removeProperty("height");

    if (window.innerWidth < 900) {
      image.style.objectFit = "";
      return;
    }

    const targetHeight = Math.round(content.getBoundingClientRect().height + 15);
    media.style.setProperty("height", `${targetHeight}px`);
    image.style.setProperty("height", `${targetHeight}px`);
    image.style.setProperty("object-fit", "cover");
  });
}

if (balancedMediaPairs.length) {
  sizeBalancedMedia();
  window.addEventListener("resize", sizeBalancedMedia);
  window.addEventListener("load", sizeBalancedMedia, { once: true });
  document.fonts?.ready?.then(sizeBalancedMedia);
}

requestAnimationFrame(() => document.body.classList.add("page-ready"));

document.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin || url.hash || link.target === "_blank" || url.protocol === "tel:" || url.protocol === "mailto:") return;
  event.preventDefault();
  document.body.classList.add("page-leaving");
  window.setTimeout(() => {
    window.location.href = url.href;
  }, 300);
});

document.querySelectorAll("[data-review-carousel]").forEach((carousel) => {
  const slides = [...carousel.querySelectorAll(".review-slide")];
  const dots = [...carousel.querySelectorAll(".review-dots button")];
  const prev = carousel.querySelector(".review-prev");
  const next = carousel.querySelector(".review-next");
  let active = 0;
  let timer;

  function showReview(index) {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === active);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === active);
      dot.setAttribute("aria-label", `Show review ${dotIndex + 1}`);
      dot.setAttribute("aria-current", dotIndex === active ? "true" : "false");
    });
  }

  function restartTimer() {
    clearInterval(timer);
    timer = window.setInterval(() => showReview(active + 1), 6500);
  }

  if (slides.length < 2) return;

  prev?.addEventListener("click", () => {
    showReview(active - 1);
    restartTimer();
  });

  next?.addEventListener("click", () => {
    showReview(active + 1);
    restartTimer();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showReview(index);
      restartTimer();
    });
  });

  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", restartTimer);
  carousel.addEventListener("focusin", () => clearInterval(timer));
  carousel.addEventListener("focusout", restartTimer);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearInterval(timer);
    else restartTimer();
  });

  showReview(0);
  restartTimer();
});

const workGalleries = [...document.querySelectorAll(".work-gallery .gallery")];

// Move the complete four-benefit box vertically while preserving its original styling and dimensions.
const followedBenefitLists = [...document.querySelectorAll(
  ".repair-page .repair-intro-section .side-panel, .replacement-page .repair-intro-section .side-panel, .contact-page .contact-main .side-list"
)];
let benefitListMetrics = [];

function measureBenefitLists() {
  followedBenefitLists.forEach((list) => {
    list.style.transform = "";
    list.style.transition = "";
  });
  benefitListMetrics = followedBenefitLists.map((list) => {
    const section = list.closest(".repair-intro-section, .contact-main");
    const boundary = section.querySelector(".content-panel") || section;
    const listRect = list.getBoundingClientRect();
    const boundaryRect = boundary.getBoundingClientRect();
    return {
      list,
      start: window.scrollY + listRect.top,
      maximum: Math.max(0, window.scrollY + boundaryRect.bottom - (window.scrollY + listRect.top) - listRect.height),
    };
  });
}

function followBenefitLists() {
  benefitListMetrics.forEach(({ list, start, maximum }) => {
    if (window.innerWidth < 700) {
      list.style.transform = "";
      list.style.transition = "";
      return;
    }
    const distance = Math.min(maximum, Math.max(0, window.scrollY + 96 - start));
    list.style.transition = "none";
    list.style.transform = `translateY(${distance}px)`;
  });
}

if (followedBenefitLists.length) {
  measureBenefitLists();
  followBenefitLists();
  window.addEventListener("scroll", followBenefitLists, { passive: true });
  window.addEventListener("resize", () => {
    measureBenefitLists();
    followBenefitLists();
  });
  window.addEventListener("load", () => {
    measureBenefitLists();
    followBenefitLists();
  }, { once: true });
}

if (workGalleries.length) {
  const galleryImages = workGalleries.flatMap((gallery) => [...gallery.querySelectorAll("img")]);
  let lightboxIndex = 0;
  let lightboxTrigger = null;

  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="gallery-lightbox" role="dialog" aria-modal="true" aria-hidden="true" aria-label="Gallery image viewer">
      <button class="gallery-lightbox-close" type="button" aria-label="Close image viewer">×</button>
      <button class="gallery-lightbox-prev" type="button" aria-label="Previous image">‹</button>
      <img alt="">
      <button class="gallery-lightbox-next" type="button" aria-label="Next image">›</button>
    </div>`
  );

  const lightbox = document.querySelector(".gallery-lightbox");
  const lightboxImage = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector(".gallery-lightbox-close");

  function showLightboxImage(index) {
    lightboxIndex = (index + galleryImages.length) % galleryImages.length;
    const source = galleryImages[lightboxIndex];
    lightboxImage.src = source.currentSrc || source.src;
    lightboxImage.alt = source.alt;
  }

  function openLightbox(index) {
    lightboxTrigger = document.activeElement;
    showLightboxImage(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("gallery-open");
    document.querySelectorAll("header, main, footer").forEach((region) => {
      region.inert = true;
    });
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("gallery-open");
    document.querySelectorAll("header, main, footer").forEach((region) => {
      region.inert = false;
    });
    lightboxTrigger?.focus();
  }

  workGalleries.forEach((gallery, galleryIndex) => {
    gallery.tabIndex = 0;
    gallery.setAttribute("role", "region");
    gallery.setAttribute("aria-label", `Scrollable gallery ${galleryIndex + 1}`);

    const strip = document.createElement("div");
    strip.className = "gallery-heading-strip";

    const copy = document.createElement("div");
    copy.className = "gallery-heading-copy";

    const controls = document.createElement("div");
    controls.className = "gallery-controls";
    controls.innerHTML = `
      <button class="gallery-control gallery-scroll-prev" type="button" aria-label="Scroll gallery left">←</button>
      <button class="gallery-control gallery-scroll-next" type="button" aria-label="Scroll gallery right">→</button>
    `;

    const copyNodes = [];
    let sibling = gallery.previousElementSibling;
    while (sibling && (sibling.matches("h2") || sibling.matches("p") || sibling.matches(".slashes"))) {
      copyNodes.unshift(sibling);
      sibling = sibling.previousElementSibling;
    }

    const insertBefore = copyNodes[0] || gallery;
    gallery.parentElement.insertBefore(strip, insertBefore);
    copyNodes.forEach((node) => copy.appendChild(node));
    strip.append(copy, controls);

    const scrollAmount = () => gallery.clientWidth * .82;
    controls.querySelector(".gallery-scroll-prev").addEventListener("click", () => gallery.scrollBy({ left: -scrollAmount(), behavior: "smooth" }));
    controls.querySelector(".gallery-scroll-next").addEventListener("click", () => gallery.scrollBy({ left: scrollAmount(), behavior: "smooth" }));
  });

  galleryImages.forEach((image, index) => {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `${image.alt || "Gallery image"} — open full size`);
    image.addEventListener("click", () => openLightbox(index));
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
      }
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  lightbox.querySelector(".gallery-lightbox-prev").addEventListener("click", () => showLightboxImage(lightboxIndex - 1));
  lightbox.querySelector(".gallery-lightbox-next").addEventListener("click", () => showLightboxImage(lightboxIndex + 1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showLightboxImage(lightboxIndex - 1);
    if (event.key === "ArrowRight") showLightboxImage(lightboxIndex + 1);
    if (event.key === "Tab") {
      const focusable = [...lightbox.querySelectorAll("button:not([disabled])")];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  });
}
