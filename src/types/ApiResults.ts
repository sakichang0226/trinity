import { ErrorResponse } from "./Error";
import { SuccessResponse } from "./SuucessResponse";

export type Result<T = unknown, E extends Error = Error> = 
| SuccessResponse<T> 
| ErrorResponse<E>;
