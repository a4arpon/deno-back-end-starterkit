import { load } from "load"

await load({ export: true })

export const env = {
  MONGODB_URL: Deno.env.get("MONGODB_URL") || "",
}
