export interface DelTaskModel {
	id: string;
}

export interface DelTask {
	del: (task: DelTaskModel) => Promise<Error | void>
}