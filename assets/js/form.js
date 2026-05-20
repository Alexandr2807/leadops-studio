function getConfig() {
  return window.LEADOPS_CONFIG || {};
}

function isConfiguredUrl(url) {
  return Boolean(url && /^https:\/\/script\.google\.com\/macros\/s\//.test(url));
}

function buildPayload(form) {
  const formData = new FormData(form);
  const payload = {};
  for (const [key, value] of formData.entries()) payload[key] = String(value).trim();

  payload.created_at = new Date().toISOString();
  payload.user_agent = navigator.userAgent;
  payload.page_url = window.location.href;
  return payload;
}

function setStatus(form, message, type = "") {
  const status = form.querySelector("[data-form-status]");
  if (!status) return;
  status.textContent = message;
  status.classList.remove("is-success", "is-error");
  if (type) status.classList.add(type);
}

function saveLocalBackup(payload) {
  try {
    const key = "leadops_leads_backup";
    const leads = JSON.parse(localStorage.getItem(key) || "[]");
    leads.push(payload);
    localStorage.setItem(key, JSON.stringify(leads.slice(-30)));
  } catch (error) {
    console.warn("Local backup failed", error);
  }
}

function buildTelegramFallback(payload) {
  const config = getConfig();
  const username = config.contacts?.telegramUsername || "";
  const link = config.contacts?.telegram || (username ? `https://t.me/${username}` : "#");
  const text = [
    "Здравствуйте! Хочу оставить заявку на сайт/мини-аудит.",
    `Имя: ${payload.name || ""}`,
    `Телефон: ${payload.phone || ""}`,
    `Telegram: ${payload.messenger || ""}`,
    `Сфера: ${payload.business || ""}`,
    `Что нужно: ${payload.need || ""}`,
    `Тариф: ${payload.selected_tariff || "Не выбран"}`,
    `Ссылка: ${payload.business_link || ""}`,
    `Комментарий: ${payload.comment || ""}`
  ].join("\\n");
  return `${link}?text=${encodeURIComponent(text)}`;
}

async function sendToAppsScript(payload) {
  const url = getConfig().appsScriptUrl;

  if (!isConfiguredUrl(url)) {
    saveLocalBackup(payload);
    return { ok: true, fallback: true };
  }

  await fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  });

  return { ok: true, fallback: false };
}

export function initForms() {
  document.querySelectorAll("[data-lead-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submitButton = form.querySelector("[type='submit']");
      const payload = buildPayload(form);

      if (!payload.name || !payload.phone) {
        setStatus(form, "Заполните имя и телефон.", "is-error");
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Отправляем...";
      }

      try {
        const result = await sendToAppsScript(payload);
        form.reset();

        if (result.fallback) {
          setStatus(form, "Форма пока не подключена к таблице. Откроется Telegram для отправки заявки.", "is-success");
          const telegramUrl = buildTelegramFallback(payload);
          if (telegramUrl !== "#") window.open(telegramUrl, "_blank", "noopener");
        } else {
          setStatus(form, "Заявка отправлена. Мы свяжемся с вами.", "is-success");
        }
      } catch (error) {
        console.error(error);
        saveLocalBackup(payload);
        setStatus(form, "Не удалось отправить заявку. Напишите нам в Telegram или VK.", "is-error");
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = submitButton.dataset.defaultText || "Отправить заявку";
        }
      }
    });
  });
}
