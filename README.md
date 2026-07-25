# RenewCred CMS Assignment

A production-ready Headless Content Management System (CMS) built using **Next.js**, **Express.js**, **MongoDB**, **Redux Toolkit**, and **Docker**.

---

# Architecture

```
                 Admin CMS (Next.js)

                        │

                 Redux Toolkit

                        │

               REST API (Express)

                        │

                  MongoDB Database

                        │

               Public Website
```

The project follows a **Headless CMS** architecture where all content is managed through an admin dashboard and rendered dynamically on the public website.

---

# Technology Stack

## Frontend

- Next.js 15
- TypeScript
- Redux Toolkit
- RTK Query
- Tailwind CSS
- React Hook Form
- Zod
- Axios
- TipTap Editor

## Backend

- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Express Validator
- Multer
- Helmet
- Morgan

## Infrastructure

- Docker
- Docker Compose

---

# Features

## Authentication

- Admin Login
- Logout
- Protected Routes
- JWT Authentication

---

## CMS

- Dashboard
- Pages
- Rich Text Editor
- Block-Based Content
- Media Upload
- SEO Metadata
- Draft / Publish
- Search
- Pagination

---

## Public Website

- Dynamic Pages
- Responsive Design
- SEO Optimized
- KaTeX Support
- Dynamic Block Rendering

---

# Folder Structure

```
cms-assignment/
│
├── apps/
│   ├── admin/
│   └── website/
│
├── backend/
│
├── packages/
│
├── docs/
│
├── docker/
│
├── docker-compose.yml
├── README.md
└── .env.example
```

---

# Getting Started

## Clone

```bash
git clone <repository-url>

cd cms-assignment
```

---

## Install

We use **pnpm** workspaces.

```bash
pnpm install
```

---

## Environment

Copy

```
.env.example
```

to

```
.env
```

Update values.

---

## Start

Using Docker

```bash
docker compose up --build
```

---

Without Docker

Backend

```bash
cd backend

pnpm install

pnpm dev
```

Admin

```bash
cd apps/admin

pnpm install

pnpm dev
```

Website

```bash
cd apps/website

pnpm install

pnpm dev
```

---

# Default Admin

Email

```
admin@example.com
```

Password

```
Admin@123
```

---

# Project Goals

- Production Ready
- Scalable Architecture
- Clean Code
- Feature-Based Structure
- Responsive UI
- Secure APIs
- Dynamic Content Management

---

# Future Enhancements

- Version History
- Roles & Permissions
- Audit Logs
- Multi-language Support
- Cloud Storage
- Image Optimization
- Analytics Dashboard
- Page Preview

---

# License

MIT