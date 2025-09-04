import { Routes } from '@angular/router';
import { PostFormComponent } from './createEditPosts/post-form/post-form.component';
import { PostListComponent } from './listingPosts/post-list/post-list.component';

export const routes: Routes = [
    {path: '', redirectTo: 'redirect', pathMatch: 'full'},

    {path: 'posts', component: PostFormComponent },
    {path: 'lists', component: PostListComponent },    
    
    {path: '**', redirectTo: 'redirect'}
    
]
