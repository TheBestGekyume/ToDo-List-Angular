import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://projeto-modulo-5-v47m.onrender.com/api/tasks';
  taskUpdated = new EventEmitter<void>();

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTask(task: Task): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/${task.id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${task.id}`);
  }
  
}