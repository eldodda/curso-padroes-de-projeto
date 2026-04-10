import { type Request, type Response, type Router } from "express";
import { expressRouteAdapter } from "../../../expressRouteAdapter";
import { taskControllerFactory } from "../../../factories/taskControllerFactory";
import { delTaskControllerFactory } from "../../../factories/delTaskControllerFactory";

export default (router: Router): void => {
  router
    .post("/tasks", expressRouteAdapter(taskControllerFactory()))
    .delete("/tasks", expressRouteAdapter(delTaskControllerFactory()));
}
