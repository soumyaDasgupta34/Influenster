/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import { sign, Secret } from 'jsonwebtoken';
import app from '../app';
import * as userService from '../user/user.service';
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
const users = [user];

describe('User Controller test', () => {
  describe('Get / - Get all users', () => {
    it('User authorized', async () => {
      jest.spyOn(userService, 'getAllUsers').mockResolvedValueOnce(user);
      const jwt = sign(
        post._id.toString(),
        'jwt-ultra-secure-and-ultra-long-key' as Secret,
      );
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      const result = await request(app)
        .get('/api/v1/user/123456')
        .set('Authorization', `Bearer ${jwt}`);
      expect(result.status).toEqual(200);
    });
  });
  describe('Get / - Get user by id', () => {
    it('User authorized', async () => {
      jest.spyOn(userService, 'getUserById').mockResolvedValueOnce(user);
      const jwt = sign(
        post._id.toString(),
        'jwt-ultra-secure-and-ultra-long-key' as Secret,
      );
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      const result = await request(app)
        .get('/api/v1/user/123456')
        .set('Authorization', `Bearer ${jwt}`);
      expect(result.status).toEqual(200);
    });
  });
  describe('Get / - Follow user', () => {
    it('User authorized', async () => {
      jest.spyOn(userService, 'followUser').mockResolvedValueOnce(undefined);
      const jwt = sign(
        post._id.toString(),
        'jwt-ultra-secure-and-ultra-long-key' as Secret,
      );
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      const result = await request(app)
        .get('/api/v1/user/123456/follow')
        .set('Authorization', `Bearer ${jwt}`);
      expect(result.status).toEqual(200);
    });
  });
  describe('Get / - Unfollow user', () => {
    it('User authorized', async () => {
      jest.spyOn(userService, 'unfollowUser').mockResolvedValueOnce(undefined);
      const jwt = sign(
        post._id.toString(),
        'jwt-ultra-secure-and-ultra-long-key' as Secret,
      );
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      const result = await request(app)
        .get('/api/v1/user/123456/unfollow')
        .set('Authorization', `Bearer ${jwt}`);
      expect(result.status).toEqual(200);
    });
  });
  describe('Get / - Get followers', () => {
    it('User authorized', async () => {
      jest.spyOn(userService, 'getFollowers').mockResolvedValueOnce(user);
      const jwt = sign(
        post._id.toString(),
        'jwt-ultra-secure-and-ultra-long-key' as Secret,
      );
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      const result = await request(app)
        .get('/api/v1/user/123456/followers')
        .set('Authorization', `Bearer ${jwt}`);
      expect(result.status).toEqual(200);
    });
  });
  describe('Get / - Get following', () => {
    it('User authorized', async () => {
      jest.spyOn(userService, 'getFollowing').mockResolvedValueOnce(user);
      const jwt = sign(
        post._id.toString(),
        'jwt-ultra-secure-and-ultra-long-key' as Secret,
      );
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      const result = await request(app)
        .get('/api/v1/user/123456')
        .set('Authorization', `Bearer ${jwt}`);
      expect(result.status).toEqual(200);
    });
  });
  describe('Get / - Search User', () => {
    it('User authorized', async () => {
      jest.spyOn(userService, 'searchUser').mockResolvedValueOnce(user);
      const jwt = sign(
        post._id.toString(),
        'jwt-ultra-secure-and-ultra-long-key' as Secret,
      );
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      const result = await request(app)
        .get('/api/v1/user/search/ank')
        .set('Authorization', `Bearer ${jwt}`);
      expect(result.status).toEqual(200);
    });
  });
});
