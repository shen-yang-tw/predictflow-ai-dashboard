FROM node:20-slim

WORKDIR /app

# 安裝 pnpm (若使用 npm/yarn 可移除這行)
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* package-lock.json* ./

# 安裝依賴項目
RUN \
  if [ -f pnpm-lock.yaml ]; then pnpm i; \
  elif [ -f package-lock.json ]; then npm ci; \
  else npm install; \
  fi

COPY . .

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 開發模式執行指令
CMD ["pnpm", "dev"]
