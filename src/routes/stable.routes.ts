import { UsersServices } from "#services/users.services.ts"
import { Context } from "#types/shared.types.ts"
import { safeAsync } from "#utils/async.ts"
import { response } from "#utils/response.ts"
import { Hono } from "hono"

export class StableRoutes {
  public stableRoutes = new Hono()

  constructor() {
    // Base Stable Api Response
    this.stableRoutes.get((c: Context) => response(c, "Stable api channel"))

    // User Api Routes Here
    this.usersRoutes()
  }

  private usersRoutes() {
    const usersServices = new UsersServices()
    // https://localhost:4000/stable/users/*
    this.stableRoutes.basePath("users")
      .get("/", safeAsync(usersServices.users))
      .post("/create-user", safeAsync(usersServices.createUser))
    // .patch('/')
    // .put('/')
    // .delete('/')
  }
}
