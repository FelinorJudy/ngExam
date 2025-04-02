import { Component, OnInit } from '@angular/core';
import { apiService } from '../../services/api.service';
import { error } from 'console';

@Component({
  selector: 'app-test',
  imports: [],
  standalone: true,
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit{
  genres: any[] = []
  constructor(private apiService: apiService) {}

  ngOnInit(): void {
      this.apiService.getGenres().subscribe(
        data => {
          this.genres = data.genres
        },
        error => console.error("fanculo", error)
      )
  } 
  
  onGenreClick(genreId: number) {
    console.log("Genere selezionato:", genreId);
  }

}
