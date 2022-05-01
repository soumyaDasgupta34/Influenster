/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import mongoose from 'mongoose';
import * as userDb from '../user/user.repository';
import * as postDb from '../post/post.repository';
import * as commentDb from '../comments/comments.repository';
import IPost from '../post/post.interface';
import IComment from '../comments/comments.interface';
import * as postService from '../post/post.service';
import AppError from '../middlewares/errorHandlingMiddleware';

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

describe('Post Service', () => {
  describe('Add Post', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      jest.spyOn(postDb, 'savePost').mockResolvedValueOnce(post);
      jest.spyOn(userDb, 'saveUser').mockResolvedValueOnce(user);
      const newuser = await postService.addPost(mockObjectId.toString(), post);
      expect(newuser).toBe(user);
    });
  });
  describe('Add Post', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      jest.spyOn(postDb, 'savePost').mockResolvedValueOnce(post);
      jest.spyOn(userDb, 'saveUser').mockResolvedValueOnce(user);
      const newuser = await postService.addPost(mockObjectId.toString(), post);
      expect(newuser).toBe(user);
    });
  });
  describe('Get all posts', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(postDb, 'getAllPosts').mockResolvedValueOnce(posts);
      const allPosts = await postService.getAllPosts('following');
      expect(allPosts).toBe(posts);
    });
  });
  describe('Get post by Id', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(postDb, 'getPostById').mockResolvedValueOnce(post);
      const searchedPost = await postService.getPostById(post._id.toString());
      expect(searchedPost).toBe(post);
    });
  });
  describe('Get posts by UserId', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(postDb, 'getPostsByUserId').mockResolvedValueOnce(posts);
      const userPosts = await postService.getPostsByUserId(user._id.toString());
      expect(userPosts).toBe(posts);
    });
  });
  describe('Edit post', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(postDb, 'editPost').mockResolvedValueOnce(post);
      const userPost = await postService.editPost(post._id.toString(), 'text');
      expect(userPost).toBe(post);
    });
  });
  describe('Like post', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(postDb, 'likePost').mockResolvedValueOnce(post);
      const userPost = await postService.likePost(
        post._id.toString(),
        user._id.toString(),
      );
      expect(userPost).toBe(post);
    });
  });
  describe('Unlike post', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(postDb, 'unlikePost').mockResolvedValueOnce(post);
      const userPost = await postService.unlikePost(
        post._id.toString(),
        user._id.toString(),
      );
      expect(userPost).toBe(post);
    });
  });
});
