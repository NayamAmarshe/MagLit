FROM node:18-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
	if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
	elif [ -f package-lock.json ]; then npm ci; \
	elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
	else echo "Lockfile not found." && exit 1; \
	fi


FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --chown=node --from=builder /app/next.config.js ./
COPY --chown=node --from=builder /app/public ./public
COPY --chown=node --from=builder /app/.next ./.next
COPY --chown=node --from=builder /app/package.json ./package.json
COPY --chown=node --from=builder /app/package-lock.json ./package-lock.json
COPY --chown=node --from=builder /app/node_modules ./node_modules

# Automatically leverage output traces to reduce image size
# COPY --from=builder --chown=maglit:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=maglit:nodejs /app/.next/static ./.next/static

USER node
EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "run", "start"]
