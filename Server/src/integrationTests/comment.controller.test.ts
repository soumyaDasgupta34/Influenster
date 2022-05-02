/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import { sign, Secret } from 'jsonwebtoken';
import app from '../app';
import * as commentService from '../comments/comments.service';
import IPost from '../post/post.interface';
import * as userDb from '../user/user.repository';
import IComment from '../comments/comments.interface';

const mockObjectId = new mongoose.Types.ObjectId();

process.env.JWT_SECRET = 'jwt-ultra-secure-and-ultra-long-key';

const post: IPost = {
  _id: mockObjectId,
  text: 'Caption',
  userName: 'Ayan',
  image: 'image',
  avatar: 'avatar',
  user: 'user',
};

const user = {
  _id: mockObjectId,
  userName: 'Ayan',
  email: 'abc@gmail.com',
  password: '12345',
  posts: [],
};

const comment: IComment = {
  _id: mockObjectId,
  postId: 'postId',
  avatar: 'avatar',
  userName: 'username',
  user: 'user',
  content: 'comment',
};

const comments = [comment];

const commentData = {
  postId: 'post1234',
  content: 'This is post',
};

describe('Post Controller test', () => {
  describe('POST / - Add comment', () => {
    it('User authorized', async () => {
      jest.spyOn(commentService, 'addComment').mockResolvedValueOnce(post);
      const jwt = sign(
        post._id.toString(),
        'jwt-ultra-secure-and-ultra-long-key' as Secret,
      );
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      const result = await request(app)
        .post('/api/v1/comment/addComment')
        .set('Authorization', `Bearer ${jwt}`)
        .send(commentData);
      expect(result.status).toEqual(201);
    });
  });
  describe('GET / - Get comments', () => {
    it('User authorized', async () => {
      jest.spyOn(commentService, 'getComments').mockResolvedValueOnce(comments);
      const jwt = sign(
        post._id.toString(),
        'jwt-ultra-secure-and-ultra-long-key' as Secret,
      );
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      const result = await request(app)
        .get('/api/v1/comment/123456')
        .set('Authorization', `Bearer ${jwt}`);
      expect(result.status).toEqual(200);
    });
  });
  describe('PUT / - Get comments', () => {
    it('User authorized', async () => {
      jest.spyOn(commentService, 'editComment').mockResolvedValueOnce(comment);
      const jwt = sign(
        post._id.toString(),
        'jwt-ultra-secure-and-ultra-long-key' as Secret,
      );
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      const result = await request(app)
        .put('/api/v1/comment/123456/edit')
        .set('Authorization', `Bearer ${jwt}`)
        .send({ content: 'Hello' });
      expect(result.status).toEqual(200);
    });
  });
  describe('DELETE / - Delete comments', () => {
    it('User authorized', async () => {
      jest.spyOn(commentService, 'deleteComment').mockResolvedValueOnce(post);
      const jwt = sign(
        post._id.toString(),
        'jwt-ultra-secure-and-ultra-long-key' as Secret,
      );
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      const result = await request(app)
        .delete('/api/v1/comment/123456/delete')
        .set('Authorization', `Bearer ${jwt}`);
      expect(result.status).toEqual(200);
    });
  });
});
