import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from '../../../../shared/services/session/session-service.service';
import { EP_POSTS } from '../../../../core/constants/endpoints.constants';
import {
  CreatePostsInterface,
  PostsInterface,
} from '../../../../core/interfaces/posts.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  getPosts() {
    return this.http.get<PostsInterface>(
      EP_POSTS.getPosts,
      this.sessionService.baseHeadersLogged
    );
  }

  createPost(post: CreatePostsInterface) {
    return this.http.post<PostsInterface>(
      EP_POSTS.postPosts,
      post,
      this.sessionService.baseHeadersLogged
    );
  }

  updatePost(post: PostsInterface) {
    return this.http.put<PostsInterface>(
      EP_POSTS.putPosts.replace(':id', String(post.id)),
      post,
      this.sessionService.baseHeadersLogged
    );
  }

  deletePost(id: number) {
    return this.http.delete(
      EP_POSTS.deletePosts.replace(':id', String(id)),
      this.sessionService.baseHeadersLogged
    );
  }
}
