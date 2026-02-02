import express from "express";
import { ToDoController } from "./controller/todo.controller.js";

interface App_Interface {
  startServer(): void;
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
  }

  startServer(): void {
    this.app.listen(this.PORT, () => {
      console.log(`http://localhost:${this.PORT}`);
      console.log("Server Started");
    });
  }

  initalizeRoutes(): void {
    const todoController = new ToDoController();
    this.app.use("/api", todoController.router);
    console.log("Routes Initialized");
  }
}

export { App };
