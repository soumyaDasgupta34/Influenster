import { Types } from 'mongoose';

export interface IUser {
  _id?: Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  avatar?: string;
  following?: Array<object>;
  followers?: Array<object>;
  posts?: Array<object>;
}
