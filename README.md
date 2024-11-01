# cinema

# install

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
MAIN_DOMAIN=localhost
```

# start

```
docker compose up
```

In another shell
```
nvm use
npm install
npm run setup-database
npm start
```

# frontend

In another shell

```
cd frontend
nvm use
npm install
npm start
```

# postman

There's a postman collection in [postman/cinema.json](postman/cinema.json)
in case you test the endpoints with this tool