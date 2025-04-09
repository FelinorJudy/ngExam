import { Component, OnInit } from '@angular/core';
import { apiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
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
  randomMovie: any;
  search: string = '';
  searchResults: any[] = [];
  randomMovieId: any;
  moviePoster: string = '';
  backdropUrl: string = '';

  constructor(private apiService: apiService) { }

  ngOnInit(): void {
    this.apiService.getTrendingMovies().subscribe({
      next: (data) => {
        // Seleziona un film random dalla lista dei film di tendenza
        const randomIndex = Math.floor(Math.random() * data.results.length);
        this.randomMovie = data.results[randomIndex];
        this.randomMovieId = this.randomMovie.id;

        this.apiService.getInfoFromMovie(this.randomMovieId).subscribe({
          next: (data) => {
            this.backdropUrl = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
          },
          error: (err) => console.log(this.randomMovieId),
        });
      },
      error: (err) =>
        console.log('Errore nel recupero dei film di tendenza', err),
    });

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

