# -----------------------------
# Stage 1 - Dependencies
# -----------------------------
FROM node:20-alpine AS dependencies

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml ./
COPY apps/admin/package.json ./apps/admin/
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
RUN pnpm --filter admin build

# -----------------------------
# Stage 3 - Production
# -----------------------------
FROM node:20-alpine AS production

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

RUN corepack enable

COPY --from=builder /app/apps/admin ./

EXPOSE 3000

CMD ["pnpm", "start"]