import { Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { DestinationComponent } from './components/destination/destination.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { WatchedMoviesComponent } from './components/watched-movies/watched-movies.component';


export const routes: Routes = [
    {path: '', title: "Home", component: TestComponent},
    {path: 'movies/:genreId', component: DestinationComponent},
    {path: 'movie/:movieId', component: MovieDetailsComponent},
    {path: 'watched', component: WatchedMoviesComponent}
];
