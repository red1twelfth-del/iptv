document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav__toggle");
  const navLinks = document.querySelector(".nav__links");
  const billingToggle = document.getElementById("billingToggle");
  const priceBlocks = document.querySelectorAll(".plan__price");
  const faqItems = document.querySelectorAll(".faq__item");
  const footerYear = document.getElementById("currentYear");
  const contactForm = document.querySelector(".contact__form");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.querySelector(".visually-hidden").textContent = isOpen ? "Close menu" : "Open menu";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("is-open")) {
          navLinks.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
          navToggle.querySelector(".visually-hidden").textContent = "Open menu";
        }
      });
    });
  }

  if (billingToggle) {
    billingToggle.addEventListener("click", () => {
      const isYearly = billingToggle.getAttribute("aria-pressed") === "true";
      billingToggle.setAttribute("aria-pressed", String(!isYearly));
      billingToggle.classList.toggle("is-active", !isYearly);

      priceBlocks.forEach((price) => {
        const planAmount = price.querySelector(".plan__amount");
        const planBilling = price.querySelector(".plan__billing");

        if (!planAmount || !planBilling) {
          return;
        }

        const displayPrice = !isYearly ? price.dataset.yearly : price.dataset.monthly;
        if (displayPrice) {
          const [amount, billing] = displayPrice.split("/");
          planAmount.textContent = amount;
          planBilling.textContent = billing ? `/${billing}` : "";
        }
      });
    });
  }

  if (faqItems.length) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq__question");
      const answer = item.querySelector(".faq__answer");
      if (!question || !answer) {
        return;
      }

      question.addEventListener("click", () => {
        const isExpanded = question.getAttribute("aria-expanded") === "true";
        question.setAttribute("aria-expanded", String(!isExpanded));
        item.classList.toggle("is-open", !isExpanded);
        answer.hidden = isExpanded;
      });
    });
  }

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const summary = `Thanks, ${formData.get("name") || "streamer"}! Our team will reach out at ${formData.get("email") || "the email provided"} within 24 hours.`;

      contactForm.reset();
      alert(summary);
    });
  }
});
