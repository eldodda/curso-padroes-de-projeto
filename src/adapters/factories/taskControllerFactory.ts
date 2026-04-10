import { DbAddTask } from "../../dataSources/db/dbAddTask";
import { LogErrorMongoRepo } from "../../dataSources/db/repository/logErrorMongoRepo";
import { TaskMongoRepository } from "../../dataSources/db/repository/taskMongoRepository";
import { AddTaskController } from "../controllers/task/addTask";
import { LogErrorController } from "../decorators/logErrorController";
import { addTaskValidationCompositeFactory } from "./addTaskValidationCompositeFactory";

export const taskControllerFactory = () => {
  const taskMongoRepository = new TaskMongoRepository();
  const dbAddTask = new DbAddTask(taskMongoRepository);
  const taskController = new AddTaskController(dbAddTask, addTaskValidationCompositeFactory());
  const logErrorMongoRepo = new LogErrorMongoRepo;
  return new LogErrorController(taskController, logErrorMongoRepo);
}