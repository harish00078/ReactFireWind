import { randomUUID } from "crypto";

export class MemStorage {
  constructor() {
    this.favorites = new Map();
  }

  async getFavorites() {
    return Array.from(this.favorites.values()).sort(
      (a, b) => b.addedAt - a.addedAt
    );
  }

  async addFavorite(insertLocation) {
    const id = randomUUID();
    const location = { 
      ...insertLocation, 
      id,
      addedAt: Date.now()
    };
    this.favorites.set(id, location);
    return location;
  }

  async removeFavorite(id) {
    this.favorites.delete(id);
  }
}

export const storage = new MemStorage();
