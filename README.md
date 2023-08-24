# UFO-Sightings
An API dedicated to providing data on UFO Sightings (data is updated every 6 hours from https://nuforc.org/databank/)

This document provides instructions on how to set up and run the containerized application. 

## Prerequisites
Before you begin, please ensure that you have the following prerequisites installed:

[Docker](https://www.docker.com/get-started/)


## Configuration

1. Clone the repository and navigate to the codebase root directory.

2. Create a `.env` file in the root directory to replicate the `.env_example` file. In the `.env` file, make sure to populate the following variables that were left blank in the `.env_example` file with your PostgreSQL username and password:

- PGUSERPROD=your_prod_username
- PGPASSWORDPROD=your_prod_password
- PGUSERDEV=your_dev_username
- PGPASSWORDDEV=your_dev_password


## Running the Application

1. Open a terminal and navigate to the codebase root directory.

2. Build and start the application containers using the following command:

- For a development environment, set the `NODE_ENV` variable in the `.env` file to `development` and run the following command:
```bash
docker compose -f docker-compose.dev.yml up --build -d
```

- For a production environment, set the `NODE_ENV` variable in the `.env` file to `production` and run the following command:
```bash
docker compose -f docker-compose.prod.yml up --build -d
```

### Warning
1. Before running the `docker-compose` command above, please ensure that the following ports are **not** already in use by other processes on your local system:

- Port `3001`
- Port `5434`
- Port `5433`

    Conflicting port usage could result in unexpected behavior and hinder the proper execution of the Docker Compose configuration.

2. If you are running the production environment, ensure to modify the `server_name` in the `./nginx/default.conf` file to match your own domain or server name



## Accessing the API
The application is currently hosted on AWS EC2 and is accessible at http://54.219.166.135/app/getUFOdata/. If you want to directly interact with the API without deploying the application, you can use this domain.

Alternatively, if you are running the application locally, once the containers are running and the database seeding has completed you can use the http://localhost:3001/getUFOdata/ domain instead. You can access the API endpoints using your browser or a tool like postman. 

Here are the main endpoints:

- To access the main API endpoint and retrieve all UFO data:

    - http://localhost:3001/getUFOdata/

    or 

    - http://54.219.166.135/app/getUFOdata/

- To query by location:

    - http://localhost:3001/getUFOdata/?country=&city=&state=

    or 

    - http://54.219.166.135/app/getUFOdata/?country=&city=&state=

Provide multiple values as parameters, separated by commas.

- To query by date of occurrence:

    - http://localhost:3001/getUFOdata/?dateOfOccurrence=

    or 

    - http://54.219.166.135/app/getUFOdata/?dateOfOccurrence=

Provide multiple values as parameters, separated by commas.


## Example Queries
Here are some example queries you can try:

- Get all results:
http://localhost:3001/getUFOdata/

- Query by location and date:
http://localhost:3001/getUFOdata/?country=usa&city=los%20angeles&dateOfOccurrence=7%2f21%2f23&state=CA

- Query by date only:
http://localhost:3001/getUFOdata/?dateOfOccurrence=7%2f21%2f23

- Query by multiple countries:
http://localhost:3001/getUFOdata/?country=usa,Indonesia

- Query by single country:
http://localhost:3001/getUFOdata/?country=usa

- Query by city:
http://localhost:3001/getUFOdata/?city=los%20angeles


## Running Unit Tests
To run unit tests for the application, you can use the following command:

```docker-compose run app npm test```


## Dependencies Used
| Dependency Name | Reason for Use                 | Installation Command     |
|-----------------|--------------------------------|--------------------------|
| Express         | Web framework for API calls    | `npm install express`    |
| Knex.js         | Query builder and migrations   | `npm install knex`       |
| Winston         | Logging library                | `npm install winston`    |
| pg              | PostgreSQL client for Node.js  | `npm install pg`         |
| Jest            | Testing framework              | `npm install jest` |
| Supertest       | HTTP testing library for Jest  | `npm install supertest` |
| Nodemon         | Automatic server restarts      | `npm install nodemon` |
| Dotenv          | Environment variable management| `npm install dotenv`     |
| Puppeteer          | Web scraping library| `npm install puppeteer`     |
| Express-rate-limit          | Rate limiting middleware for Express| `npm install express-rate-limit`     |
