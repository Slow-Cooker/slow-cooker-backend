FROM node:21
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build
#CMD [ "npm", "run", "start:dev" ]
#CMD tail -f /dev/null
#docker compose up --build
#docker compose exec app bash
#npm run start:dev
COPY . /app
WORKDIR /app
RUN npm install
RUN npx nest build
CMD node dist/main
