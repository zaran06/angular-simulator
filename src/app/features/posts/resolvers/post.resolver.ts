import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PostApiService } from '../services/post-api.service';
import { IPost } from '../interfaces/IPost';

export const postResolver: ResolveFn<IPost> = (route) => {
  const id = route.paramMap.get('id');
  const postId = Number(id);

  const postApi = inject(PostApiService);

  return postApi.getPostById(postId);
};
