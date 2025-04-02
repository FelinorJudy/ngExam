import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class apiService {
  private headers = new HttpHeaders({
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmU5OGViNTFkMjBjYmY1OTJjNjFiYzA5MTk1OTkzYyIsIm5iZiI6MTc0MzQxMzMwOS42NDYwMDAxLCJzdWIiOiI2N2VhNjAzZDcwMGE2YTk0YzZlNTgyM2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.P_uU3osJHeQKpMvKANuaE3ZJ38HFjw99YmG0FiS9uZE',
  });
  private apiUrlGenres =
    'https://api.themoviedb.org/3/genre/movie/list?language=en';

  private apiUrlTrending = 'https://api.themoviedb.org/3/trending/movie/week';

  constructor(private http: HttpClient) {}

  getGenres(): Observable<any> {
    return this.http.get<any>(this.apiUrlGenres, { headers: this.headers });
  }

  getTrendingMovies(): Observable<any> {
    return this.http.get<any>(this.apiUrlTrending, { headers: this.headers }); // Usa il Bearer Token
  }
}

