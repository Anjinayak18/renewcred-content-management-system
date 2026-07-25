# -----------------------------
# Stage 1 - Dependencies
# -----------------------------
FROM node:20-alpine AS dependencies

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml ./
COPY backend/package.json ./backend/
COPY packages/shared/package.json ./packages/shared/

RUN pnpm install --frozen-lockfile

# -----------------------------
# Stage 2 - Build
# -----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules

RUN pnpm --filter @cms/shared build
RUN pnpm --filter backend build

# -----------------------------
# Stage 3 - Production
# -----------------------------
FROM node:20-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml ./
COPY backend/package.json ./backend/

COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/node_modules ./backend/node_modules

EXPOSE 5000

WORKDIR /app/backend

CMD ["node", "dist/server.js"]