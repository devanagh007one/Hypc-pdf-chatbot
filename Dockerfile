FROM node:18
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN mkdir -p uploads
EXPOSE 3000
CMD ["node", "app.js"]