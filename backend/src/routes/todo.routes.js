import { Router } from "express";
import {
  createTodo,
  listTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = Router();

router.post("/", createTodo);
router.get("/", listTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
