import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { apiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';



@Component({
  selector: 'app-watched-movies',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.css']
})
export class FavoriteMoviesComponent implements OnInit {
  favFilm: any[] = [];

  constructor(private apiService: apiService, private storageService: StorageService) {}

  removeFromFavorite(movieId: string): void {
    this.storageService.toggleFavoriteFilm(movieId);
    this.favFilm = this.favFilm.filter(movie => movie.id !== movieId);
  }

  ngOnInit(): void {
    const movieIds = this.storageService.getFavoriteFilms() || [];
    if (movieIds.length > 0) {
      this.apiService.getMoviesByIds(movieIds).subscribe((movies: any[]) => {
        this.favFilm = movies || [];
      });
    }
  }
}
