import { Component, OnInit } from '@angular/core';
import { apiService } from '../../services/api.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent implements OnInit {
  genres: any[] = [];

  constructor(private apiService: apiService) {}

  ngOnInit(): void {
    this.apiService.getGenres().subscribe({
      next: (data) => {
        this.genres = data.genres;
      },
      error: (err) => console.error('Errore nel recupero dei generi', error),
    });
  }


  onGenreClick(genreId: number) {
    console.log('Genere selezionato:', genreId);
  }
}
