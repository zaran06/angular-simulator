import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPostResponse } from '../interfaces/IPostResponse';
import { IPost } from '../interfaces/IPost';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  private http = inject(HttpClient);

  private readonly apiURL = 'https://dummyjson.com/posts';

  getPosts(limit: number, skip: number) {
    return this.http.get<IPostResponse>(this.apiURL, {
      params: {
        limit,
        skip,
      },
    });
  }

  getPostById(id: number) {
    return this.http.get<IPost>(`${ this.apiURL }/${ id }`);
  }

  addPost(post: IPost) {
    return this.http.post<IPost>(`${ this.apiURL }/add`, post);
  }

  updatePost(id: number, post: IPost) {
    return this.http.put<IPost>(`${ this.apiURL }/${ id }`, post);
  }

  deletePost(id: number) {
    return this.http.delete<IPost>(`${ this.apiURL }/${ id }`);
  }

}
