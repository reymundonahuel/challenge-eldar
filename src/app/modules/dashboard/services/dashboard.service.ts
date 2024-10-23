import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from '../../../shared/services/session/session-service.service';
import { PostsService } from '../../posts/services/posts/posts.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private readonly sessionService:SessionService, private postsService:PostsService) { }

  countTotalPosts(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.postsService.getPosts().subscribe({
        next: (posts) => resolve(posts.length),
        error: (err) => reject(err)
      });
    });
  }

}
