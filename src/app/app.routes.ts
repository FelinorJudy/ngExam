import { Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { DestinationComponent } from './components/destination/destination.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { WatchedMoviesComponent } from './components/watched-movies/watched-movies.component';
import { FavoriteMoviesComponent } from './components/favorite-movies/favorite-movies.component';
import { WatchingMovieComponent } from './components/watching-movie/watching-movie.component';


export const routes: Routes = [
    {path: '', title: "Home", component: TestComponent},
    {path: 'movies/:genreId', component: DestinationComponent},
    {path: 'movie/:movieId', component: MovieDetailsComponent},
    {path: 'watched', component: WatchedMoviesComponent},
    {path: 'favorites', component: FavoriteMoviesComponent},
    {path: 'watching/:movieId', component: WatchingMovieComponent}
]
