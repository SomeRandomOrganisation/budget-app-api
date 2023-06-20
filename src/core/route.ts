import { IResponse } from "./http";

export interface IRoute {
  path: string;
  method: "get" | "post" | "put" | "patch" | "delete";
  controller: (req: any) => Promise<IResponse<any>>;
  middlewares?: any[];
}
