# Task Manager

Проектът съдържа Task Manager с локално запазване и опционална Supabase интеграция:

- Седмица 1 – Основи: Next.js, TypeScript, Tailwind CSS и начална структура.
- Седмица 2 – Компоненти и Layout: React компоненти, props, state и layout.
- Седмица 3 – Работа с данни: структура на задачите, показване, добавяне, промяна на статус и изтриване.
- Седмица 4 – CRUD: редактиране, филтри, търсене, статистика, потвърждение и проверки.
- Седмица 5 – Supabase: schema с RLS, зареждане и CRUD операции при активна сесия.
- Седмица 6 – Authentication: вход, регистрация, изход и защита на личните маршрути.

## Стартиране

```bash
npm install
npm run dev
```

След това отвори `http://localhost:3000`.

За Supabase копирай `.env.example` в `.env.local`, попълни URL и anon key и изпълни `supabase/schema.sql` в Supabase SQL Editor.
