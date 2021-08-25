import User, { UserDocument } from "../model/user.model";
import { DocumentDefinition } from "mongoose";
import { omit } from "lodash";
import { FilterQuery } from "mongoose";


export async function createUser( input: DocumentDefinition<UserDocument> ) {
  try {
    return User.create(input);
  } catch( error ) {
    throw new Error(error);
  }
}


export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query).lean(); // returns a POJO
}

interface UserValidation {
  email: UserDocument["email"],
  password: string
}


export async function validatePassword({ email, password }: UserValidation) {
  const user = await User.findOne({ email });

  if ( !user ) return false;

  const isValid = await user.comparePassword(password);

  if ( !isValid ) return false;

  return omit(user.toJSON(), "password");
} 


