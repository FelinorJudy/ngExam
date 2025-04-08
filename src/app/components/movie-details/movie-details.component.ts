import { Component, OnInit} from '@angular/core';
import { apiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
  imports  : [CommonModule],
})
export class MovieDetailsComponent implements OnInit {
  param: string | null = '';
  visto: boolean = false;
  favorite: boolean = false;
  overview: string = '';
  tagline: string = '';
  title: string = '';
  release_date: string = '';
  runtime: number = 0;
  vote_average: number = 0;
  backdropUrl: string = '';

  constructor(
    private apiService: apiService,
    private storageService: StorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.param = params.get('movieId');
      if (this.param) {
        this.visto = this.storageService.getFilmVisti()[this.param] || false;
        this.favorite = this.storageService.getFavoriteFilm()[this.param] || false;

        // Ottieni le informazioni sul film
        this.apiService.getInfoFromMovie(this.param).subscribe((data) => {
          this.tagline = data.tagline;
          this.overview = data.overview;
          this.title = data.title;
          this.release_date = data.release_data;
          this.runtime = data.runtime;
          this.vote_average = data.vote_average;
          this.backdropUrl = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
        });
      }
    });
  }


  ngOnChange(){
    window.location.reload();
  }


  // Funzione per segnare il film come già visto
  toggleVisto(): void {
    if (this.param) {
      this.storageService.toggleFilmVisto(this.param);
      this.visto = !this.visto; // Aggiorna il pulsante
    }
  }
  getFontSize(title: string): string { // Così possiamo modificare la dimensione del font in base alla lunghezza del titolo
    console.log('Title length: ' + title.length);   
    const length = title.length;
    if (length < 10) return '120px'; 
    if (length < 20) return '100px'; 
    if (length < 30) return '80px'; 
    return '100px'; 
  }
  toggleFavorite(): void {
    if (this.param) {
      this.storageService.toggleFavoriteFilm(this.param);
      this.favorite = !this.favorite;
    }
  }
}
