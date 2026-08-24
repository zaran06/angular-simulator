import { Routes } from '@angular/router';
import { postResolver } from './features/posts/resolvers/post.resolver';
import { authGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home/home.component').then((module) => module.HomeComponent),
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/users/users.component').then((module) => module.UsersComponent),
  },
  {
    path: 'posts',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/posts/components/posts/posts.component').then(
        (module) => module.PostsComponent,
      ),
  },
  {
    path: 'posts/create',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/posts/components/post-create/post-create.component').then(
        (module) => module.PostCreateComponent,
      ),
  },
  {
    path: 'posts/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/posts/components/post-detail/post-detail.component').then(
        (module) => module.PostDetailComponent,
      ),
    resolve: {
      post: postResolver,
    },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login.component').then(
        (module) => module.LoginComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((module) => module.NotFoundComponent),
  },
];
