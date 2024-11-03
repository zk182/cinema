# Cinema

# Install

in root folder, create an .env with this structure
```
PRETTY_LOGS=1
APP_NAME=cinema
PORT=
JWT_KEY=111111
SESSION_EXPIRATION=2

# DEBUG=knex:query

DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=123456
DATABASE_NAME=cinema
DATABASE_PORT=54328
CONNECTION_POOL_LIMIT=10

REDIS_HOST=
REDIS_PORT=63798

NO_CRONS=1
TZ=Europe/Madrid

MONGO_DB_URI=mongodb://localhost:27017/?replicaSet=rs0
MONGO_DB_NAME=reservations
MONGO_CONNECTION_POOL_LIMIT=10
MAIN_DOMAIN=localhost
```

you may also check [.env example](.env.example)

# Start

```
docker compose up
```

- Make sure to have this [keyfile](./keyfile) at root
with permissions to read

- In case you have any problems connecting to the mongodb replica set,
like resolving `host.docker.internal`, add 
`127.0.0.1 host.docker.internal`
in your `/etc/hosts` file


After `cinema-mongo`, `cinema-redis` & `cinema-postgres` is spinned up
In another shell run
```
nvm use
npm install
npm run setup
npm start
```

This will get you a default set of `users`, cinema `sessions` and `reservations` to test 

- email: u1@test.com

- email: u2@test.com

- email: u3@test.com

the three of them with same password: 123

# Frontend

In another shell

```
cd frontend
nvm use
npm install
npm start
```

# Architecture Design

- [Architecture](documentation/Architecture.md)

# Concurrency

- [Concurrency](documentation/Concurreny.md)

To test concurrency also check [script](./scripts//concurrency.js) & 
run `npm run test:concurrency`

# Happy Path

- [Happy Path](documentation/HappyPath.md)

# KPIS

- [KPIS](documentation/KPIS.md)

# Postman

There's a postman collection in [postman/cinema.json](postman/Cinema.json)
in case you test the endpoints with this tool

