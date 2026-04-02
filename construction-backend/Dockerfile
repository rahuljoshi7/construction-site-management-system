FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Install netcat (for waiting)
RUN apt-get update && apt-get install -y netcat-openbsd

EXPOSE 5000

# WAIT FOR MYSQL BEFORE STARTING
CMD ["sh", "-c", "echo 'Waiting for MySQL...' && while ! nc -z mysql 3306; do sleep 2; done && echo 'MySQL started' && npm start"]