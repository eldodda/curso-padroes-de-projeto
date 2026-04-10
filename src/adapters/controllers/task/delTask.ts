import { Controller } from "../../interfaces/controller";
import { DelTask } from "../../../usecases/delTask";
import { Validation } from "../../interfaces/validation"
import { HttpRequest, HttpResponse } from "../../interfaces/http";
import { serverError, badRequest, noContent } from "../../presentations/api/httpResponses/httpResponses";

export default class DelTaskController implements Controller {
	constructor(
		private readonly delTask: DelTask,
		private readonly validation: Validation
	) { }

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { id } = httpRequest.body;
			const isValid = this.validation.validate({ id });
			if (isValid) {
				return badRequest(isValid);
			}

			const error = await this.delTask.del({ id });
			if (error) {
				return badRequest(error)
			}

			return noContent();
		} catch (error: any) {
			return serverError(error);
		}
	}
}