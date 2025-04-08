import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private viewKey = 'filmVisti';
  private favKey = 'filmPreferiti;' 

  constructor() {}

  getFilmVisti(): Record<string, boolean> {
    const filmVisti = localStorage.getItem(this.viewKey);
    return filmVisti ? JSON.parse(filmVisti) : {};
  }

  toggleFilmVisto(movieId: string): void {
    const filmVisti = this.getFilmVisti();
    filmVisti[movieId] = !filmVisti[movieId]; // Cambia stato (visto/non visto)
    localStorage.setItem(this.viewKey, JSON.stringify(filmVisti));
  }

  getWatchedMovies(): string[] {
    return Object.keys(this.getFilmVisti()).filter(movieId => this.getFilmVisti()[movieId]);
  }

  getFavoriteFilm(): Record<string, boolean> {
    const favFilm = localStorage.getItem(this.favKey);
    return favFilm ? JSON.parse(favFilm) : {};
  }

  toggleFavoriteFilm(movieId: string): void {
    const favFilm = this.getFavoriteFilm();
    favFilm[movieId] = !favFilm[movieId];
    localStorage.setItem(this.favKey, JSON.stringify(favFilm));
  }

  getFavoriteFilms(): string[] {
    return Object.keys(this.getFavoriteFilm()).filter(movieId => this.getFavoriteFilm()[movieId]);
  }
}
