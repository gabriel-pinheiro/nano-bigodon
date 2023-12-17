FROM node:18-alpine as builder

WORKDIR /opt/bigodon

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
RUN npm prune --production


FROM node:18-alpine as production

WORKDIR /opt/bigodon

COPY --from=builder /opt/bigodon/dist ./dist
COPY --from=builder /opt/bigodon/node_modules ./node_modules
COPY --from=builder /opt/bigodon/package.json .
COPY --from=builder /opt/bigodon/.env .

EXPOSE 8080

CMD [ "node", "dist/main.js" ]
