import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.css'
})
export class ErrorModalComponent {
  @Input() isOpen = false;
  @Input() errorMessage: string | null = null;
  @Output() closeModal = new EventEmitter<void>();

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
