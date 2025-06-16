# 🧩 DevBoard — Task Management App for Developers

> A full-featured task tracker with JWT authentication, REST & GraphQL APIs, file uploads, and dual database support (PostgreSQL + MongoDB).

---

## 🔍 Overview

**DevBoard** is a fullstack task management system designed as a hands-on learning project. It allows users to register, log in, create tasks, comment, upload attachments, and filter by status — all while practicing modern technologies like NestJS, Prisma, MongoDB, and the latest Next.js 14 stack.

---

## 🚀 Tech Stack

### 🔙 Backend (NestJS)
- **NestJS** (built on Express)
- **Prisma ORM** with **PostgreSQL**
- **MongoDB** for comments
- **JWT Authentication** 
- **REST API** + partial **GraphQL (Apollo)**
- **File Uploads** (Multer)
- **Swagger** API documentation
- **Docker-compose** setup

### 🔛 Frontend (Next.js 14)
- **Next.js App Router** (SSR)
- **TailwindCSS** + **shadcn/ui**
- **TanStack Query** + **Zustand**
- **react-hook-form** + **zod** for form validation
- **Axios** for API communication
- **TypeScript** across the stack

---

## 📸 Preview

> _(Coming soon: UI screenshots or live demo link)_

---

## 🧠 Key Features

- 🔐 JWT-based Authentication (Sign up & Login)
- 📋 Full CRUD operations on tasks (REST API)
- 🧵 Comments on tasks (MongoDB-backed)
- 📎 File attachments on tasks
- 🔍 Task filtering by status and assignee
- 🔄 GraphQL query support for filtered task lists
- 👥 User-task relations (assigning tasks)

---

## ⚙️ Getting Started

### 📁 Clone & Install

```bash
git clone https://github.com/anastasiamorozz/dev-board
cd dev-board
