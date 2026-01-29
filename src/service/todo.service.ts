import { ToDoModel } from "../schema/toDo.schema.js";

export class ToDoService {
  async createTask(title: string) {
    const task = new ToDoModel({ title });
    return await task.save();
  }

  async getAllTasks() {
    return await ToDoModel.find();
  }
}


export {ToDoService};
