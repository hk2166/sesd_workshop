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
    this.initalizeRoutes();
    this.startServer();
  }

  startServer(): void {
    this.app.listen(this.PORT, () => {
      console.log(`http://localhost:${this.PORT}`);
      console.log("Server Started");
    });
  }

  initalizeRoutes(): void {
    this.app.get("/", (req, res) => {
      res.json({
        message: "ToDo API Server",
        endpoints: {
          "POST /api/task": "Create a new task",
          "GET /api/task": "Get all tasks",
        },
      });
    });

    const todoController = new ToDoController();
    this.app.use("/api", todoController.router);
    console.log("Routes Initialized");
  }
}

export { App };
