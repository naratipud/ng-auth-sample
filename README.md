# Sample authentication with Node.js and Angular

## Stack

- Angular with CLI
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

### TODO

- [x] Log In
- [x] Log Out
- [ ] Sign up