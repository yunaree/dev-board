# DevBoard — Task Management System

The application follows a modular, service-oriented architecture. The frontend (Next.js) communicates with the backend (NestJS) via HTTP/HTTPS, using both REST and GraphQL APIs. The backend is organized into dedicated services for authentication, tasks, dashboards, comments, file uploads, and notifications. Core data is stored in PostgreSQL via Prisma ORM, while comments are managed in MongoDB. Redis is planned for caching frequently accessed data. File metadata is stored in PostgreSQL, with actual files handled by the backend. Email notifications and other integrations are managed as separate services. This structure ensures clear separation of concerns, scalability, and ease of extension. See the diagram below for a high-level overview of these interactions.

![Architecture](/architecture.svg)


### Tech Stack

Backend:

```bash
NestJS (Express), PostgreSQL, MongoDB, Redis, RabbitMQ, Docker
```

Frontend:

```bash
Next.js, TailwindCSS, shadcn/ui, Zustand, TanStack Query, zod
```


### Branches

- ``main`` for deployment
- ``dev`` for backend features
- ``ui`` for frontend features
- ``profile`` code with auth and user settings without anything

