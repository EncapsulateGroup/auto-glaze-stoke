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
