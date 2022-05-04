/* eslint-disable implicit-arrow-linebreak */
import IPost from './post.interface';
import * as postDb from './post.repository';
import * as userDb from '../user/user.repository';
import * as commentDb from '../comments/comments.repository';
import { IUser } from '../user/user.interface';
import AppError from '../middlewares/errorHandlingMiddleware';

export const addPost = async (userId: string, postData: IPost) => {
  const user: IUser = await userDb.findById(userId);
  const post: IPost = await postDb.savePost(postData);
  user.posts.push(post);
  return userDb.saveUser(user);
};

export const getAllPosts = async (following, skip): Promise<Array<IPost>> =>
  postDb.getAllPosts(following, skip);

export const getPostById = async (id: string): Promise<IPost> =>
  postDb.getPostById(id);

export const getPostsByUserId = async (userId: string): Promise<Array<IPost>> =>
  postDb.getPostsByUserId(userId);

export const deletePost = async (
  postId: string,
  userId: string,
): Promise<any> => {
  const post = await postDb.getPostById(postId);
  if (userId === post.user.toString()) {
    await commentDb.deleteCommentsByPost(postId);
    return postDb.deletePost(postId);
  }
  throw new AppError('You cant delete post', 400);
};

export const editPost = async (id: string, text: string): Promise<IPost> =>
  postDb.editPost(id, text);

export const likePost = async (
  postId: string,
  userId: string,
): Promise<IPost> => postDb.likePost(postId, userId);

export const unlikePost = async (
  postId: string,
  userId: string,
): Promise<IPost> => postDb.unlikePost(postId, userId);
