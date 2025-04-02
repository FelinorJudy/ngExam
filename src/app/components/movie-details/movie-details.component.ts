import { Component, OnInit, Input} from '@angular/core';
import { apiService } from '../../services/api.service';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  @Input() movieId! : string

  tagline: string = ''
  photoUrl: string = ''

  constructor(private apiService : apiService) {}
  ngOnInit(): void {
    this.apiService.getInfoFromMovie(this.movieId).subscribe(
      data => {
        this.tagline = data.tagline
        this.photoUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`
      }
    )
  }

}
