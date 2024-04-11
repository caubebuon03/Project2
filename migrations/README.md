# storefront-backend

Build a JavaScript API based on a requirements given by the stakeholders. You will architect the database, tables, and columns to fulfill the requirements.
The database schema and and API route information can be found in the (REQUIREMENT.md)

## Set up Database

`npm install` to install all dependencies
`docker-compose up` or `npm run docker-up` to start the docker container and set up the database and get access via http://127.0.0.1:5432
`npm run build` to build the app

### Start

`npm run start` to start the app and get access via http://127.0.0.1:3000:

### Running Ports

After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access

All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file.

## Token and Authentication

Tokens are passed along with the http header as

```
Authorization   <token - backend will send Bearer token to client>
```

## Testing

Run test with
`npm run test`

After start up, the server will test on port `3001` and the database on port `5433`

