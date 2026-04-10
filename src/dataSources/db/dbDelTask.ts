import { DelTask, DelTaskModel } from "../../usecases/delTask";
import { DelTaskRepo } from "../../usecases/repository/delTaskRepo";

export class DbDelTask implements DelTask{
	constructor (private readonly delTaskRepo: DelTaskRepo){}
	async del(task: DelTaskModel): Promise<Error | void> {
		return await this.delTaskRepo.del(task);
	}
}