import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class apiService {
    private apiUrlGenres = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
    constructor(private http: HttpClient) {}
    getGenres(): Observable<any> {
        return this.http.get<any>(this.apiUrlGenres)
    }
}

