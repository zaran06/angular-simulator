import { Routes } from '@angular/router';
import { postResolver } from './features/posts/resolvers/post.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((module) => module.HomeComponent),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users.component').then((module) => module.UsersComponent),
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./features/posts/components/posts/posts.component').then(
        (module) => module.PostsComponent,
      ),
  },
  {
    path: 'posts/create',
    loadComponent: () =>
      import('./features/posts/components/post-create/post-create.component').then(
        (module) => module.PostCreateComponent,
      ),
  },
  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./features/posts/components/post-detail/post-detail.component').then(
        (module) => module.PostDetailComponent,
      ),
    resolve: {
      post: postResolver,
    },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((module) => module.NotFoundComponent),
  },
];
