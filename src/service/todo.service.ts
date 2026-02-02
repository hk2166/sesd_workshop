import fs from "fs/promises";
import path from "path";
import type { ToDo } from "../schema/toDo.schema.js";

const TASKS_FILE = path.join(process.cwd(), "task.json");

export class ToDoService {
  async createTask(title: string): Promise<ToDo> {
    let tasks: ToDo[] = [];
    try {
      const data = await fs.readFile(TASKS_FILE, "utf-8");
      tasks = JSON.parse(data);
    } catch (error) {
      tasks = [];
    }

    const newTask: ToDo = {
      id: Date.now().toString(),
      title,
      completed: false,
    };

    tasks.push(newTask);
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
    return newTask;
  }

  async getAllTasks(): Promise<ToDo[]> {
    try {
      const data = await fs.readFile(TASKS_FILE, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async toggleTaskCompletion(id: string): Promise<ToDo | null> {
    try {
      const data = await fs.readFile(TASKS_FILE, "utf-8");
      const tasks: ToDo[] = JSON.parse(data);
      const task = tasks.find((t) => t.id === id);

      if (!task) return null;

      task.completed = !task.completed;
      await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
      return task;
    } catch (error) {
      return null;
    }
  }
}
