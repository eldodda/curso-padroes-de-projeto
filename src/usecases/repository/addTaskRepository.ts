import { type Task } from "../../entities/task";
import { type AddATaskModel } from "../addTask";

export interface AddTaskRepository {
  add: (taskData: AddATaskModel) => Promise<Task>
}
