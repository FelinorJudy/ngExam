import { Component, OnInit } from '@angular/core';
import { apiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-watching-movie',
  imports: [SafeUrlPipe],
  templateUrl: './watching-movie.component.html',
  styleUrl: './watching-movie.component.css',
  standalone: true,
})
export class WatchingMovieComponent implements OnInit {
  videoUrl: string = '';

  constructor(private apiService: apiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        const movieId = params.get('movieId') || '';
        if (movieId) {
          this.apiService.getTrailerById(movieId).subscribe({
            next: (data) => {
              // Supponiamo che il trailer sia il primo video nella lista
              const trailer = data.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');
              if (trailer) {
                this.videoUrl = `https://www.youtube.com/embed/${trailer.key}`;
              }
            },
            error: () => {
              console.error('Errore nel recupero del trailer');
            }
          });
        }
      });
    }
  }