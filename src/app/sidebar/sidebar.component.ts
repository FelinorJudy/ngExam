import { Component, OnInit } from '@angular/core';
import { apiService } from '../services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  genres: any[] = [];

  constructor(private apiService: apiService) {}

  ngOnInit(): void {
    this.apiService.getGenres().subscribe({
      next: (data) => {
        this.genres = data.genres;
      },
      error: (err) => console.log('Errore nel recupero dei generi', err),
    });

  }
}
