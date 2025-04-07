import { Component, OnInit, Input } from '@angular/core';
import { apiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { NavbarComponent } from "../../navbar/navbar.component";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  visto: boolean = false;
  overview: string = '';
  tagline: string = '';
  photoUrl: string = '';
  param: string | null = '';
  title: string = '';
  release_date: string = '';
  runtime: number = 0;
  vote_average: number = 0;

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

        // Ottieni le informazioni sul film
        this.apiService.getInfoFromMovie(this.param).subscribe((data) => {
          this.tagline = data.tagline;
          this.photoUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
          this.overview = data.overview;
          this.title = data.title;
          this.release_date = data.release_data;
          this.runtime = data.runtime;
          this.vote_average = data.vote_average;
        });
      }
    });
  }


  ngOnChange(){
    window.location.reload();
  }


  // Funzione per segnare il film come "già visto"
  toggleVisto(): void {
    if (this.param) {
      this.storageService.toggleFilmVisto(this.param);
      this.visto = !this.visto; // Aggiorna lo stato del pulsante
    }
  }
}
