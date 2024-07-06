import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { secureHeaders } from "hono/secure-headers"
import { load } from "load"
import mongoose, { ConnectOptions } from "mongoose"
import { helmetConfig } from "./config/helmet.config.ts"
import { Router } from "./routes/router.ts"

class Bootstrap {
  public app = new Hono()

  constructor() {
    try {
      this.envLoader().then(() => {
        this.middlewares()
        this.databaseConnection()
        this.routerSetup()
        console.log("Deno Running... 🦕🦖")
      })
    } catch (error) {
      this.disconnectDB()
      console.error("Application has some runtime error : ", error)
      Deno.exit(1)
    }
  }

  private async envLoader() {
    await load({ export: true })
  }

  private middlewares() {
    this.app.use(logger())
    this.app.use(cors({
      origin: "*",
      credentials: true,
    }))
    this.app.use(secureHeaders(helmetConfig))
  }

  private async databaseConnection() {
    const options: Partial<ConnectOptions> = {
      autoIndex: false,
      retryWrites: true,
      dbName: "TestDB",
      connectTimeoutMS: 12000,
    }

    await mongoose.connect(
      Deno.env.get("MONGODB_URL") || "",
      options as ConnectOptions,
    ).then(() => console.log("Database Connected... 🔌⚡✅"))
  }

  private async disconnectDB() {
    await mongoose.disconnect()
    console.error("Database Disconnected...🔌⚡❌")
  }

  private routerSetup() {
    this.app.get("/", (c) => {
      return c.json({ msg: "Hello World, This is 🦕 Deno 🦖" })
    })

    this.app.route("/", new Router().router)
  }
}

export default { fetch: new Bootstrap().app.fetch }
