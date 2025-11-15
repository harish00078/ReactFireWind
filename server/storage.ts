import { type FavoriteLocation, type InsertFavoriteLocation } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getFavorites(): Promise<FavoriteLocation[]>;
  addFavorite(location: InsertFavoriteLocation): Promise<FavoriteLocation>;
  removeFavorite(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private favorites: Map<string, FavoriteLocation>;

  constructor() {
    this.favorites = new Map();
  }

  async getFavorites(): Promise<FavoriteLocation[]> {
    return Array.from(this.favorites.values()).sort(
      (a, b) => b.addedAt - a.addedAt
    );
  }

  async addFavorite(insertLocation: InsertFavoriteLocation): Promise<FavoriteLocation> {
    const id = randomUUID();
    const location: FavoriteLocation = { 
      ...insertLocation, 
      id,
      addedAt: Date.now()
    };
    this.favorites.set(id, location);
    return location;
  }

  async removeFavorite(id: string): Promise<void> {
    this.favorites.delete(id);
  }
}

export const storage = new MemStorage();
