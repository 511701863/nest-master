FROM node:18-alpine as builder

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine as prod

COPY --from=builder /app/dist /app
COPY --from=builder /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install --production

RUN npm install pm2 -g

EXPOSE 3000

CMD ["pm2-runtime","/app/main,js"]

# CMD ["node","/app/main.js"]
