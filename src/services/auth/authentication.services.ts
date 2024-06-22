import { Context } from "@hono/hono"

class AuthenticationServices {
  async login(ctx: Context) {
    const body = ctx.req.query() || await ctx.req.json()

    return ctx.json({ body })
  }
}

export const authenticationServices = new AuthenticationServices()
