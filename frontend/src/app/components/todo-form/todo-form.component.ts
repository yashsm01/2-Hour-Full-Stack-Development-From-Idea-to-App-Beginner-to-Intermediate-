import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Todo } from "../../models/todo";

@Component({
  selector: "app-todo-form",
  templateUrl: "./todo-form.component.html",
  styleUrls: ["./todo-form.component.scss"],
})
export class TodoFormComponent implements OnChanges {
  @Input() activeTodo: Todo | null = null;
  @Output() save = new EventEmitter<Todo>();
  @Output() cancel = new EventEmitter<void>();

  draft: Todo = { title: "", description: "", completed: false };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["activeTodo"]) {
      this.draft = this.activeTodo
        ? { ...this.activeTodo }
        : { title: "", description: "", completed: false };
    }
  }

  onSubmit(): void {
    if (!this.draft.title.trim()) {
      return;
    }
    this.save.emit({ ...this.draft });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
