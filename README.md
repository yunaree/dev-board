# DevBoard — Backend-Oriented Task Management System

> DevBoard is a backend-focused task tracker for developers featuring JWT authentication, REST & GraphQL APIs, file support, comments (MongoDB), caching (Redis), and a modern tech stack. The frontend is a minimal UI for API demonstration only.

---

## Overview

DevBoard is a learning project designed to practice modern backend technologies. The main focus is on architecture, API design, security, integration of multiple databases, and extensibility. The frontend is minimal and serves only to test and demonstrate backend capabilities.

---

## Tech Stack

### Backend (NestJS)
- NestJS (Express)
- Prisma ORM + PostgreSQL (main entities)
- MongoDB (comments)
- JWT Auth + OAuth (Google, GitHub)
- REST API + partial GraphQL (Apollo)
- Swagger (API docs)
- Docker-compose (quick start)
- Multer (file upload — planned)
- Redis (caching — planned)

### Frontend (Next.js 14)
- Next.js App Router (SSR)
- TailwindCSS + shadcn/ui
- TanStack Query + Zustand
- react-hook-form + zod
- Axios
- TypeScript

---

## Feature Checklist

- [x] JWT authentication (Sign up/Login)
- [x] OAuth (Google, GitHub)
- [x] Task CRUD (REST API)
- [x] Dashboard CRUD
- [x] Assign tasks to users
- [x] Task comments (MongoDB)
- [x] Swagger documentation
- [ ] GraphQL (Apollo) *(partial)*
- [ ] Task filtering/search (GraphQL)
- [x] File attachments to tasks (upload/download)
- [ ] Redis caching
- [ ] Email notifications
- [ ] Roles/permissions
- [ ] Websockets/Live updates
- [ ] Audit log (change history)
- [ ] Internationalization (i18n)
- [ ] Rate limiting
- [ ] CI/CD, tests

---

## Quick Start

```bash
git clone https://github.com/anastasiamorozz/dev-board
cd dev-board
# See README in packages/backend and packages/frontend for details
```

---

## Details
- Backend is the main focus: API, security, multi-database integration, caching, extensibility.
- Frontend is minimal, for testing and demonstrating the API (UI stub, SSR, basic authentication).
- Goal: hands-on experience with a modern stack, architecture, and integration of third-party services.

---

## Architecture

The application follows a modular, service-oriented architecture. The frontend (Next.js) communicates with the backend (NestJS) via HTTP/HTTPS, using both REST and GraphQL APIs. The backend is organized into dedicated services for authentication, tasks, dashboards, comments, file uploads, and notifications. Core data is stored in PostgreSQL via Prisma ORM, while comments are managed in MongoDB. Redis is planned for caching frequently accessed data. File metadata is stored in PostgreSQL, with actual files handled by the backend. Email notifications and other integrations are managed as separate services. This structure ensures clear separation of concerns, scalability, and ease of extension. See the diagram below for a high-level overview of these interactions.

![Architecture](/architecture.svg)

---

## Roadmap & Ideas
- File upload/view for tasks
- Caching popular queries with Redis
- Extend GraphQL for advanced filtering/search
- Email notifications, roles, live updates, audit log
- Improved tests, CI/CD, rate limiting
- Any ideas and contributions are welcome!

---

## Preview
> The UI is for API testing only, not production-ready.
