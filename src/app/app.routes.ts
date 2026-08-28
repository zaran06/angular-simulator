import { Routes } from '@angular/router';

import { postResolver } from './features/posts/resolvers/post.resolver';

import { authGuard } from './features/auth/guards/auth.guard';
import { adminGuard } from './features/auth/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home/home.component').then((module) => module.HomeComponent),
  },

  {
    path: 'users',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./pages/users/users.component').then((module) => module.UsersComponent),
  },

  {
    path: 'posts',
    canActivate: [authGuard],
    canActivateChild: [adminGuard],

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/posts/components/posts/posts.component').then(
            (module) => module.PostsComponent,
          ),
      },

      {
        path: 'create',
        loadComponent: () =>
          import('./features/posts/components/post-create/post-create.component').then(
            (module) => module.PostCreateComponent,
          ),
      },

      {
        path: ':id',
        loadComponent: () =>
          import('./features/posts/components/post-detail/post-detail.component').then(
            (module) => module.PostDetailComponent,
          ),
        resolve: {
          post: postResolver,
        },
      },
    ],
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
