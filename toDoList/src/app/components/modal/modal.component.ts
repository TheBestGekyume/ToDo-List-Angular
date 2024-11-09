import { Component, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @ViewChild('closeModalButton') closeModalButton!: ElementRef;
  @Input() taskToEdit: Task | undefined;

  newTask: Task = {
    title: '',
    description: '',
    completed: 0
  };

  constructor(private taskService: TaskService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taskToEdit'] && this.taskToEdit) {
      this.newTask = { ...this.taskToEdit };
    } else {
      this.resetForm();
    }
  }

  onSubmit() {
    if (this.taskToEdit) {
      // Garantir que estamos usando o ID da tarefa que está sendo editada
      this.newTask.id = this.taskToEdit.id;
      
      this.taskService.updateTask(this.newTask).subscribe({
        next: () => {
          this.taskService.taskUpdated.emit();
          this.resetForm();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating task', error);
        }
      });
    } else {
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