//basicamente es un mecanismo que permite exportart
//una clase que tiene un metodo start que se encarga

import { Request, Response } from "express";
const todosArray = [
  { id: 1, name: "todo1", done: false },
  { id: 2, name: "todo2", done: true },
  { id: 3, name: "todo3", done: false },
];
export class TodosController {
  //* dependency injection

  constructor() {}
  public getTodos = (req: Request, res: Response) => {
    res.json(todosArray);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ message: "id is not a number" });
    const todo = todosArray.find((todo) => todo.id === id);

    todo ? res.status(404).json(todo) : res.json({ message: "todo not found" });
  };

  public createTodo = (req: Request, res: Response) => {
    const body = req.body;
    const { name } = body;

    if (!name) return res.status(400).json({ message: "name is required" });
    const newTodo = {
      id: todosArray.length + 1,
      name,
      done: false,
    };
    todosArray.push(newTodo);
    res.json(newTodo);
    console.log("body", body);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ message: "id is not a number" });
    const todo = todosArray.find((todo) => todo.id === id);

    if (!todo) return res.status(404).json({ message: "todo not found" });
    const body = req.body;
    const { name } = body;
    if(!name) return res.status(400).json({message: "name is required"});
  
    todo.name = name || todo.name;
    todo.done = body.done || todo.done;
    res.json(todo);
  };
  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ message: "id is not a number" });
    const todoIndex = todosArray.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) return res.status(404).json({ message: "todo not found" });
    todosArray.splice(todoIndex, 1);
    res.json({ message: "todo deleted" });
  }
}
