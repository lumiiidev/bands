import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private apiUrl = 'http://127.0.0.1:8000/api/posts';  // Your Laravel API

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createPost(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
  // Add updatePost(id: number, formData: FormData), deletePost(id: number)
}