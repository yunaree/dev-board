# DevBoard Backend

> This is the backend service for DevBoard — a modular, extensible task management API built with NestJS, Prisma, PostgreSQL, MongoDB, and JWT/OAuth authentication.

---

## Overview

The backend powers all core features of DevBoard: authentication, dashboards, tasks, comments, file attachments, and more. It exposes a REST API (with partial GraphQL support) and integrates multiple databases for flexibility and scalability. Security, extensibility, and clean architecture are the main priorities.

- **Live API:** [https://dev-board.onrender.com](https://dev-board.onrender.com)
- **Swagger Docs:** `/api` (see deployed instance)

---

## Tech Stack

- **NestJS** (Express)
- **Prisma ORM** + **PostgreSQL** (main data)
- **MongoDB** (comments)
- **JWT Auth** + **OAuth** (Google, GitHub)
- **REST API** + partial **GraphQL** (Apollo)
- **Swagger** (API docs)
- **Redis** (caching, planned)
- **Multer** (file upload)

---

## Features

- Modular architecture (NestJS modules)
- JWT authentication & OAuth (Google, GitHub)
- CRUD for dashboards, tasks, comments
- Assign users to dashboards/tasks
- File attachments for tasks
- API documentation (Swagger)
- Multi-database integration (PostgreSQL, MongoDB)
- Extensible for future features (caching, notifications, etc.)

---

## Getting Started

```bash
cd packages/backend
npm install
```

### Development

```bash
# Start in development mode
npm run start:dev
```

### Production

```bash
# Build and start
npm run build
npm run start:prod
```

### Environment

Copy `.env.example` to `.env` and fill in your database and OAuth credentials.

---

## API

- **REST:** All endpoints under `/api`
- **Swagger:** `/api` (auto-generated docs)
- **GraphQL:** `/graphql` (partial, WIP)

---

## Project Structure

- `src/modules/` — Feature modules (auth, tasks, dashboards, comments, etc.)
- `src/shared/` — DTOs, guards, types, utilities
- `prisma/` — Prisma schema & migrations

---

## Migrations

```bash
npx prisma migrate dev
```

---

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

---

## Deployment

The backend is deployed at:

> **https://dev-board.onrender.com**

---

## Contributing

Feel free to open issues or PRs for improvements, bugfixes, or new features!
