import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  addedAt: { type: Date, default: Date.now }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

export class MongoStorage {
  async getFavorites() {
    const favorites = await Favorite.find().sort({ addedAt: -1 });
    return favorites.map(fav => ({
      id: fav._id.toString(),
      city: fav.city,
      country: fav.country,
      addedAt: fav.addedAt
    }));
  }

  async addFavorite(insertLocation) {
    const favorite = new Favorite(insertLocation);
    await favorite.save();
    return {
      id: favorite._id.toString(),
      city: favorite.city,
      country: favorite.country,
      addedAt: favorite.addedAt
    };
  }

  async removeFavorite(id) {
    await Favorite.findByIdAndDelete(id);
  }
}

export class MemStorage {
  constructor() {
    this.favorites = new Map();
    this.currentId = 1;
  }

  async getFavorites() {
    return Array.from(this.favorites.values()).sort((a, b) => b.addedAt - a.addedAt);
  }

  async addFavorite(insertLocation) {
    const id = String(this.currentId++);
    const favorite = {
      id,
      ...insertLocation,
      addedAt: new Date()
    };
    this.favorites.set(id, favorite);
    return favorite;
  }

  async removeFavorite(id) {
    this.favorites.delete(id);
  }
}

export const storage = new MemStorage();
// export const storage = new MongoStorage();
