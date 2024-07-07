import { User } from "#models/user.model.ts"
import { Context } from "#types/shared.types.ts"
import { exception, HTTPStatus } from "#utils/response.ts"
import { Next } from "hono"

declare module "hono" {
  export interface Context {
    user?: typeof User | null
  }
}

export async function authGuard(context: Context, next: Next) {
  try {
    const token = context?.req?.header("Authorization")?.split(" ")[1]
    console.log("Authorization Token", token)
    context.user = null
    return await next()
  } catch (error) {
    console.error("Pipeline Error", new Date(), error)
    return exception(
      context,
      HTTPStatus.InternalServerError,
      "Pipeline Error Occurred At The Server",
    )
  }
}
