import { log } from "console";
import { Controller } from "../interfaces/controller";
import { HttpRequest, HttpResponse } from "../interfaces/http";
import { LogErrorRepo } from "../../usecases/repository/logErroRepo";

export class LogErrorController implements Controller{
	constructor(private readonly controller: Controller, private readonly logErrorRepo: LogErrorRepo) {}
	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const httpResponse = await this.controller.handle(httpRequest);
		if (httpResponse.statusCode==500){
			await this.logErrorRepo.log(httpResponse.body.stack);
		}
		return httpResponse;
	}
}