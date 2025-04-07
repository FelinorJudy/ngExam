import { Component, OnInit, Input } from '@angular/core';
import { apiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  @Input() movieId!: string;
  visto: boolean = false;
  overview: string = '';
  tagline: string = '';
  photoUrl: string = '';
  title: string = '';
  release_date: string= '';
  runtime: number=0;
  vote_average: number=0;

  constructor(
    private apiService: apiService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    // Controlla se il film è già stato visto
    this.visto = this.storageService.getFilmVisti()[this.movieId] || false;

    // Ottieni le informazioni sul film
    this.apiService.getInfoFromMovie(this.movieId).subscribe((data) => {
      this.tagline = data.tagline;
      this.photoUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
      this.overview = data.overview;
      this.title=data.title;
      this.release_date=data.release_data;
      this.runtime=data.runtime;
      this.vote_average=data.vote_average;
   });
  }

  // Funzione per segnare il film come "già visto"
  toggleVisto(): void {
    this.storageService.toggleFilmVisto(this.movieId);
    this.visto = !this.visto; // Aggiorna lo stato del pulsante
  }
}
