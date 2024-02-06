# # 使用 Node.js 21 的基礎映像
# FROM node:21

# # 安裝 pnpm（使用 --global 沒有實質效果，僅對於非全域安裝的專案）
# RUN npm install -g pnpm

# # 設定工作目錄
# WORKDIR /app

# # 複製 package.json 和 package-lock.json 以進行依賴安裝
# COPY package*.json ./
# COPY pnpm-lock.yaml ./

# # 安裝應用依賴
# RUN pnpm install

# # 複製應用程式代碼
# COPY . .

# # 暴露應用程式執行的端口
# EXPOSE 3000

# # 定義執行應用程式的命令
# # CMD ["node", "app.js"]
# CMD ["pnpm", "start"]

FROM node:21 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# FROM base AS build
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# RUN pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
# COPY --from=build /app/dist /app/dist
EXPOSE 3000
CMD [ "pnpm", "start" ]
