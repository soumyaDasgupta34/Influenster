/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import * as commentService from './comments.service';
import catchAsync from '../utils/catchAsync';
import IComment from './comments.interface';

export const addComment = catchAsync(async (req: Request, res: Response) => {
  const { postId, content } = req.body;
  const commentData = {
    postId,
    avatar: req.user.avatar,
    userName: req.user.userName,
    // eslint-disable-next-line no-underscore-dangle
    user: req.user._id.toString(),
    content,
  };
  const data = await commentService.addComment(postId, commentData);

  return res.status(201).json({
    status: 'success',
    message: 'Comment added',
    data,
  });
});

export const getComments = catchAsync(async (req: Request, res: Response) => {
  const comments: Array<IComment> = await commentService.getComments(
    req.params.id,
  );
  return res.status(200).json({
    status: 'success',
    data: comments,
  });
});

export const editComment = catchAsync(async (req: Request, res: Response) => {
  const comment: IComment = await commentService.editComment(
    req.params.id,
    req.body.content,
  );
  return res.status(200).json({
    status: 'success',
    data: comment,
  });
});

export const deleteComment = catchAsync(async (req: Request, res: Response) => {
  await commentService.deleteComment(req.user._id.toString(), req.params.id);
  return res.status(200).json({
    status: 'success',
    message: 'Comment deleted',
  });
});
