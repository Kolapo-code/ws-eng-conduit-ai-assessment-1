// article.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Article {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:4200/api/articles'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, { article });
  }
}