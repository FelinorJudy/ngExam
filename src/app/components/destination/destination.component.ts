import { Component, HostListener, Input, OnInit } from '@angular/core';
import { apiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-destination',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './destination.component.html',
  styleUrl: './destination.component.css'
})
export class DestinationComponent implements OnInit {
  @Input() genreId!: string
  movies: any = []
  currentPage: number = 1

  constructor(private apiService: apiService) { }

  ngOnInit(): void {
    this.loadMovies()
  }

  loadMovies(): void {
    this.apiService.getMoviesByGenre(this.genreId, String(this.currentPage)).subscribe(
      data => {
        this.movies = [...this.movies, ...data.results]
      })
  }

  @HostListener('window:scroll')
  onWindowsScroll() {
    console.log('sono nello scroll')
    this.currentPage += 1
    console.log(this.currentPage)
    this.loadMovies()
  }
}


