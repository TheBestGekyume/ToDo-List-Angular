import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | undefined;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.taskService.taskUpdated.subscribe(() => {
      this.loadTasks();
      this.selectedTask = undefined;
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      }
    );
  }

  openEditModal(task: Task): void {
    this.selectedTask = { ...task };
  }

  deleteTask(task: Task): void {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.taskService.deleteTask(task).subscribe(
        () => {
          this.loadTasks();
        }
      );
    }
  }

  onTaskCompletedChange(task: Task) {
    task.completed = task.completed ? 1 : 0;
    this.taskService.updateTask(task).subscribe({
      next: () => {
        this.taskService.taskUpdated.emit();
      },
      error: (error) => {
        console.error('Error updating task', error);
        task.completed = task.completed ? 0 : 1;
      }
    });
  }
}