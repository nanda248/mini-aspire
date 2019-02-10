# Mini Aspire by Nan Da

This is a technical assessment requested by Aspire Capital.
Main functionalities of this project include:
  - Submit loans
  - Approve or Deny loans
  - Repay loans
  - Display repay history

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

Install the dependencies:
```sh
$ cd mini-aspire
$ npm install -g json-server
$ npm install
```
Ensure that JSON-server is installed properly by running `json-server -v` and version name should appear in the terminal. (e.g. 0.14.2)  

Start JSON-Server and React Client on port 3000 and port 3001 respectively:
```sh
$ json-server --watch db.json 
$ npm start
```

Then the JSON server should be running on http://localhost:3000/ and react should be running on http://localhost:3001/


### Peoject Summary
It is a single page application where user can submit loan. User can also approve and deny loans. User can also repay the loans. There are 4 main modules:  
**Submit Loan** - User can submit loan by filling in the fields. Repay amount cannot be more than loan amount. Maximum loan amount is $10,000.  
**Approve or Deny** - User can approve or deny submitted loans.  
**All Loans** - User can view the details of all the loans, whether it is approved or denied or pending or fully paid. User can also repay approved loans on this page.  
**Repay History** - User can view repay history of each approved loans.  

**Limitations**
There are no state management library and routers used because it is a single page application with very minimal state manipulation. 

License
----
Copyright of NanDa

