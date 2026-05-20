export function initModal() {
  const modal = document.querySelector("[data-tariff-modal]");
  if (!modal) return;

  const selectedInput = modal.querySelector("[data-selected-tariff]");
  const title = modal.querySelector("[data-modal-title]");
  const subtitle = modal.querySelector("[data-modal-subtitle]");

  function open(name, price) {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    if (selectedInput) selectedInput.value = name;
    if (title) title.textContent = `${name}`;
    if (subtitle) subtitle.textContent = price ? ` от ${price}` : "Оставьте контакты — уточним задачу.";
  }

  function close() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-open-tariff]");
    if (trigger) open(trigger.dataset.tariff || "Не выбран", trigger.dataset.price || "");
    if (event.target.closest("[data-modal-close]")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}
