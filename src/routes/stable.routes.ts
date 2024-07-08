import { Hono } from "hono"
import { UsersServices } from "#services/users.services.ts"
import { safeAsync } from "#utils/async.ts"
import { response } from "#utils/response.ts"
import { authGuard } from "#middlewares/auth.guard.ts"

export class StableRoutes {
  public stableRoutes = new Hono()
  // public stableRoutes = new Hono().use(authGuard) - use this block if you want to apply middleware on this whole route path

  constructor() {
    // Base Stable Api Response
    this.stableRoutes.get((c) => response(c, "Stable api channel"))
    console.log(Deno.env.get("ENVC"))
    this.usersRoutes()
  }

  private usersRoutes() {
    const usersServices = new UsersServices()
    // https://localhost:4000/stable/users/*
    this.stableRoutes
      .basePath("users")
      .get("/", safeAsync(usersServices.users))
      .post("/create-user", authGuard, safeAsync(usersServices.createUser))
    // .patch('/')
    // .put('/')
    // .delete('/')
  }
}
