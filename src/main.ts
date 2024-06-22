import { Context, Hono } from "jsr:@hono/hono"
import { cors } from "jsr:@hono/hono/cors"
import { csrf } from "jsr:@hono/hono/csrf"
import { logger } from "jsr:@hono/hono/logger"
import { secureHeaders } from "jsr:@hono/hono/secure-headers"

const app = new Hono()
  .use(logger())
  .use(
    cors({
      origin: "*",
      credentials: true,
    }),
  )
  .use(csrf({ origin: "http://localhost:4000" }))
  .use(
    secureHeaders({
      contentSecurityPolicy: {
        baseUri: ["'self'"],
      },
      xXssProtection: "1; mode=block",
      xFrameOptions: "DENY",
      xContentTypeOptions: "nosniff",
    }),
  )

app.get("/", (c: Context) => c.text("Hono!"))

export default app
