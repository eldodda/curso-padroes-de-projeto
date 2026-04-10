import { DelTaskModel } from "../delTask";

export interface DelTaskRepo {
	del: (taskData: DelTaskModel) => Promise<Error | void>;
}