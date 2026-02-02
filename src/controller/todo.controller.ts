import { ToDoService } from "../service/todo.service.js";
import { Router } from "express";
import type { Request, Response } from "express";

export class ToDoController {
  public router: Router;
  private toDoService: ToDoService;

  constructor() {
    this.router = Router();
    this.toDoService = new ToDoService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/task", this.createTask.bind(this));
    this.router.get("/task", this.getAllTasks.bind(this));
    this.router.patch("/task/:id", this.toggleTask.bind(this));
  }

  private async createTask(req: Request, res: Response) {
    try {
      const { title } = req.body;
      const task = await this.toDoService.createTask(title);
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Failed to create task" });
    }
  }

  private async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await this.toDoService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to get tasks" });
    }
  }

  private async toggleTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const task = await this.toDoService.toggleTaskCompletion(id);
      if (!task) {
        res.status(404).json({ error: "Task not found" });
        return;
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Failed to toggle task" });
    }
  }
}
