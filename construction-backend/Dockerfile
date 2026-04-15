FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

EXPOSE 5000

CMD ["sh", "-c", "echo 'Waiting for MySQL...' && while ! nc -z mysql 3306; do sleep 2; done && echo 'MySQL ready' && npm start"]
