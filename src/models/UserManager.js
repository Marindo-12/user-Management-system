import { User } from "./User.js"
import { NotFoundError } from "../utils/errors.js";

export class UserManager {
  #users = [];
  #nextId = 1;

  constructor() { this.#loadFromStorage(); }

  async addUser(data) {
    try {
      const user = new User({
        id: this.#nextId++,
        name: data.name,
        age: data.age,
        email: data.email
      });

      this.#users.push(user);
      await this.#save();
      return user;
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un utilisateur :", error);
      throw error;
    }
  }

  getUser(id) {
    const user = this.#users.find(u => u.id === id);
    if (!user) throw new NotFoundError("Utilisateur non trouvé !");
    return user;
  }


  async updateUser(id, data) {
    try {
      const user = this.getUser(id);
      user.update(data);
      await this.#save();
      return user;
    } catch (error) {
      console.log("Error de Update");
    }
  }

  async deleteUser(id) {
    try {
      const i = this.#users.findIndex((item) => {
        return item.id === id;
      })
      if (i === -1) {
        throw new NotFoundError("User non trouve.");
      }
      this.#users.splice(i, 1);
    } catch (error) {
      console.log("Erreur lors de la deletion d'user.");
    }
  }

  getAll() {
    return [...this.#users];
  }

  #save() {
    const users = this.#users.map(user => {
      return user.toJSON();
    })
    localStorage.setItem("users-v1", JSON.stringify(users));
    localStorage.setItem("nextId", this.#nextId.toString());
  }

  #loadFromStorage() {
    const donnee = localStorage.getItem("users-v1");
    const nextId = localStorage.getItem("nextId");
    if (donnee) {
      this.#users = JSON.parse(donnee).map(user => new User(user));
    }
    if (nextId) {
      this.#nextId = parseInt(nextId);
    }
  }
}