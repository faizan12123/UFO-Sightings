# UFO-Sightings
An application dedicated to providing data on UFO Sightings

This document provides instructions on how to set up and run the containerized application. 

## Prerequisites
Before you begin, please ensure that you have the following prerequisites installed:

[Docker](https://docs.docker.com/desktop/install/windows-install/)

[Postgres](https://www.postgresql.org/download/)


## Configuration

1. Clone the repository and navigate to the codebase root directory.

2. Create a `.env` file in the root directory to replicate the `.env_example` file. Populate the following variables with your PostgreSQL username and password:

- PGUSERPROD=your_prod_username
- PGPASSWORDPROD=your_prod_password
- PGUSERDEV=your_dev_username
- PGPASSWORDDEV=your_dev_password


## Running the Application

1. Open a terminal and navigate to the codebase root directory.

2. Build and start the application containers using the following command:

```bash
docker-compose up --build -d
```

```
WARNING: Please terminate conflicting background postgres services prior to running the above command
```


## Accessing the API
Once the containers are running, you can access the API endpoints using your browser or a tool like curl. Here are the main endpoints:

To access the main API endpoint: http://localhost:3001/getUFOdata/

To query by location:

http://localhost:3001/getUFOdata/?country=&city=&state=

Provide multiple values as parameters, separated by commas.

To query by date of occurrence:

http://localhost:3001/getUFOdata/?dateOfOccurrence=

Provide multiple values as parameters, separated by commas.

## Running Unit Tests
To run unit tests for the application, you can use the following command:

```docker-compose run app npm test```

## Example Queries
Here are some example queries you can try:

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
