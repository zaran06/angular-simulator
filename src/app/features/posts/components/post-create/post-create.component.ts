import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostApiService } from '../../services/post-api.service';
import { IPost } from '../../interfaces/IPost';
import { MessageService } from '../../../../services/message.service';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  private postApi = inject(PostApiService);

  private router = inject(Router);

  private messageService = inject(MessageService);

  createForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
    tags: new FormControl(''),
    views: new FormControl(0),
    userId: new FormControl(1),
    likes: new FormControl(0),
    dislikes: new FormControl(0),
  });

  createPost(): void {
    const formValue = this.createForm.getRawValue();

    const newPost: IPost = {
      id: 0,
      title: formValue.title ?? '',
      body: formValue.body ?? '',
      tags: (formValue.tags ?? '').split(',').map((tag) => tag.trim()),
      reactions: {
        likes: formValue.likes ?? 0,
        dislikes: formValue.dislikes ?? 0,
      },
      views: formValue.views ?? 0,
      userId: formValue.userId ?? 1,
    };

    this.postApi.addPost(newPost).subscribe({
      next: () => {
        this.router.navigate(['/posts']);
      },
      error: (error) => {
        if (error.status < 500) {
          this.messageService.showError('Не удалось создать пост.');
        }
      },
    });
  }

}
