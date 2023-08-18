FROM node:18.12.1


ENV NODE_ENV="development"

WORKDIR /app
COPY . .

RUN npm install
RUN npm install --include=dev
RUN npm test
RUN npm start

EXPOSE 3000
CMD ["yarn", "cronjob"]