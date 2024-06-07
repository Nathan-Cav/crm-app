# CSC301 2024 Assignment 3
Task 3 for CSC301 Full Stack Web Development

TODO General information about the app

## Starting the Application

The root folder controls installation and execution for both the server and client (the web app itself). To install and run both client and server simultaneously, open a terminal in the root of the assignment repo and run the following:

```javascript
npm install // Install all dependencies for both applications
npm start // Start both applications
```

This will install dependencies for, and start, both node JS applications. The assessment application can then be accessed at `http://localhost:5173`

Each individual application can be run by running in the root of the assignment repo:

```javascript
npm run server // Run the server
npm run client // Run the client front-end
```

Additionally, dependencies for each application can be installed by running in the root of the assignment repo:

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

### API Endpoints

TODO