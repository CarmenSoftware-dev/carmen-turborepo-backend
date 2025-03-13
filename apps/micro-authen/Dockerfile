FROM node:lts-alpine AS pruner

WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune --scope=micro-authen --docker

FROM node:lts-alpine AS installer

WORKDIR /app
COPY --from=pruner /app/out/json .
COPY --from=pruner /app/out/bun.lockb ./bun.lockb
COPY --from=pruner /app/turbo.json ./turbo.json
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

FROM oven/bun:1 AS builder

WORKDIR /app

# Copy root package files
COPY package.json .
COPY bun.lock .
COPY tsconfig.json .
COPY turbo.json .

# Copy all packages
COPY packages ./packages

# Copy app
COPY apps/micro-authen ./apps/micro-authen

# Install dependencies and build
RUN bun install
WORKDIR /app/apps/micro-authen
RUN bun run build

FROM oven/bun:1 AS runner

WORKDIR /app

# Copy root package files
COPY package.json .
COPY bun.lock .

# Copy packages
COPY packages ./packages

# Copy app
COPY --from=builder /app/apps/micro-authen/package.json ./apps/micro-authen/
COPY --from=builder /app/apps/micro-authen/dist ./apps/micro-authen/dist

# Install production dependencies
ENV NODE_ENV=production
RUN bun install

WORKDIR /app/apps/micro-authen

# Set default environment variables
ENV SUPABASE_URL=https://mfhdnmxqjiplmpfjmxbh.supabase.co
ENV SUPABASE_STORAGE_URL=https://mfhdnmxqjiplmpfjmxbh.supabase.co/storage/v1/s3
ENV SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1maGRubXhxamlwbG1wZmpteGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5Mzg4NTQsImV4cCI6MjA1NjUxNDg1NH0.Mosb5PxOR5663Oi6ScZfHL5Ir7k5fO3ix_sJEYMG4gg
ENV SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1maGRubXhxamlwbG1wZmpteGJoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDkzODg1NCwiZXhwIjoyMDU2NTE0ODU0fQ.GQzpWmfT5vhhv205Me27PnBVYi38JxWykw8n3wN08f4
ENV SUPABASE_JWT_SECRET=PLLT7mmcFsdO/NlrGS8Kn+0JX7oyt/G5K4+mL1WFjnShkqOne2ra3GHr5d7OURw3k9p1MpHMzmrINqPFCJDnEQ==

ENV SCHEMA_NAME=CARMEN_SYSTEM
# Connect to Supabase via connection pooling with Supavisor.
ENV DATABASE_URL="postgresql://postgres.mfhdnmxqjiplmpfjmxbh:8wzw8O77O0VAGDnt@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&schema=${SCHEMA_NAME}"

# Direct connection to the database. Used for migrations.
ENV DIRECT_URL="postgresql://postgres.mfhdnmxqjiplmpfjmxbh:8wzw8O77O0VAGDnt@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres?schema=${SCHEMA_NAME}"

CMD ["bun", "start"]