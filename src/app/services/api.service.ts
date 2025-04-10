import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, forkJoin } from "rxjs";

@Injectable({ providedIn: 'root' })
export class apiService {

  private headers = new HttpHeaders({
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmU5OGViNTFkMjBjYmY1OTJjNjFiYzA5MTk1OTkzYyIsIm5iZiI6MTc0MzQxMzMwOS42NDYwMDAxLCJzdWIiOiI2N2VhNjAzZDcwMGE2YTk0YzZlNTgyM2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.P_uU3osJHeQKpMvKANuaE3ZJ38HFjw99YmG0FiS9uZE',
  });
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiUrlTrending = 'https://api.themoviedb.org/3/trending/movie/week';

  constructor(private http: HttpClient) { }

  getGenres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/genre/movie/list?language=en-US`, {
      headers: this.headers,
    });
  }

  getTrendingMovies(): Observable<any> {
    return this.http.get<any>(this.apiUrlTrending, { headers: this.headers });
  }

  getMoviesByGenre(genreId: string, page: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/discover/movie?with_genres=${genreId}&page=${page}`,
      { headers: this.headers }
    );
  }

  getInfoFromMovie(movieId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${movieId}?language=en-US`, { headers: this.headers })
  }

  getMovieByTitle(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie?query=${title}`, { headers: this.headers })
  }

  getMoviesByIds(movieIds: string[]): Observable<any[]> {
    const movieRequests = movieIds.map((id) => this.getInfoFromMovie(id));
    return forkJoin(movieRequests);
  }

  getTrailerById(movieId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${movieId}/videos?language=en-US`, { headers: this.headers })
  }
}
