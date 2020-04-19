## Installation

```bash
$ npm install
```

## Running the app using POSTMAN

```bash
# development
$ npm run start

# using postman
POST http://localhost:3000/parking-lot with content-type: multipart/form-data, file AS name of uploaded file parameter
```

## Running the app using command line

```bash
# Run Application with input file (example is : './files/file_input.txt')
$ npx nestjs-command parking_lot ./files/file_input.txt
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
