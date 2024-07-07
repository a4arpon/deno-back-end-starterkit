import { User } from "#models/user.model.ts"
import { exception, HTTPStatus, response } from "#utils/response.ts"
import { Context } from "hono"

export class UsersServices {
  users(ctx: Context) {
    return response(ctx, "This is a list of all users")
  }

  async createUser(ctx: Context) {
    const { name, email, phone } = await ctx.req.json()

    const previousUser = await User.findOne({ email: email }) ||
      await User.findOne({ phone: phone })

    if (previousUser) {
      return exception(
        ctx,
        HTTPStatus.Conflict,
        new Error("User already existed on this email or phone"),
      )
    }

    await User.create({
      name: name,
      email: email,
      phone: phone,
    })

    return response(ctx, "User created successfully")
  }
}
