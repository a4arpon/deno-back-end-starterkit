import { Context } from "hono"
import { User } from "../models/user.model.ts"

export class UsersServices {
  users(ctx: Context) {
    return ctx.json({ message: "This is a list of all users" })
  }

  async createUser(ctx: Context) {
    const { name, email, phone } = await ctx.req.json()

    const previousUser = await User.findOne({ email: email }) ||
      await User.findOne({ phone: phone })

    if (previousUser) {
      return ctx.json({
        message: "User already existed on this email or phone",
      })
    }

    await User.create({
      name: name,
      email: email,
      phone: phone,
    })

    return ctx.json({
      message: "User created successfully",
    })
  }
}
