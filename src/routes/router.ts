import { Hono } from "hono"
import { StableRoutes } from "./stable.routes.ts"

export class Router {
  public router = new Hono()

  constructor() {
    this.stable()
    this.beta()
  }

  private stable() {
    const { stableRoutes } = new StableRoutes()
    this.router.basePath("stable")
      .route("/", stableRoutes)
      .get((c) => c.json({ message: "Stable api channel" }))
  }

  private beta() {
    this.router.basePath("beta")
      .all("/", (c) => {
        return c.json({ message: "Beta channel not active yet" })
      })
  }
}
