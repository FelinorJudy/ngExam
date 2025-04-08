import { Component, OnInit } from '@angular/core';
import { apiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.css']
})
export class FavoriteMoviesComponent implements OnInit {
  favoriteMovies: any[] = [];

  constructor(private apiService: apiService, private storageService: StorageService) {}

  ngOnInit(): void {
    const movieIds = this.storageService.getFavoriteMovies();
    if (movieIds.length > 0) {
      this.apiService.getMoviesByIds(movieIds).subscribe((movies: any[]) => {
        this.favoriteMovies = movies;
      });
    }
  }
  removeFromFavorites(movieId: string): void {
    this.storageService.toggleFilmPreferito(movieId);
    this.favoriteMovies = this.favoriteMovies.filter(movie => movie.id !== movieId);
  }
}