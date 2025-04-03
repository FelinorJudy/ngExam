import { Component, OnInit } from '@angular/core';
import { apiService } from '../../services/api.service';
import { RouterLink, RouterModule } from '@angular/router';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test',
  imports: [CommonModule, RouterModule, FormsModule],
  standalone: true,
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent implements OnInit {
  genres: any[] = [];
  randomMovie: any;
  search: string = '';
  searchResults: any[] = [];

  constructor(private apiService: apiService) {}

  ngOnInit(): void {
    this.apiService.getGenres().subscribe({
      next: (data) => {
        this.genres = data.genres;
      },
      error: (err) => console.log('Errore nel recupero dei generi'),
    });

    this.apiService.getTrendingMovies().subscribe({
      next: (data) => {
        // Seleziona un film random dalla lista dei film di tendenza
        const randomIndex = Math.floor(Math.random() * data.results.length);
        this.randomMovie = data.results[randomIndex];
      },
      error: (err) =>
        console.log('Errore nel recupero dei film di tendenza'),
    });
  }


  onGenreClick(genreId: number) {
    console.log('Genere selezionato:', genreId);
  }

  onSearch() {
    console.log('Ricerca:', this.search);
    this.apiService.getMovieByTitle(this.search).subscribe({
      next: (data) => {
        console.log('Risultati della ricerca:', data.results);
        this.searchResults = data.results;
      },
      error: (err) => console.log('Errore nella ricerca del film'),
    });
  }
}

