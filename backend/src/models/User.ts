import bcrypt from "bcryptjs";
import { HydratedDocument, Model, Schema, model } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  AUTHOR = "AUTHOR"
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

export type UserDocument = HydratedDocument<IUser, IUserMethods>;

export interface UserModel extends Model<IUser, object, IUserMethods> {}

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.ADMIN
    },

    avatar: {
      type: String,
      default: ""
    },

    isActive: {
      type: Boolean,
      default: true
    },

    lastLogin: {
      type: Date
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

/**
 * Hash password before saving
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

/**
 * Compare password
 */
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User =
  (globalThis as any).UserModel ||
  model<IUser, UserModel>("User", userSchema);

(globalThis as any).UserModel = User;

export default User;