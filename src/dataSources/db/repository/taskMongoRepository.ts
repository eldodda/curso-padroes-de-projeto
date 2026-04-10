import { ObjectId } from "mongodb";
import { InvalidParamError } from "../../../adapters/presentations/api/errors/invalid-param-error";
import { type Task } from "../../../entities/task";
import { type AddATaskModel } from "../../../usecases/addTask";
import { DelTaskModel } from "../../../usecases/delTask";
import { type AddTaskRepository } from "../../../usecases/repository/addTaskRepository";
import { MongoManager } from "../config/mongoManager";
import { NOTFOUND } from "dns";
import { DelTaskRepo } from "../../../usecases/repository/delTaskRepo";
import { NotFoundError } from "../../../adapters/presentations/api/errors/NotFoundError";

export class TaskMongoRepository implements AddTaskRepository, DelTaskRepo {

  async add(taskData: AddATaskModel): Promise<Task> {
    const taskCollection = MongoManager.getInstance().getCollection("tasks");
    const { insertedId } = await taskCollection.insertOne(taskData);
    const taskById = await taskCollection.findOne({ _id: insertedId });
    if (!taskById) throw new Error("Task not found.");

    const task: Task = {
      id: taskById._id.toHexString(),
      title: taskById.title,
      description: taskById.description,
      date: taskById.date,
    }
    return task;
  }

  async del(taskData: DelTaskModel): Promise<void | Error> {
    const taskCollection = MongoManager.getInstance().getCollection("tasks");

    if (!ObjectId.isValid(taskData.id)) {
      return new InvalidParamError(taskData.id);
    }

    const { deletedCount } = await taskCollection.deleteOne({
      _id: new ObjectId(taskData.id),
    });
    if (!deletedCount) return new NotFoundError("task");
  }
}
