import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageKey = 'filmVisti';

  constructor() {}

  getFilmVisti(): Record<string, boolean> {
    const filmVisti = localStorage.getItem(this.storageKey);
    return filmVisti ? JSON.parse(filmVisti) : {};
  }

  toggleFilmVisto(movieId: string): void {
    const filmVisti = this.getFilmVisti();
    filmVisti[movieId] = !filmVisti[movieId]; // Cambia stato (visto/non visto)
    localStorage.setItem(this.storageKey, JSON.stringify(filmVisti));
  }

  getWatchedMovies(): string[] {
    return Object.keys(this.getFilmVisti()).filter(movieId => this.getFilmVisti()[movieId]);
  }
}
