import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-post-form',
  imports: [ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatToolbarModule,
            CommonModule                      
          ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent {
   postForm: FormGroup;
  selectedFile: File | null = null;
   constructor(private fb: FormBuilder, private postService: PostService) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }
   onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
  }

  onSubmit() {
    if (this.postForm.valid) {
      const formData = new FormData();
      formData.append('title', this.postForm.get('title')!.value);
      formData.append('content', this.postForm.get('content')!.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
      this.postService.createPost(formData).subscribe({
        next: () => {
          this.postForm.reset();
          this.selectedFile = null;
          // Optionally navigate to post list or emit event
        },
        error: (err) => console.error('Error creating post:', err),
      });
    }
  }
}
