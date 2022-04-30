/* eslint-disable semi */
import { Types } from 'mongoose';

export default interface IComment {
  _id?: Types.ObjectId;
  postId: string;
  avatar: string;
  userName: string;
  user: string;
  content: string;
}
