import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PostService } from '../../post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface Post {
  id: number;
  title: string;
  content: string;
  image: string | null;
}

@Component({
  selector: 'app-post-list',
  standalone: true, 
  imports: [MatCardModule, 
            MatButtonModule,
            CommonModule,
            FormsModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
   constructor(private postService: PostService) {}

   ngOnInit() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts.map(post => ({
        id: post.id!,
        title: post.title,
        content: post.content,
        image: post.image ? `http://127.0.0.1:8000/storage/${post.image}` : null,
      }));
      console.log('Posts loaded:', this.posts); // Debug: Check if data loads
    }, error => {
      console.error('Error fetching posts:', error); // Debug: Catch errors
    });
  }

}
