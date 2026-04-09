import { type Task } from "../../../entities/task";
import { type AddATaskModel } from "../../../usecases/addTask";
import { type AddTaskRepository } from "../../../usecases/repository/addTaskRepository";

export class TaskMongoRepository implements AddTaskRepository {
  async add (taskData: AddATaskModel): Promise<Task> {
    throw new Error("Method not implemented.");
  }
}
