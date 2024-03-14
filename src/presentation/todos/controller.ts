//basicamente es un mecanismo que permite exportart
//una clase que tiene un metodo start que se encarga

import { Request, Response } from "express";
import { prisma } from "../../postgres";
import { CreateTodoDTO } from "../../domain/DTOS/todos/create-todo.dto";
import { UpdateTodoDTO } from "../../domain/DTOS/todos/update-todo.dto";

export class TodosController {
  //* dependency injection

  constructor() {}
  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ message: "id is not a number" });
    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });

    todo
      ? res.status(200).json(todo)
      : res.status(404).json({ error: "todo not found" });
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDTO] = CreateTodoDTO.create(req.body);
    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.create({
      data: createTodoDTO!,
    });

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateToDto] = UpdateTodoDTO.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });
    if (!todo) return res.status(404).json({ error: "todo not found" });

    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: updateToDto!.values,
    });

    res.json(updatedTodo);
  };
  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ message: "id is not a number" });

    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });
    if (!todo) return res.status(404).json({ message: "todo not found" });
    const deletedTodo = await prisma.todo.delete({
      where: {
        id,
      },
    });

    deletedTodo
      ? res.status(200).json({ deletedTodo })
      : res.status(400).json({ error: "error deleting todo" });
  };
}
