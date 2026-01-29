import {Schema, model} from 'mongoose';

const ToDoSchema = new Schema({title:String})

const ToDoModel = model("task",ToDoSchema)


export {ToDoModel};