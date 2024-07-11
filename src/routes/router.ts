import { type Context, Hono } from "hono"
import { StableRoutes } from "#routes/stable.routes.ts"
import { exception, HTTPStatus } from "#utils/response.ts"

export class Router {
  public router = new Hono()

  constructor() {
    this.stable()
    this.beta()
  }

  private stable() {
    const { stableRoutes } = new StableRoutes()
    this.router.basePath("stable").route("/", stableRoutes)
  }

  private beta() {
    this.router.basePath("beta").all("/", (ctx: Context) => {
      return exception(
        ctx,
        HTTPStatus.NotFound,
        new Error("Beta channel not active yet"),
      )
    })
  }
}
