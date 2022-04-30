/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import * as postService from './post.service';
import catchAsync from '../utils/catchAsync';
import AppError from '../middlewares/errorHandlingMiddleware';
import IPost from './post.interface';

export const addPost = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError('Please upload image', 400);
  }
  const { text } = req.body;
  const postData = {
    text,
    userName: req.user.userName,
    image: req.file.filename,
    avatar: req.user.avatar,
    user: req.user._id.toString(),
  };
  await postService.addPost(req.user._id.toString(), postData);
  return res.status(201).json({
    status: 'success',
    message: 'Post created',
  });
});

export const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const posts = await postService.getAllPosts([
    ...req.user.following,
    req.user._id,
  ]);
  return res.status(200).json({
    status: 'success',
    data: posts,
  });
});

export const getPostById = catchAsync(async (req: Request, res: Response) => {
  const post: IPost = await postService.getPostById(req.params.id);
  return res.status(200).json({
    status: 'success',
    data: post,
  });
});

export const getPostsByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const postsArray: Array<IPost> = await postService.getPostsByUserId(
      req.params.id,
    );
    return res.status(200).json({
      status: 'success',
      data: postsArray,
    });
  },
);

export const likePost = catchAsync(async (req: Request, res: Response) => {
  await postService.likePost(req.body.id, req.user._id.toString());
  return res.status(200).json({
    status: 'success',
    message: 'Post liked',
  });
});

export const unlikePost = catchAsync(async (req: Request, res: Response) => {
  await postService.unlikePost(req.body.id, req.user._id.toString());
  return res.status(200).json({
    status: 'success',
    message: 'Post unliked',
  });
});

export const deletePost = catchAsync(async (req: Request, res: Response) => {
  await postService.deletePost(req.params.id, req.user._id.toString());
  return res.status(200).json({
    status: 'success',
    message: 'Post deleted',
  });
});
