import { initMenu } from "./menu.js";
import { initModal } from "./modal.js";
import { initForms } from "./form.js";

function initFaq() {
  const items = Array.from(document.querySelectorAll("[data-faq-item]"));
  items.forEach((item) => {
    const button = item.querySelector("[data-faq-question]");
    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      items.forEach((other) => other.classList.remove("is-open"));
      if (!isOpen) item.classList.add("is-open");
    });
  });
}

function setYear() {
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initModal();
  initForms();
  initFaq();
  setYear();
});
