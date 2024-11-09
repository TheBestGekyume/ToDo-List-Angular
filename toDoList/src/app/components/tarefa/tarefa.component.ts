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
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      }
    );
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe(
      () => {
        this.loadTasks();
      }
    );
  }

  openEditModal(task:Task): void {
    console.log("teste " + this.selectedTask);
    this.selectedTask = { ...task };
    
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