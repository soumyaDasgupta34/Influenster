/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import * as userService from './user.service';
import catchAsync from '../utils/catchAsync';
import AppError from '../middlewares/errorHandlingMiddleware';

export const registerUser = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    const { userName, email, password } = req.body;
    const userData = {
      userName,
      email,
      password,
    };
    const { accessToken, userId } = await userService.registerUser(userData);
    return res.status(201).json({
      status: 'success',
      message: 'User created',
      accessToken,
      userId,
    });
  },
);

export const logIn = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const { accessToken, userId } = await userService.logIn(email, password);
    return res.status(201).json({
      status: 'success',
      message: 'User logged in',
      accessToken,
      userId,
    });
  },
);

export const getAllUsers = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    const users = await userService.getAllUsers(req.user._id.toString());
    return res.status(200).json({
      status: 'success',
      data: users,
    });
  },
);

export const getUserById = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    const user = await userService.getUserById(req.params.id);
    return res.status(200).json({
      status: 'success',
      data: user,
    });
  },
);

export const followUser = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    if (req.user._id.toString() === req.params.id) {
      throw new AppError('You cannot follow yourself', 404);
    } else {
      await userService.followUser(req.params.id, req.user._id.toString());
      return res.status(200).json({
        status: 'success',
        message: 'Followed user successfully',
      });
    }
  },
);

export const unfollowUser = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    if (req.user._id.toString() === req.params.id) {
      throw new AppError('You cannot unfollow yourself', 404);
    } else {
      await userService.unfollowUser(req.params.id, req.user._id.toString());
      return res.status(200).json({
        status: 'success',
        message: 'Unfollowed user successfully',
      });
    }
  },
);

export const getFollowers = catchAsync(async (req: Request, res: Response) => {
  const followersArray: any = await userService.getFollowers(req.params.id);
  return res.status(200).json({
    status: 'success',
    data: followersArray,
  });
});

export const getFollowing = catchAsync(async (req: Request, res: Response) => {
  const followersArray: any = await userService.getFollowing(req.params.id);
  return res.status(200).json({
    status: 'success',
    data: followersArray,
  });
});

export const searchUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.searchUser(req.params.query);
  return res.status(200).json({
    status: 'success',
    data: user,
  });
});

export const changeAvatar = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError('Please upload image', 400);
  } else {
    await userService.changeAvatar(req.user._id.toString(), req.file.filename);
    return res.status(200).json({
      status: 'success',
      message: 'Avatar changed successfully',
    });
  }
});
