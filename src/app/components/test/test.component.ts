import { Component, OnInit } from '@angular/core';
import { apiService } from '../../services/api.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent implements OnInit {
  genres: any[] = [];
  randomMovie: any;

  constructor(private apiService: apiService) {}

  ngOnInit(): void {
    this.apiService.getGenres().subscribe({
      next: (data) => {
        this.genres = data.genres;
      },
      error: (err) => console.error('Errore nel recupero dei generi', error),
    });

    this.apiService.getTrendingMovies().subscribe({
      next: (data) => {
        // Seleziona un film random dalla lista dei film di tendenza
        const randomIndex = Math.floor(Math.random() * data.results.length);
        this.randomMovie = data.results[randomIndex];
      },
      error: (err) =>
        console.error('Errore nel recupero dei film di tendenza', err),
    });
  }


  onGenreClick(genreId: number) {
    console.log('Genere selezionato:', genreId);
  }
}
