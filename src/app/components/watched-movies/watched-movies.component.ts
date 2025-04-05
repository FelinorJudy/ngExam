import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common'; // <-- Aggiunto qui
import { apiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';



@Component({
  selector: 'app-watched-movies',
  standalone: true, // <-- Assicurati che ci sia!
  imports: [NgIf, NgFor], // <-- Aggiunto qui
  templateUrl: './watched-movies.component.html',
  styleUrls: ['./watched-movies.component.css']
})
export class WatchedMoviesComponent implements OnInit {
  watchedMovies: any[] = [];

  constructor(private apiService: apiService, private storageService: StorageService) {}

  removeFromWatched(movieId: string): void {
    this.storageService.toggleFilmVisto(movieId);
    this.watchedMovies = this.watchedMovies.filter(movie => movie.id !== movieId);
  }

  ngOnInit(): void {
    const movieIds = this.storageService.getWatchedMovies() || [];
    if (movieIds.length > 0) {
      this.apiService.getMoviesByIds(movieIds).subscribe((movies: any[]) => {
        this.watchedMovies = movies || [];
      });
    }
  }
}
