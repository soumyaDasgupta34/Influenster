/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import { sign, Secret } from 'jsonwebtoken';
import app from '../app';
import * as postService from '../post/post.service';
import IPost from '../post/post.interface';
import * as userDb from '../user/user.repository';

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

const data = {
  id: post._id.toString(),
};

const posts = [post];
describe('Post Controller test', () => {
  describe('GET / - Get post by id', () => {
    it('User authorized', async () => {
      jest.spyOn(postService, 'getPostById').mockResolvedValueOnce(post);
      const jwt = sign(
        post._id.toString(),
        'jwt-ultra-secure-and-ultra-long-key' as Secret,
      );
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      const result = await request(app)
        .get('/api/v1/post/:25626566')
        .set('Authorization', `Bearer ${jwt}`);
      expect(result.status).toEqual(200);
    });
  });
  describe('GET / - Get posts by user id', () => {
    it('User authorized', async () => {
      jest.spyOn(postService, 'getPostsByUserId').mockResolvedValueOnce(posts);
      const jwt = sign(
        post._id.toString(),
        'jwt-ultra-secure-and-ultra-long-key' as Secret,
      );
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      const result = await request(app)
        .get('/api/v1/post/userId/1234567')
        .set('Authorization', `Bearer ${jwt}`);
      expect(result.status).toEqual(200);
    });
  });
  describe('POST / - Like post', () => {
    it('User authorized', async () => {
      jest.spyOn(postService, 'likePost').mockResolvedValueOnce(post);
      const jwt = sign(
        post._id.toString(),
        'jwt-ultra-secure-and-ultra-long-key' as Secret,
      );
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      const result = await request(app)
        .post('/api/v1/post/like')
        .set('Authorization', `Bearer ${jwt}`)
        .send(data);
      expect(result.status).toEqual(200);
    });
  });
  describe('DELETE / - Delete post', () => {
    it('User authorized', async () => {
      jest.spyOn(postService, 'deletePost').mockResolvedValueOnce(post);
      const jwt = sign(
        post._id.toString(),
        'jwt-ultra-secure-and-ultra-long-key' as Secret,
      );
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      const result = await request(app)
        .delete('/api/v1/post/123456')
        .set('Authorization', `Bearer ${jwt}`);
      expect(result.status).toEqual(200);
    });
  });
});
