/* eslint-disable implicit-arrow-linebreak */
import { Schema, model } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: [true, 'User name must be provided'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email id must be provided'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password must be provided'],
      trim: true,
    },
    avatar: {
      type: String,
      default: 'default.jpg',
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  { collection: 'user' },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

const UserModel = model<IUser>('user', userSchema);

export const findById = async (id: string): Promise<IUser> =>
  UserModel.findById(id).select('-password').populate('posts');

export const saveUser = async (userData: IUser): Promise<IUser> =>
  UserModel.create(userData);

export const findByEmail = async (userEmail: string): Promise<IUser> =>
  UserModel.findOne({ email: userEmail });

export const getAllUsers = async (id: string): Promise<any> =>
  UserModel.find({ _id: { $ne: id } });

export const addFollower = async (
  requestedUserId: string,
  currentUserId: string,
): Promise<IUser> =>
  UserModel.findOneAndUpdate(
    { _id: requestedUserId },
    { $addToSet: { followers: currentUserId } },
  );

export const addFollowing = async (
  requestedUserId: string,
  currentUserId: string,
): Promise<IUser> =>
  UserModel.findOneAndUpdate(
    { _id: currentUserId },
    { $addToSet: { following: requestedUserId } },
  );

export const removeFollower = async (
  requestedUserId: string,
  currentUserId: string,
): Promise<IUser> =>
  UserModel.findOneAndUpdate(
    { _id: requestedUserId },
    { $pull: { followers: currentUserId } },
  );

export const removeFollowing = async (
  requestedUserId: string,
  currentUserId: string,
): Promise<IUser> =>
  UserModel.findOneAndUpdate(
    { _id: currentUserId },
    { $pull: { following: requestedUserId } },
  );

export const getFollowers = async (id: any): Promise<any> =>
  UserModel.find({ _id: { $in: id } }).select('-password');

export const searchUser = async (name: any): Promise<any> =>
  UserModel.findOne({ userName: { $regex: name } });

export const changeAvatar = async (
  id: string,
  avatar: string,
): Promise<IUser> =>
  UserModel.findOneAndUpdate({ _id: id }, { avatar }, { new: true });

export default UserModel;
