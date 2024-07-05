import { Hono } from "@hono/hono"

export const v1Router = new Hono()

v1Router.get("/", (c) => c.json({ message: "response from v1 router" }))

v1Router.get("/products", async (c) => {
  const products = await fetch("https://dummyjson.com/products").then((res) =>
    res.json()
  )
  const categories = await fetch("https://dummyjson.com/products/categories")
    .then((res) => res.json())
  const comments = await fetch("https://dummyjson.com/comments")
    .then((res) => res.json())
  return c.json({
    products,
    categories: categories || null,
    comments: comments || null,
  })
})
