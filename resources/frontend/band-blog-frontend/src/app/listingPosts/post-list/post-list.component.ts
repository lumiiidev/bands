import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PostService } from '../../post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';


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
            FormsModule,
            MatTableModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
   constructor(private postService: PostService, 
               private router: Router) {}

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
  navigateToHome(): void {
      this.router.navigate(['/posts']); // Navigates to the root path
    }

    eliminar(item: any){
      this.postService.eliminarPost(item.id).subscribe({
         next:(response:any)=>{
          this.postService.getPosts();      
        },error:(response:any)=>{
          console.log("error");
        }  
      })
    }

}
