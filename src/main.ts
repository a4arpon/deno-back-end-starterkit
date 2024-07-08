import { helmetConfig } from "#config/helmet.config.ts"
import { Router } from "#routes/router.ts"
import { Context, Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { secureHeaders } from "hono/secure-headers"
import mongoose, { type ConnectOptions } from "mongoose"
import { env } from "#config/env.ts"

class Bootstrap {
  public app: Hono

  constructor() {
    this.app = new Hono()
    this.middlewares()
    this.routerSetup()
    this.databaseConnection()
  }

  private middlewares() {
    this.app.use(logger())
    this.app.use(
      cors({
        origin: "*",
        credentials: true,
      }),
    )
    this.app.use(secureHeaders(helmetConfig))
  }

  private databaseConnection() {
    const options: Partial<ConnectOptions> = {
      autoIndex: false,
      retryWrites: true,
      dbName: "YOUR_DB_NAME",
      connectTimeoutMS: 12000,
    }

    mongoose
      .connect(env.MONGODB_URL, options as ConnectOptions)
      .then(() => console.log("Database Connected... 🔌⚡✅"))
      .catch((err) => {
        console.log("Database connection error", err)
        Deno.exit(1)
      })
  }

  private routerSetup() {
    this.app.get("/", (c: Context) => {
      return c.json({ msg: "Hello World, This is 🦕 Deno 🦖" })
    })
    this.app.route("/", new Router().router)
  }
}

export default { fetch: new Bootstrap().app.fetch }
