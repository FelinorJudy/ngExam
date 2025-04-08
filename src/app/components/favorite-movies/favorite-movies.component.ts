import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private storageKey = 'favorites';

  getFavorites(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addFavorite(item: any): void {
    const favorites = this.getFavorites();
    if (!favorites.find(fav => fav.id === item.id)) {
      favorites.push(item);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  removeFavorite(id: number): void {
    const updated = this.getFavorites().filter(fav => fav.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
  }

  isFavorite(id: number): boolean {
    return this.getFavorites().some(fav => fav.id === id);
  }
}
