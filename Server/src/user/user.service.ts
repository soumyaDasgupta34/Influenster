/* eslint-disable no-await-in-loop */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
import { compare } from 'bcryptjs';
import * as userDb from './user.repository';
import { IUser } from './user.interface';
import AppError from '../middlewares/errorHandlingMiddleware';
import generateAccessToken from '../utils/generateToken';
import * as postDb from '../post/post.repository';
import * as commentDb from '../comments/comments.repository';

const matchPassword = async function (
  enteredPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return compare(enteredPassword, savedPassword);
};

export const registerUser = async (userData: IUser): Promise<any> => {
  const { email } = userData;
  const userExists = await userDb.findByEmail(email);
  if (userExists) {
    throw new AppError('User already exists', 404);
  } else {
    const user = await userDb.saveUser(userData);
    const accessToken = generateAccessToken(user._id.toString());
    return { accessToken, userId: user._id.toString() };
  }
};

export const logIn = async (email: string, password: string): Promise<any> => {
  const user = await userDb.findByEmail(email);
  if (user && (await matchPassword(password, user.password))) {
    const accessToken = generateAccessToken(user._id.toString());
    return { accessToken, userId: user._id.toString() };
  }
  throw new AppError('Password incorrect', 400);
};

export const getAllUsers = async (id: string): Promise<IUser> =>
  userDb.getAllUsers(id);

export const getUserById = async (id: string): Promise<IUser> =>
  userDb.findById(id);

export const followUser = async (
  requestedUserId: string,
  currentUserId: string,
): Promise<void> => {
  await userDb.addFollower(requestedUserId, currentUserId);
  await userDb.addFollowing(requestedUserId, currentUserId);
};

export const unfollowUser = async (
  requestedUserId: string,
  currentUserId: string,
): Promise<void> => {
  await userDb.removeFollower(requestedUserId, currentUserId);
  await userDb.removeFollowing(requestedUserId, currentUserId);
};

export const getFollowers = async (id: string): Promise<any> => {
  const currentUser = await userDb.findById(id);
  return userDb.getFollowers(currentUser.followers);
};

export const getFollowing = async (id: string): Promise<any> => {
  const currentUser = await userDb.findById(id);
  return userDb.getFollowers(currentUser.following);
};

export const searchUser = async (name: string): Promise<IUser> => {
  const userVal = new RegExp(name, 'i');
  return userDb.searchUser(userVal);
};
export const changeAvatar = async (
  id: string,
  avatar: string,
): Promise<IUser> => {
  const posts = await postDb.getPostsByUserId(id);
  for (let i = 0; i < posts.length; i += 1) {
    await postDb.avatarChange(posts[i]._id.toString(), avatar);
  }
  const comments = await commentDb.findCommetsByUserId(id);
  for (let i = 0; i < comments.length; i += 1) {
    await commentDb.avatarChange(comments[i]._id.toString(), avatar);
  }
  return userDb.changeAvatar(id, avatar);
};
