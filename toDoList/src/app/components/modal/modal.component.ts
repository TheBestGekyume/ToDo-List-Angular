import { Component, ViewChild, ElementRef } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @ViewChild('closeModalButton') closeModalButton!: ElementRef;

  newTask: Task = {
    title: '',
    description: '',
    completed: 0
  };

  constructor(private taskService: TaskService) {}

  onSubmit() {
    this.taskService.createTask(this.newTask).subscribe({
      next: () => {
        this.taskService.taskUpdated.emit();
        this.resetForm();
        this.closeModal();
      },
      error: (error) => {
        console.error('Error creating task', error);
      }
    });
  }

  private resetForm() {
    this.newTask = {
      title: '',
      description: '',
      completed: 0
    };
  }

  private closeModal() {
    this.closeModalButton.nativeElement.click();
  }
}
