# CMS Assignment - Setup Guide

This document explains how to set up and run the CMS monorepo locally.

---

# Prerequisites

Install the following software before starting.

- Node.js 20+
- pnpm 9+
- Git
- Docker Desktop (Optional)
- MongoDB (Local or Atlas)

Verify installation:

```bash
node -v
pnpm -v
git --version
docker --version
```

---

# Clone Repository

```bash
git clone <repository-url>
cd cms-assignment
```

---

# Install Dependencies

Install all workspace dependencies.

```bash
pnpm install
```

---

# Environment Variables

Copy the example environment file.

```bash
cp .env.example .env
```

Example configuration:

```env
PORT=5000

MONGODB_URI=mongodb://localhost:27017/cms

JWT_SECRET=your-secret-key

NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

# Start MongoDB

If MongoDB is installed locally:

```bash
mongod
```

Or use MongoDB Atlas by updating the connection string.

---

# Start Development

Run every application together.

```bash
pnpm dev
```

Or start each application individually.

Backend

```bash
pnpm --filter backend dev
```

Admin

```bash
pnpm --filter admin dev
```

Website

```bash
pnpm --filter website dev
```

Shared Package

```bash
pnpm --filter @cms/shared dev
```

---

# Default URLs

Backend

```
http://localhost:5000
```

Backend API

```
http://localhost:5000/api
```

Admin Dashboard

```
http://localhost:3000
```

Website

```
http://localhost:3001
```

---

# Build Project

Build every workspace.

```bash
pnpm build
```

Or individually.

```bash
pnpm --filter backend build

pnpm --filter admin build

pnpm --filter website build

pnpm --filter @cms/shared build
```

---

# Lint

```bash
pnpm lint
```

---

# Type Check

```bash
pnpm type-check
```

---

# Docker

Start containers.

```bash
docker compose up --build
```

Run in background.

```bash
docker compose up -d
```

Stop containers.

```bash
docker compose down
```

---

# Production

Create production build.

```bash
pnpm build
```

Start backend.

```bash
pnpm --filter backend start
```

Start Admin.

```bash
pnpm --filter admin start
```

Start Website.

```bash
pnpm --filter website start
```

---

# Folder Structure

```text
cms-assignment/
│
├── apps/
│   ├── admin/
│   └── website/
│
├── backend/
│
├── packages/
│   └── shared/
│
├── docs/
│
├── docker/
│
├── package.json
└── pnpm-workspace.yaml
```

---

# Troubleshooting

## Dependencies

```bash
pnpm install
```

## Clean

```bash
pnpm clean
```

## Reinstall

```bash
rm -rf node_modules

pnpm install
```

## Port Already In Use

Change the application port in the `.env` file.

---

# Useful Commands

Install packages

```bash
pnpm install
```

Development

```bash
pnpm dev
```

Build

```bash
pnpm build
```

Lint

```bash
pnpm lint
```

Type Check

```bash
pnpm type-check
```

Docker

```bash
docker compose up --build
```