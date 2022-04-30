/* eslint-disable implicit-arrow-linebreak */
import { Schema, model } from 'mongoose';
import IComment from '../comments/comments.interface';
import IPost from './post.interface';

const postSchema = new Schema(
  {
    text: { type: String, required: true },
    userName: { type: String, required: true },
    avatar: { type: String, required: true },
    image: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: 0,
      },
    ],
    createdAt: { type: Date, default: Date.now },

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { collection: 'posts' },
);

const PostModel = model<IPost>('Post', postSchema);

export const savePost = async (postData: IPost): Promise<IPost> =>
  PostModel.create(postData);

export const getAllPosts = async (
  following: Array<string>,
): Promise<Array<IPost>> =>
  PostModel.find({ user: { $in: following } }).sort({ createdAt: -1 });

export const getPostById = async (id: string): Promise<IPost> =>
  PostModel.findById(id);

export const getPostsByUserId = async (id: string): Promise<Array<IPost>> =>
  PostModel.find({ user: id }).sort({ createdAt: -1 });

export const deletePost = async (id: string): Promise<any> =>
  PostModel.findByIdAndDelete({ _id: id });

export const editPost = async (id: string, text: string): Promise<IPost> =>
  PostModel.findOneAndUpdate({ _id: id }, { text });

export const likePost = async (
  postId: string,
  userId: string,
): Promise<IPost> =>
  PostModel.findByIdAndUpdate(postId, { $addToSet: { likes: userId } });

export const unlikePost = async (
  postId: string,
  userId: string,
): Promise<IPost> =>
  PostModel.findByIdAndUpdate(postId, { $pull: { likes: userId } });

export const addComment = async (postId: string, newComment: IComment) =>
  PostModel.findByIdAndUpdate(
    { _id: postId },
    { $addToSet: { comments: newComment } },
  );

export const deleteComment = async (postId: string, commentId: string) =>
  PostModel.findByIdAndUpdate(
    { _id: postId },
    { $pull: { comments: commentId } },
  );

export const avatarChange = async (postId: string, avatar: string) =>
  PostModel.findByIdAndUpdate({ _id: postId }, { avatar });

export default PostModel;
