import { model, Schema } from "mongoose"

export const User = model(
  "User",
  new Schema({
    name: String,
    email: String,
    phone: String,
  }, { timestamps: true }),
)
