import express from "express";
import mongoose from "mongoose";
import { ToDoController } from "./controller/todo.controller.js";

const uri = "mongodb+srv://hemantk_db_user:raw%401234@cluster0.vir5ahj.mongodb.net/";

interface App_Interface {
  startServer(): void;
  connectDatabase(): void;
  initalizeRoutes(): void;
}

class App implements App_Interface {
  PORT: number;
  app: express.Application;
  constructor() {
    this.PORT = 4000;
    this.app = express();
    this.app.use(express.json());
    this.startServer();
    this.initalizeRoutes();
    this.connectDatabase();
  }

  startServer(): void {
    this.app.listen(this.PORT, () => {
      console.log(`http://localhost:${this.PORT}`);
      console.log("Server Started");
    });
  }
  async connectDatabase(): Promise<void> {
    try {
      await mongoose.connect(uri);
      console.log("Database Connected");
    } catch (err) {
      console.error("Database Connection Failed:", err);
    }
  }
  initalizeRoutes(): void {
    const todoController = new ToDoController();
    this.app.use('/api', todoController.router);
    console.log("Routes Initialized");
  }
}

export { App };
