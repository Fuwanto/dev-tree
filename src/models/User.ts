import mongoose, { Schema, trusted } from "mongoose"

export interface IUser {
  name: String
  email: String
  password: String
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
})

const User = mongoose.model<IUser>("User", UserSchema)

export default User
