const scriptSource = document.currentScript?.getAttribute("src") || "assets/js/main.js";
const basePath = scriptSource.includes("../") ? "../" : "";

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
        <div class="header-actions">
          <a class="phone-top" href="${contactDetails.phoneHref}">Call now ${contactDetails.phone}</a>
          <div class="button-row">
            <button class="btn btn-green" data-menu-open>Menu</button>
            <a class="btn btn-red" href="${basePath}contact-us/">Contact Us</a>
          </div>
        </div>
      </div>
    </header>
    <aside class="menu-overlay" aria-label="Site menu">
      <div class="menu-panel">
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
        <div>
          <img class="footer-logo" src="${basePath}assets/img/logo.png" alt="AutoGlaze">
          <p>– Fully experienced<br>– Reliable and competent<br>– Quality Guarantee<br>– We aim for customer satisfaction throughout every aspect of our work</p>
          <div class="socials">
            ${socialMarkup()}
          </div>
        </div>
        <div>
          <h4>Page Links</h4>
          <div class="slashes"></div>
          <ul class="footer-links">
            ${navigationLinks()}
          </ul>
        </div>
      </div>
      <div class="copyright">© 2021 all rights reserved. Built and hosted by <a href="https://encapsulategroup.co.uk/">Encapsulate Marketing.</a></div>
    </footer>`;
}

function contactFormMarkup() {
  return `
    <form action="${basePath}api/enquiry" method="post">
      <div class="form-grid">
        <input type="hidden" name="source" value="${window.location.pathname}">
        <div class="field honeypot"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div>
        <div class="field"><label>Name<input name="name" placeholder="Name" required></label></div>
        <div class="field"><label>Company<input name="company" placeholder="Company"></label></div>
        <div class="field"><label>Phone Number<input name="phone" placeholder="Phone Number" required></label></div>
        <div class="field"><label>Email<input type="email" name="email" placeholder="Email" required></label></div>
        <div class="field full"><label>Message<textarea name="message" placeholder="Message" required></textarea></label></div>
      </div>
      <div class="form-status" aria-live="polite"></div>
      <button class="btn btn-green submit" type="submit">Submit</button>
    </form>`;
}

function contactBandMarkup() {
  return `
    <section class="contact-band">
      <div class="contact-grid">
        <iframe class="map" title="${contactDetails.address}" src="https://maps.google.com/maps?q=60%20Nile%20St%2C%20Stoke-on-Trent%20ST6%202BH&amp;t=m&amp;z=15&amp;output=embed&amp;iwloc=near"></iframe>
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

const menuButton = document.querySelector("[data-menu-open]");
const closeButton = document.querySelector("[data-menu-close]");
const backdrop = document.querySelector("[data-menu-backdrop]");

function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
}

menuButton?.addEventListener("click", () => setMenu(true));
closeButton?.addEventListener("click", () => setMenu(false));
backdrop?.addEventListener("click", () => setMenu(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest(".faq-item")?.classList.toggle("open");
  });
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

  restartTimer();
});
