import { Component, inject, OnInit } from '@angular/core';
import { PostApiService } from '../../services/post-api.service';
import { IPost } from '../../interfaces/IPost';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { finalize } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { MessageService } from '../../../../services/message.service';

@Component({
  selector: 'app-posts',
  imports: [TableModule, PaginatorModule, SkeletonModule, ContextMenuModule, DynamicDialogModule],
  providers: [DialogService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {

  private postApi = inject(PostApiService);

  private router = inject(Router);

  private dialogService = inject(DialogService);

  private messageService = inject(MessageService);

  posts: IPost[] = [];

  total = 0;

  rows = 10;

  first = 0;

  loading = false;

  selectedPost: IPost | null = null;

  menuItems: MenuItem[] = [
    {
      label: 'View',
      command: () => {
        if (this.selectedPost) {
          this.router.navigate(['/posts', this.selectedPost.id]);
        }
      },
    },
    {
      label: 'Edit',
      command: () => {
        this.openEditDialog();
      },
    },
    {
      label: 'Delete',
      command: () => {
        this.deletePost();
      },
    },
  ];

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;

    this.postApi
      .getPosts(this.rows, this.first)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((response) => {
        this.posts = response.posts;
        this.total = response.total;
      });
  }

  onTableLazyLoad(event: TableLazyLoadEvent): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;

    this.loadPosts();
  }

  openEditDialog(): void {
    if (!this.selectedPost) {
      return;
    }

    const ref = this.dialogService.open(PostEditDialogComponent, {
      header: 'Edit post',
      width: '500px',
      data: this.selectedPost,
    });

    if (!ref) {
      return;
    }

    ref.onClose.subscribe((updatedPost: IPost | undefined) => {
      if (!updatedPost) {
        return;
      }

      this.posts = this.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post));
    });
  }

  deletePost(): void {
    if (!this.selectedPost) {
      return;
    }

    const postId = this.selectedPost.id;

    this.postApi.deletePost(postId).subscribe({
      next: () => {
        this.posts = this.posts.filter((post) => post.id !== postId);
      },

      error: (error) => {
        if (error.status < 500) {
          this.messageService.showError('Не удалось удалит пост.');
        }
      },
    });
  }

}
