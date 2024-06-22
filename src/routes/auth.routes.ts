import { Hono } from "@hono/hono"
import { authenticationServices } from "../services/auth/authentication.services.ts"

export const authRoutes = new Hono()

authRoutes.get("/login", authenticationServices.login)
