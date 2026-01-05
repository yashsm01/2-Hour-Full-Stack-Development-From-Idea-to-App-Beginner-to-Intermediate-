import { Component, OnInit } from "@angular/core";
import { Todo } from "../../models/todo";
import { TodoService } from "../../services/todo.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  selectedTodo: Todo | null = null;
  isLoading = false;
  errorMessage = "";

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.isLoading = true;
    this.errorMessage = "";
    this.todoService.getTodos().subscribe({
      next: (data) => {
        this.todos = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = "Failed to load todos. Verify the API is running.";
        this.isLoading = false;
      },
    });
  }

  startCreate(): void {
    this.selectedTodo = { title: "", description: "", completed: false };
  }

  startEdit(todo: Todo): void {
    this.selectedTodo = { ...todo };
  }

  toggleComplete(todo: Todo): void {
    this.todoService
      .updateTodo(todo._id!, { completed: !todo.completed })
      .subscribe({ next: () => this.loadTodos() });
  }

  remove(todo: Todo): void {
    if (!todo._id) return;
    this.todoService.deleteTodo(todo._id).subscribe({
      next: () => this.loadTodos(),
    });
  }

  handleSave(todo: Todo): void {
    if (todo._id) {
      this.todoService.updateTodo(todo._id, todo).subscribe({
        next: () => {
          this.selectedTodo = null;
          this.loadTodos();
        },
      });
      return;
    }

    this.todoService.addTodo(todo).subscribe({
      next: () => {
        this.selectedTodo = null;
        this.loadTodos();
      },
    });
  }

  cancelEdit(): void {
    this.selectedTodo = null;
  }
}
