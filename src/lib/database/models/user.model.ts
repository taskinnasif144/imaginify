import { model, models, Schema } from "mongoose";

export interface User {
  clerkId: string;
  username: string;
  email: string;
  photo: string;
  firstName?: string;
  lastname?: string;
  planId: string;
  creditBalance: Number;
}

const UserSchema = new Schema({
  clerkId: { type: String, requried: true, unique: true },
  username: { type: String, requried: true, unique: true },
  email: { type: String, requried: true, unique: true },
  photo: { type: String, requried: true },
  firstName: { type: String },
  lastname: { type: String },
  planId: { type: Number, default: 1 },
  creditBalance: { type: Number, default: 10 },
});

const User = models?.User || model("User", UserSchema);

export default User;
