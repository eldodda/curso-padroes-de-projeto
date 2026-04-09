import { type Task } from "../../entities/task";
import { type AddATaskModel, type AddTask } from "../../usecases/addTask";
import { type AddTaskRepository } from "../../usecases/repository/addTaskRepository";

export class DbAddTask implements AddTask {
  constructor (private readonly addTaskRepository: AddTaskRepository) {}

  async add (taskData: AddATaskModel): Promise<Task> {
    const task = await this.addTaskRepository.add(taskData);
    return task;
  }
}
