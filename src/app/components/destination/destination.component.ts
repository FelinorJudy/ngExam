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
  isLoading: boolean = false

  constructor(private apiService: apiService) { }

  ngOnInit(): void {
    this.loadMovies()
  }

  loadMovies(): void {
    console.log('Loading movies...');
    if (!this.isLoading) {
      this.isLoading = true
      this.apiService.getMoviesByGenre(this.genreId, String(this.currentPage)).subscribe(
        data => {
          this.movies.push(...data.results);
        },
      );
    }
  }

  @HostListener('window:scroll')
  onWindowsScroll() {
    console.log('Scroll event triggered!');
    const scrollOffset = 200;
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - scrollOffset) {
      this.apiService.getMoviesByGenre(this.genreId, String(this.currentPage)).subscribe(
        data => {
          this.movies.push(...data.results);
          this.currentPage++;
        })
    }
  }
}