document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const status = form.querySelector(".form-status");
    const submit = form.querySelector("[type='submit']");
    const action = form.getAttribute("action") || "/api/enquiry";

    if (window.location.protocol === "file:") {
      const nestedPage = /\/(contact-us|faq|our-work|windscreen-repair|windscreen-replacement)\//.test(window.location.pathname);
      window.location.href = `${nestedPage ? "../" : ""}thank-you/index.html`;
      return;
    }

    if (status) {
      status.textContent = "Sending...";
      status.classList.remove("is-error");
    }
    if (submit) submit.disabled = true;

    try {
      const response = await fetch(action, {
        method: "POST",
        body: new FormData(form),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Your message could not be sent. Please try again.");
      }

      window.location.href = result.redirect || "/thank-you/";
    } catch (error) {
      if (status) {
        status.textContent = error.message || "Your message could not be sent. Please call 01782 281884.";
        status.classList.add("is-error");
      }
      if (submit) submit.disabled = false;
    }
  });
});
