# CSC301 2024 Assignment 3
Task 3 for CSC301 Full Stack Web Development. The app is a client-relations system which allows for the tracking of jobs associated with clients, including the state of those jobs and whether/how much the client has paid.

## Dependencies

This application requires Docker and Docker Compose to initialise and run the database. Please ensure these are installed.

Application containers can be started and stopped through Docker Compose using npm by running in the root of this repo:

```javascript
npm start-docker // Starts all docker containers (restarts them if already started)
npm stop-docker // Stops all docker containers
```

>**Note:** Docker containers are started and initialised alongside the application through `npm start`.

### Environment Variables

An .env file **MUST** be created in the root of this repo in order to specify database connection variables for the server. All environment variables are specified below.

Only `DB_PASSWORD` is required in order for the application to work. All others will default to the values specified below.

```javascript
DB_HOST=localhost       // DB Hostname
DB_PORT=5432            // DB Port
DB_SERVER=server        // DB Schema Name
DB_USER=postgres        // DB User
DB_PASSWORD=<password>  // DB Password for User
```

## Starting the Application

The root folder controls installation and execution for both the server and client (the web app itself). To install and run both client and server simultaneously, open a terminal in the root of this repo and run the following:

```javascript
npm install // Install all dependencies for both applications
npm start // Start both applications (including docker containers)
```

This will install dependencies for, and start, both node JS applications. The assessment application can then be accessed at `http://localhost:5173`

Each individual application can be run by running in the root of this repo:

```javascript
npm run server // Run the server
npm run client // Run the client front-end
```

>**Note:** Docker containers will need to be started separately if using these commands.

Additionally, dependencies for each application can be installed by running in the root of this repo:

```javascript
npm run install-server // Install dependencies for the server
npm run install-client // Install dependencies for the client front-end
```

## Server API

By running `npm run server`, you should see a message like this

```shell
> csc301-24-assignment-3-nathan-cav@1.0.0 server
> cd ./server && npm start


> server@1.0.0 start
> npm run build && node dist/main.js


> server@1.0.0 build
> tsc

Server is listening at http://localhost:3055 or http://127.0.0.1:3055
```

## API Endpoints

The endpoints associated with this API are:

### GET /clients

Retrieve list of all clients listed in the system

### GET /clients/{clientId}

Get information associated with a single client including client business details, points of contact, and jobs.

### GET /jobs

Retrieve list of all jobs listed in the system, including the companies they're associated with.

### GET /jobs/{jobId}

Retrieve information for a single job.

### DELETE /job/{jobId}

Delete a job from the system.

### POST /client

Add a client to the system. Response returns the ID of the new client.

#### Request Body

```json
{
    "company_name": "New Buz Pty Ltd",
    "trading_as": "Innovation",
    "abn": "15975315975",
    "active": true,
    "address": "90 Sippy Downs Drive",
    "suburb": "Sippy Downs",
    "state": "QLD",
    "postcode": "4551",
    "comments": "Certainly a business...",
    "client_contacts": [
        {
            "name": "John Snow",
            "email": "john@organisation.com.au",
            "comments": "Main point of contact for everything.",
            "position": "CEO",
            "phone_number": "0412 345 789"
        },
        {
            "name": "Other Person",
            "email": "other@organisation.com.au",
            "comments": "Some other person. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            "position": "COO",
            "phone_number": "0411 111 111"
        }
    ]
}
```

#### Response Body (200)

```json
{
    "id": "e5bb6b10-bbb3-45cf-a77b-8535bdd774c4",
    "message": "Client added successfully"
}
```

### POST /client/{clientId}

Update a client in the system referencing the Client ID.

#### Request Body

```json
{
    "company_name": "New Buz Pty Ltd",
    "trading_as": "Innovation",
    "abn": "15975315975",
    "active": true,
    "address": "90 Sippy Downs Drive",
    "suburb": "Sippy Downs",
    "state": "QLD",
    "postcode": "4551",
    "comments": "Certainly a business...",
    "client_contacts": [
        {
            "name": "John Snow",
            "email": "john@organisation.com.au",
            "comments": "Main point of contact for everything.",
            "position": "CEO",
            "phone_number": "0412 345 789"
        },
        {
            "name": "Other Person",
            "email": "other@organisation.com.au",
            "comments": "Some other person. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            "position": "COO",
            "phone_number": "0411 111 111"
        }
    ]
}
```

#### Response Body (200)

```json
{
    "id": "e5bb6b10-bbb3-45cf-a77b-8535bdd774c4",
    "message": "Client details updated successfully"
}
```

### POST /job

Add a job to the system, associated with a given. Response returns the ID of the new job, as well as the ID of the client associated with that job.

#### Request Body

```json
{
    "client_id": "a22663e8-6cb9-47a6-b924-d6873d56af0b",
    "status": "Complete",
    "description": "Small Job",
    "amount_due": 200,
    "amount_paid": 200
}
```

#### Response Body (200)

```json
{
    "id": "cdd5c4f3-8292-4ed0-babe-16a170017dfc",
    "client_id": "a22663e8-6cb9-47a6-b924-d6873d56af0b",
    "message": "Job added to client successfully"
}
```

### POST /job/{jobId}

Update a job in the system referencing the Job ID.

#### Request Body

```json
{
    "status": "In Progress",
    "description": "Large Job",
    "comments": "Update Comment",
    "amount_due": 400
}
```

#### Response Body (200)

```json
{
    "id": "cdd5c4f3-8292-4ed0-babe-16a170017dfc",
    "message": "Job updated successfully"
}
```