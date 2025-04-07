import { Component } from '@angular/core';
import { apiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [FormsModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  search: string = '';
  searchResults: any[] = [];

  constructor(private apiService: apiService) {}

  onSearch() {
    console.log('Ricerca:', this.search);
    this.apiService.getMovieByTitle(this.search).subscribe({
      next: (data) => {
        this.searchResults = data.results;
      },
      error: (err) => console.log('Errore nella ricerca del film'),
    });
  }

  flushResults(){
    this.search = '';
    this.searchResults = [];
    console.log(this.search,this.searchResults,"topolino")
  }
}
