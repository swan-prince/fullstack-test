import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IPost } from '../../models/post.model';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-post-card',
  imports: [CommonModule],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css',
})
export class PostCard {
  @Input() content!: IPost;
  @Output() liked = new EventEmitter<void>();

  imgIndex = 0;

  onLike() {
    this.liked.emit();
  }

  onSkip() {
    this.imgIndex += 1
  }
}
