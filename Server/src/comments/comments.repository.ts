/* eslint-disable implicit-arrow-linebreak */
import { Schema, model } from 'mongoose';
import IComment from './comments.interface';

const CommentSchema = new Schema({
  avatar: { type: String, required: true },
  userName: { type: String, required: true },
  content: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: { type: Date, default: Date.now },
  postId: { type: Schema.Types.ObjectId, ref: 'Post' },
});

const CommentModel = model<IComment>('Comment', CommentSchema);

export const addComment = async (commentData: IComment): Promise<IComment> =>
  CommentModel.create(commentData);

export const getComments = async (postId: string): Promise<Array<IComment>> =>
  CommentModel.find({ postId }).sort({ createdAt: 1 });

export const editComment = async (
  commentId: string,
  content: string,
): Promise<IComment> =>
  CommentModel.findByIdAndUpdate(
    { _id: commentId },
    { content },
    { new: true },
  );

export const deleteComment = async (commentId: string): Promise<IComment> =>
  CommentModel.findByIdAndDelete({ _id: commentId });

export const findComment = async (commentId: string): Promise<IComment> =>
  CommentModel.findById(commentId);

export const deleteCommentsByPost = async (postId: string): Promise<any> =>
  CommentModel.deleteMany({ postId });

export const findCommetsByUserId = async (
  userId: string,
): Promise<Array<IComment>> =>
  CommentModel.find({ user: userId }).sort({ createdAt: -1 });

export const avatarChange = async (commentId: string, avatar: string) =>
  CommentModel.findByIdAndUpdate({ _id: commentId }, { avatar });

export default CommentModel;
