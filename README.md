# Transactions - API

Rest API for bank transactions that control the amounts received and taken from a user's account. Challenge proposed by [Growdev](https://growdev.com.br/) for personal studies using Nodejs and Express, with the ES6+ features.

## Instructions
- All routes must have **validation** of the received parameters, returning an error message and appropriate status for the situation.
- All routes that have a query to some information (**GET, PUT, DELETE**), must validate if the accessed resource **exists** before taking action, returning an error message and appropriate status for the situation.
- Users must be saved in a **specific array**, to be used in other routes.
- Create a class **User**, which should have as properties: **name, cpf, email, age** and **transactions** (this being an array).
- Create a class **Transaction**, which should have as properties: **title, value** and **type**.
- Both the **User** and **Transaction** classes must have an id property, which must be automatically generated, this being a **unique** value.
- **POST /users**: The route must receive **name, cpf, email** and **age** within the body of the request, the **cpf** must be unique per user. Create an instance of the class **User** with the received data, and add to the user array.
- **GET /users/:id**: The route must return a unique user according to the parameter received. Must not return the user's transactions on that route.
- **GET /users**: The route must return a listing with all the users registered until now. Must not return the user's transactions on that route.
- **PUT & DELETE /users/:id**: The route must edit or delete users.
- **POST /users/:id/transactions**: The route should receive **title, value, type** within the body of the requisition, being "type" the transaction type, which must have as **income** the entries value (deposits) and **outcome** for withdrawals. Create an instance of the class Transaction, and add it to the responsible user previously saved in the user array.
- **GET /users/:id/transactions/:id**: The route must return a unique previously registered transaction.
- **GET /users/:id/transactions**: The route should return a listing of all transactions that you have registered so far for a specific user, along with the amount of the sum of entries, withdrawals and total credit.
- **PUT & DELETE /users/:id/transactions/:id**: They must edit or delete transactions.

## How to run the project?

Before start the project, install [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) and [Insomnia](https://insomnia.rest/) in your machine.<br>
Moreover, recommend use the [VSCode](https://code.visualstudio.com/) terminal.

```bash
# Clone this repository
$ git clone https://github.com/cunhasbia/transactions-api

# Access the repository on your terminal.
$ cd transactions-api

# Install dependencies
$ yarn install

# Run
$ yarn dev

# Access the routes through Insomnia. Example:
$ http://localhost:3333/users
```

## Technologies and tools used:

- Javascript ES6+
- Nodejs
- Express
- Nodemon
- Yarn
- Insomnia

<hr>

Made by Bianca Cunha
