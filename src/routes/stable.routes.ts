import { Hono } from "hono"
import { UsersServices } from "#services/users.services.ts"
import { safeAsync } from "#utils/async.ts"
import { response } from "#utils/response.ts"
import { authGuard } from "#middlewares/auth.guard.ts"

export class StableRoutes {
  public stableRoutes: Hono
  // public stableRoutes = new Hono().use(authGuard) - use this block if you want to apply middleware on this whole route path

  constructor() {
    this.stableRoutes = new Hono()
    // Base Stable Api Response
    this.stableRoutes.get((c) => response(c, "Stable api channel"))
    // Routes
    this.stableRoutes.route("/users", this.usersRoutes())
    this.stableRoutes.route("/posts", this.postsRoutes())
  }

  protected usersRoutes() {
    const usersServicesInstance = new UsersServices()
    return new Hono()
      .get("/", safeAsync(usersServicesInstance.users))
      .post(
        "/create-user",
        authGuard,
        safeAsync(usersServicesInstance.createUser),
      )
  }

  protected postsRoutes() {
    return new Hono()
      .get(
        "/",
        (c) => c.json({ msg: "Hello world" }),
      )
  }
}
