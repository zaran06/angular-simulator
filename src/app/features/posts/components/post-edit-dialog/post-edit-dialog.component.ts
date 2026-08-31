import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPost } from '../../interfaces/IPost';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostApiService } from '../../services/post-api.service';
import { MessageService } from '../../../../services/message.service';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent {

  private config = inject(DynamicDialogConfig);

  private ref = inject(DynamicDialogRef);

  private postApi = inject(PostApiService);

  private messageService = inject(MessageService);

  post: IPost = this.config.data;

  editForm = new FormGroup({
    title: new FormControl(this.post.title),
    tags: new FormControl(this.post.tags.join(', ')),
    views: new FormControl(this.post.views),
  });

  save(): void {
    const formValue = this.editForm.getRawValue();

    const updatedPost: IPost = {
      ...this.post,
      title: formValue.title ?? '',
      tags: (formValue.tags ?? '').split(',').map((tag) => tag.trim()),
      views: formValue.views ?? 0,
    };

    this.postApi.updatePost(this.post.id, updatedPost).subscribe({
      next: (response) => {
        this.ref.close(response);
      },

      error: (error) => {
        if (error.status < 500) {
          this.messageService.showError('Не удалось обновить пост.');
        }
      },
    });
  }

}
