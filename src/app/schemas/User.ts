import { mongoose } from "../../database";

interface IUser {
  name: string;
  password: string;
  email: string;
  avatar?: string;
  admin?: boolean;
  created_at?: Date;
  updated_at?: Date;
  id?: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const User = mongoose.model("Users", UserSchema);

export { User, IUser };
