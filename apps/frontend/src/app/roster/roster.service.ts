import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RosterService {
  private apiUrl = 'http://localhost:3000/api/roster'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getRoster(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}