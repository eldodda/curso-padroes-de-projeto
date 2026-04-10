import { DbDelTask } from "../../dataSources/db/dbDelTask";
import { LogErrorMongoRepo } from "../../dataSources/db/repository/logErrorMongoRepo";
import { TaskMongoRepository } from "../../dataSources/db/repository/taskMongoRepository";
import DelTaskController from "../controllers/task/delTask";
import { LogErrorController } from "../decorators/logErrorController";
import { Controller } from "../interfaces/controller";
import { RequiredFildsValidation } from "../validations/requiredFieldsValidation";
import { DelTaskRepo } from "../../usecases/repository/delTaskRepo";

export const delTaskControllerFactory = (): Controller => {
	const taskMongoRepo = new TaskMongoRepository();
	const dbDelTask = new DbDelTask(taskMongoRepo);
	const taskController = new DelTaskController(
		dbDelTask,
		new RequiredFildsValidation("id")
	);
	const logMongoRepo = new LogErrorMongoRepo();
	return new LogErrorController(taskController, logMongoRepo);
}