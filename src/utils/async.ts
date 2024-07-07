import { Context } from "#types/shared.types.ts"
import { exception, HTTPStatus, response } from "#utils/response.ts"
import { HandlerResponse } from "hono/types"

/**********************************
 * Promise Handler Function 🔥
 * ********************************/
export function safeAsync(
  func: (ctx: Context) => HandlerResponse<typeof response | typeof exception>,
) {
  return async (context: Context) => {
    try {
      return await func(context)
    } catch (error) {
      console.log("Internal Server Request Processing Error", error)
      return exception(
        context,
        HTTPStatus.InternalServerError,
        "Internal Server Error",
      )
    }
  }
}
