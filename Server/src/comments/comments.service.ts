/* eslint-disable implicit-arrow-linebreak */
import IComment from './comments.interface';
import * as commentDb from './comments.repository';
import * as postDb from '../post/post.repository';
import IPost from '../post/post.interface';
import AppError from '../middlewares/errorHandlingMiddleware';

export const addComment = async (
  postId: string,
  commentData: IComment,
): Promise<IPost> => {
  const comment = await commentDb.addComment(commentData);
  return postDb.addComment(postId, comment);
};

export const getComments = async (postId: string): Promise<Array<IComment>> =>
  commentDb.getComments(postId);

export const editComment = async (
  commentId: string,
  content: string,
): Promise<IComment> => commentDb.editComment(commentId, content);
export const deleteComment = async (
  userId: string,
  commentId: string,
): Promise<IPost> => {
  const comment: IComment = await commentDb.findComment(commentId);
  if (comment.user.toString() === userId) {
    await commentDb.deleteComment(commentId);
    return postDb.deleteComment(comment.postId.toString(), commentId);
  }
  throw new AppError('Cant delete comment', 400);
};
