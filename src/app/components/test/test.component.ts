import { Component, OnInit } from '@angular/core';
import { apiService } from '../../services/api.service';
import { RouterLink, RouterModule } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-test',
  imports: [RouterModule],
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
        }
      )
  } 
  
  onGenreClick(genreId: number) {
    console.log("Genere selezionato:", genreId)
  }

}
