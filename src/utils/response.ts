import { Context } from "#types/shared.types.ts"
import { StatusCode } from "hono/utils/http-status"

export function response(
  context: Context,
  message: string,
  data?: string | object | [] | boolean,
  extra?: object,
  success?: boolean,
) {
  return context.json({
    success: success || true,
    message,
    ...extra,
    data,
  })
}

export function exception(context: Context, status: number, error: unknown) {
  if (status && error instanceof Error) {
    context.status(status as StatusCode)
    return context.json({
      success: false,
      status: status,
      message: error.message,
    })
  }
  context.status(500)
  return context.json({
    success: false,
    status: 500,
    message: "Internal Server Error",
  })
}

/**********************************
 * HTTP Status Codes 🔥
 * ********************************/
export const HTTPStatus = {
  OK: 200, // OK (Successful)
  MovedPermanently: 301, // Moved Permanently (Redirection)
  BadRequest: 400, // Bad Request (Client Error)
  Unauthorized: 401, // Unauthorized (Client Error)
  Forbidden: 403, // Forbidden (Client Error)
  NotFound: 404, // Not Found (Client Error)
  Conflict: 409, // Conflict (Client Error)
  InternalServerError: 500, // Internal Server Error (Server Error)
  ServiceUnavailable: 503, // Service Unavailable (Server Error)
}
