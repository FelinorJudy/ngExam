import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })


  export class StorageService {
    private favoritesKey = 'favorites';
    private watchedKey = 'watched';
  
    addToFavorites(movie: any) {
      let favorites = this.getFavorites();
      favorites.push(movie);
      localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    }
  
    getFavorites(): any[] {
      return JSON.parse(localStorage.getItem(this.favoritesKey) || '[]');
    }
  
    addToWatched(movie: any) {
      let watched = this.getWatched();
      watched.push(movie);
      localStorage.setItem(this.watchedKey, JSON.stringify(watched));
    }
  
    getWatched(): any[] {
      return JSON.parse(localStorage.getItem(this.watchedKey) || '[]');
    }
  }