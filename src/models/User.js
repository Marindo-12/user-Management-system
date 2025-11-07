export class User {
  #id;
  #name;
  #email;
  #age;
  constructor({id, name, email, age}){
    this.#name = name;
    this.#id = id;
    this.#email = email;
    this.#age = age;
  }

  validate() {
    try {
      if (this.#name === "" || this.#name.length < 2) {
        throw new Error("Le nom doit avoir au moins 2 carateres.");
      } else if(!this.#email.includes("@") || !this.#email.includes(".")) {
        throw new Error("L'email doit etre fake@gmail.com");     
      } else if(this.#age < 1 || this.#age > 120) {
        throw new Error("L'age doit etre entre 1 et 120.")
      } else if (this.#id < 0) {
        throw new Error("L'id doit etre positive.");       
      }
    } catch (error) {
      console.log(error);
    }
  }

  update(data) {
    if (data.name !== undefined) this.#name = data.name;
    if (data.email !== undefined) this.#email = data.email;
    if (data.age !== undefined) this.#age = data.age;
    if (data.id !== undefined) this.#id = data.id;
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      age: this.#age,
    }; 
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  get age() {
    return this.#age;
  }
}