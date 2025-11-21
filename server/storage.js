import { db } from './firebase';

export class FirestoreStorage {
  constructor() {
    this.favoritesCollection = db.collection('favorites');
  }

  async getFavorites() {
    const snapshot = await this.favoritesCollection.orderBy('addedAt', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async addFavorite(insertLocation) {
    const newDocRef = this.favoritesCollection.doc();
    const location = {
      ...insertLocation,
      addedAt: Date.now()
    };
    await newDocRef.set(location);
    return { id: newDocRef.id, ...location };
  }

  async removeFavorite(id) {
    await this.favoritesCollection.doc(id).delete();
  }
}

export const storage = new FirestoreStorage();
