/* eslint-disable semi */
import { Types } from 'mongoose';

export default interface IPost {
  _id?: Types.ObjectId;
  text: string;
  userName: string;
  image: string;
  avatar: string;
  user: string;
  likes?: Array<object>;
  comments?: Array<object>;
}
