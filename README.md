# Technical challenge from Frogmi (Earthquake App)

This app shows earthquake data from the last month, fetched from https://earthquake.usgs.gov/

> Developed by Diego Karabin <diegokarabin@gmail.com>

## Project structure

This project is a monorepo that contains an API made using Ruby on Rails and a frontend app made using React and Vite.
Both projects runs over docker, the backend container uses a docker service for the postgresql database.

## Steps to run the project

1. Copy `.env.example` file

```bash
cp .env.example .env

```
This file already has some environment variables for connect to the database inside the container, you can leave it as it is or change it as you prefer.

2. Run up the docker containers
```bash
docker compose up --build
```

3. Create and migrate the database
```bash
docker exec -it earthquake-app-backend-1 bin/rails db:create
docker exec -it earthquake-app-backend-1 bin/rails db:migrate
```

4. Excecute the tasks that will fetch the data
```bash
docker exec -it earthquake-app-backend-1 bin/rails fetch_data
```

5. Enter to `http://localhost:8080` to see the app.
