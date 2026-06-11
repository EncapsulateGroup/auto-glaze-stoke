document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (window.location.protocol === "file:") {
      const nestedPage = /\/(contact-us|faq|our-work|windscreen-repair|windscreen-replacement)\//.test(window.location.pathname);
      window.location.href = `${nestedPage ? "../" : ""}thank-you/index.html`;
      return;
    }
    window.location.href = "/thank-you/";
  });
});
