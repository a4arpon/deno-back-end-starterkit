import { Hono } from "hono"
import { UsersServices } from "../services/users.services.ts"

export class StableRoutes {
  public stableRoutes = new Hono()

  constructor() {
    this.usersRoutes()
  }

  private usersRoutes() {
    const usersServices = new UsersServices()
    this.stableRoutes.basePath("users")
      .get("/", usersServices.users)
      .post("/create-user", usersServices.createUser)
  }
}
