import { TodoService } from "../service/todo.service.js";
import { Router} from "express";

const router = Router();
const todoService= new TodoService()
router.get("/task",todoService.getTask)