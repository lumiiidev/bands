import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

interface Post {
  id?: number;
  title: string;
  content: string;
  image?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://127.0.0.1:8000/api/posts'; // Adjust if using Laragon virtual host

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<{ status: number; message: string; data: Post[] }>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  createPost(formData: FormData): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, formData);
  }

   eliminarPost(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + "/" + id);
  }

}