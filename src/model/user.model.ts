import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
  email: string,
  name: string,
  password: string,
  createdAt: Date,
  updatedAt: Date,
  comparePassword(password: string): Promise<boolean>
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

UserSchema.pre("save", function(next: mongoose.HookNextFunction) {
  const user = this as UserDocument;

  if ( !user.isModified("password") ) return next();

  const salt = bcrypt.genSaltSync(config.get("saltWorkFactor"));

  const hash = bcrypt.hashSync(user.password, salt);

  // Replace the password with the hash
  user.password = hash;

  return next();
})

UserSchema.methods.comparePassword = async function(password: string) {
  // alias
  const user = this as UserDocument;

  try {
    return await bcrypt.compare(password, user.password);
  } catch(error) {
    return false;
  }
}

const User = mongoose.model<UserDocument>("User", UserSchema);


export default User;