import { Context } from "hono"

export class UsersServices {
  users(ctx: Context) {
    return ctx.json({ message: "This is a list of all users" })
  }
}
