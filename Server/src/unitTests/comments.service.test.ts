/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import mongoose from 'mongoose';
import * as postDb from '../post/post.repository';
import * as commentDb from '../comments/comments.repository';
import * as commentService from '../comments/comments.service';
import IPost from '../post/post.interface';
import IComment from '../comments/comments.interface';

const mockObjectId = new mongoose.Types.ObjectId();

const user = {
  _id: mockObjectId,
  userName: 'Ayan',
  email: 'abc@gmail.com',
  password: '12345',
  posts: [],
};

const post: IPost = {
  _id: mockObjectId,
  text: 'Caption',
  userName: 'Ayan',
  image: 'image',
  avatar: 'avatar',
  user: 'user',
};

const posts = [post];

const comment: IComment = {
  _id: mockObjectId,
  postId: 'postId',
  avatar: 'avatar',
  userName: 'username',
  user: 'user',
  content: 'comment',
};

const comments = [comment];

describe('Comments Service', () => {
  describe('Add comment', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(commentDb, 'addComment').mockResolvedValueOnce(comment);
      jest.spyOn(postDb, 'addComment').mockResolvedValueOnce(post);
      const updatedPost = await commentService.addComment(
        post._id.toString(),
        comment,
      );
      expect(updatedPost).toBe(post);
    });
  });
  describe('Get comments', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(commentDb, 'getComments').mockResolvedValueOnce(comments);
      const postComments = await commentService.getComments(
        post._id.toString(),
      );
      expect(postComments).toBe(comments);
    });
  });
  describe('Edit comment', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(commentDb, 'editComment').mockResolvedValueOnce(comment);
      const updatedComment = await commentService.editComment(
        comment._id.toString(),
        'content',
      );
      expect(updatedComment).toBe(comment);
    });
  });
});
