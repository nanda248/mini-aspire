# Mini Aspire by Nan Da

This is a technical assessment requested by Aspire Capital.
Main functionalities of this project include:
  - Submit loans
  - Approve or Deny loans
  - Repay loans

## Technology Stack
The project was developed using below libraries and frameworks:
* [ReactJS](https://reactjs.org/) - A Javascript library for building user interfaces
* [Materialize](https://materializecss.com/) - A modern responsive front-end framework based on material design
* [sweetalert](https://sweetalert.js.org/) - A library to display error and warning popups beautifully
* [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node
* [JSON Server](https://github.com/typicode/json-server) - Get a full fake REST API with zero coding in less than 30 seconds.

### Installation and Setup
The project requires [Node.js](https://nodejs.org/) to run.
Versions during this project development: NodeJS v8.11.4 & npm 6.4.1

Clone the repo:
```
git clone https://github.com/nanda248/mini-aspire.git
```

Install the dependencies and start the server:

```sh
$ cd mini-aspire
$ npm install
$ npm start
```
Then the server should be running on http://localhost:3000/

### Peoject Summary
It is a simple POC front-end web app where user can submit loan. User can also approve and deny loans. User can also repay the loans.

**Limitations**
Since the project has no backend and DB, all data will be refreshed to initial state when the page is reloaded. There are no state management library and routers used because it is a single page application with very minimal state manipulation. 

License
----
Copyright of NanDa

