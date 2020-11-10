import { Document, Schema, model, Model } from "mongoose";

// Interface
// https://mongoosejs.com/docs/documents.html
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  status(): () => string;
}

// Mongoose Schema
// https://mongoosejs.com/docs/guide.html
const userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true}
})

// Call to methods
userSchema.methods.status = function () {
  return `User : ${this.firstName} ${this.lastName}`;
}

// User
export const User = model<IUser, Model<IUser>>("User", userSchema);