# leadops-studio# LeadOps Studio

Минималистичный сайт студии LeadOps Studio.

LeadOps Studio делает сайты и системы заявок для бизнеса: лендинги, формы, Telegram-уведомления, Google Sheets/CRM и AI-подсказки для обработки обращений.

## Страницы

- `index.html` — главная страница
- `catalog.html` — каталог тарифов
- `process.html` — процесс работы
- `privacy.html` — политика обработки данных

## Структура

```text
.
├── index.html
├── catalog.html
├── process.html
├── privacy.html
├── assets/
│   ├── css/
│   ├── js/
│   ├── img/
│   └── data/
└── .nojekyll
```

## Технологии

- HTML
- CSS
- JavaScript
- Google Apps Script
- Google Sheets
- GitHub Pages

## Форма заявки

Формы на сайте отправляют заявки в Google Sheets через Google Apps Script.

Поля заявки:

- Дата
- Имя
- Телефон
- Telegram / WhatsApp
- Сфера бизнеса
- Что нужно
- Выбранный тариф
- Комментарий

## Деплой

Сайт опубликован через GitHub Pages.

Для деплоя используется готовая статическая сборка:

```text
index.html
catalog.html
process.html
privacy.html
assets/
.nojekyll
```

## Важно

Этот репозиторий содержит только публичную deploy-версию сайта.

Исходные рабочие файлы, сборочные скрипты, интеграции и внутренние документы не входят в публичный репозиторий.
