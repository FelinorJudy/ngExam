import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { apiService } from '../../services/api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-destination',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './destination.component.html',
  styleUrl: './destination.component.css'
})
export class DestinationComponent implements OnInit, OnChanges {
  @Input({required: true}) genreId!: string
  movies: any = []
  currentPage: number = 1
  isLoading: boolean = false

  constructor(private apiService: apiService) { }

  ngOnInit(): void {
    this.loadMovies()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['genreId']) {
      this.genreId = changes['genreId'].currentValue;
      this.currentPage = 1; // 
      this.movies = []; 
      this.loadMovies(); 
    }
  }

  loadMovies(): void {
    console.log('Loading movies...');
    if (!this.isLoading) {
      this.isLoading = true
      this.apiService.getMoviesByGenre(this.genreId, String(this.currentPage)).subscribe(
        data => {
          this.isLoading = false
          this.movies.push(...data.results);
        },
      );
    }
  }

  @HostListener('window:scroll')
  onWindowsScroll() {
    console.log('Scroll event triggered!');
    const scrollOffset = 200;
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - scrollOffset && !this.isLoading) {
      this.isLoading = true
      this.currentPage++;
      this.apiService.getMoviesByGenre(this.genreId, String(this.currentPage)).subscribe(
        data => {
          this.isLoading = false
          this.movies.push(...data.results);
        })
    }
  }
}
