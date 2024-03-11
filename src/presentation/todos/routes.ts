import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const todoConstroller = new TodosController();
    router.get("/", todoConstroller.getTodos);
    router.get("/:id", todoConstroller.getTodoById);

    router.post("/", todoConstroller.createTodo);
    router.put("/:id", todoConstroller.updateTodo);
    router.delete("/:id", todoConstroller.deleteTodo);
    return router;
  }
}
