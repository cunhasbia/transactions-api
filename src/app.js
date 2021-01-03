import express from "express";

import User from "./user";
import Transaction from "./transaction";

const app = express();
app.use(express.json());

const users = [];

app.post("/users", (request, response) => {
    const { name, cpf, email, age  } = request.body;

    const findCpf = users.find(user => user.cpf === cpf);

    if (!name || !cpf || !email || !age) {
        return response.status(404).json({ error: "Unfilled data" });
    } else if (findCpf) {
        return response.status(404).json({ error: "CPF already in use" });
    } else {
        const user = new User(name, cpf, email, age);
        users.push(user);
        return response.json(user);
    }
});

app.get("/users/:id", (request, response) => {
    const { id } = request.params;

    const user = users.find(user => user.id === id);

    if (!user) {
        return response.status(404).json({ error: "User not found" });
    }

    const filteredUser = {
        id: user.id,
        name: user.name,
        cpf: user.cpf,
        email: user.email,
        age: user.age,
    };
    
    return response.json(filteredUser);
});

app.get("/users", (request, response) => {
    if (users.length <= 0) {
        return response.status(404).json({ error: "No registered users" });
    }

    const usersMap = users.map(user => {
        const newUser = {
          id: user.id,
          name: user.name,
          cpf: user.cpf,
          email: user.email,
          age: user.age,
        };

        return newUser;
      });
    
    return response.json(usersMap);
});

app.put("/users/:id", (request, response) => {
    const { id } = request.params;
    const { name, cpf, email, age } = request.body;

    if (!name || !cpf || !email || !age) {
        return response.status(404).json({ error: "Unfilled data" });
    }

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex < 0) {
        return response.status(404).json({ error: "User not found" })
    } else {
        users[userIndex].name = name;
        users[userIndex].age = age;
        users[userIndex].cpf = cpf;
        users[userIndex].email = email;

        return response.json(users[userIndex]);
    }
});

app.delete("/users/:id", (request, response) => {
    const { id } = request.params;

    const user = users.findIndex(user => user.id === id);
  
    if (user < 0) {
      return response.status(404).json({ error: "User not found" });
    }
  
    users.splice(user, 1);
    return response.status(200).send();
});

app.post("/users/:id/transactions", (request, response) => {
    const { id } = request.params;
    const { title, value, type } = request.body;
    
    if (!title || !value || !type) {
        return response.status(404).json({ error: "Unfilled data" });
    } else if (type !== 'income' && type !== 'outcome') {
        return response.status(404).json({ error: "Transaction type is not valid" });
    }

    const user = users.find(user => user.id === id);

    if (!user) {
     return response.status(404).json({ error: "User not found" });
    }

    const transaction = new Transaction(title, value, type);
    user.transactions.push(transaction);

    return response.json(user);
});

app.get('/users/:id/transactions/:idTransaction', (request, response) => {
    const { id, idTransaction } = request.params;
  
    const user = users.find(user => user.id === id);
    const transaction = user.transactions.findIndex(transaction => transaction.id === idTransaction);
  
    if (!user) {
        return response.status(404).json({ error: "User not found" });
    }
    if (transaction < 0) {
      return response.status(404).json({ error: "Transaction not found" });
    }

    return response.json(user.transactions[transaction]);
});

app.get("/users/:id/transactions", (request, response) => {
    const { id } = request.params;
  
    const user = users.find(user => user.id === id);
    
    if (!user) {
        return response.status(404).json({ error: "User not found" });
    }
    if (user.transactions.length <= 0) {
      return response.status(404).json({ message: "No transactions made by this user" });
    }

    let income = 0;
    let outcome = 0;

    const total = user.transactions.reduce((total, next) => {
        next.type === 'income' ? income += parseInt(next.value) : outcome += parseInt(next.value);
        return income - outcome;
    }, 0);
  
    const balance = {
        income: income,
        outcome: outcome,
        total: total,
    };
  
    return response.json({ transactions: user.transactions, balance: balance });
});

app.put('/users/:id/transactions/:idTransaction', (request, response) => {
    const { id, idTransaction } = request.params;
    const { title, value, type } = request.body;
  
    const user = users.find(user => user.id === id);

    if (!user) {
        return response.status(404).json({ error: "User not found" });
    }
    if (!title || !value || !type) {
        return response.status(404).json({ error: "Unfilled data" });
    }
    if (type !== 'income' && type !== 'outcome') {
        return response.status(404).json({ error: "Transaction type is not valid" });
    }
  
    const transaction = user.transactions.findIndex(transaction => transaction.id === idTransaction);

    if (transaction < 0) {
      return response.status(404).json({ error: "Transaction not found" });
    } else {
      user.transactions[transaction].title = title;
      user.transactions[transaction].value = value;
      user.transactions[transaction].type = type;

      return response.json(user.transactions[transaction]);
    }
});

app.delete('/users/:id/transactions/:idTransaction', (request, response) => {
    const { id, idTransaction } = request.params;
  
    const user = users.find(user => user.id === id);
  
    if (!user) {
        return response.status(404).json({ error: "User not found" });
    }
  
    const transaction = user.transactions.findIndex(transaction => transaction.id === idTransaction);

    if (transaction < 0) {
        return response.status(404).json({ error: "Transaction not found" });
    } else {
      user.transactions.splice(transaction, 1);
      
      return response.json({ transactions: user.transactions });
    }
});


app.listen(3333, () => {
    console.log("Server up and running at PORT 3333");
});