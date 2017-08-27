# Sample authenticate with Angular and Node.js

Demonstrate authentication with Angular and Node.js

## Stack

- Angular
- Node.js
- MongoDB

## Development setup

### Angular app

To run the angular app we need to position it in the ng-auth folder and run the following command:

```bash
npm start
```

This will run the `angular-cli` command `ng serve` that will deploy the angular app in a webpack integrated server for testing at the url `http://localhost:4200`.

### Server API

To start the server api, we need to be position it at the server folder and run the command:

```bash
npm run dev
```

This will start the api service at the following url: `http://localhost:3000`

## Prerequisites

- Angular CLI 1.3.0
- Node.js 6.9.0
- npm 5.0.0
- MongoDB 3.2.10

## TODO

- [x] Log In
- [x] Log Out
- [x] Sign up
- [x] Error handling