import { v4 as uuidGenerator } from "uuid";

class User {
    constructor(name, cpf, email, age) {
        this.id = uuidGenerator();
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.age = age;
        this.transactions = [];
    }
}

export default User;