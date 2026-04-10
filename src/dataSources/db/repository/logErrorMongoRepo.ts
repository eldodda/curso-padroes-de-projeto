import { LogErrorRepo } from "../../../usecases/repository/logErroRepo";
import { MongoManager } from "../config/mongoManager";

export class LogErrorMongoRepo implements LogErrorRepo {
	async log(stack: string): Promise<void> {
		const logErrorCollection = MongoManager.getInstance().getCollection("errors");
		await logErrorCollection.insertOne({ stack, date: new Date() });
	}
}