/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import mongoose from 'mongoose';
import * as userService from '../user/user.service';
import * as userDb from '../user/user.repository';
import * as postDb from '../post/post.repository';
import * as commentDb from '../comments/comments.repository';
import IPost from '../post/post.interface';
import IComment from '../comments/comments.interface';

const mockObjectId = new mongoose.Types.ObjectId();

const user = {
  _id: mockObjectId,
  userName: 'Ayan',
  email: 'abc@gmail.com',
  password: '12345',
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

describe('User Service', () => {
  describe('Get all users', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(userDb, 'getAllUsers').mockResolvedValueOnce(user);
      const newuser = await userService.getAllUsers(mockObjectId.toString());
      expect(newuser).toBe(user);
    });
  });
  describe('Get User By Id', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      const newuser = await userService.getUserById(mockObjectId.toString());
      expect(newuser).toBe(user);
    });
  });
  describe('Get User By Id', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      const newuser = await userService.getUserById(mockObjectId.toString());
      expect(newuser).toBe(user);
    });
  });
  describe('FollowUser', () => {
    test('Happy Scenario', async () => {
      const spy = jest.spyOn(userDb, 'addFollower').mockResolvedValueOnce(user);
      jest.spyOn(userDb, 'addFollowing').mockResolvedValueOnce(user);
      await userService.followUser('user', 'requser');
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('UnfollowUser', () => {
    test('Happy Scenario', async () => {
      const spy = jest
        .spyOn(userDb, 'removeFollower')
        .mockResolvedValueOnce(user);
      jest.spyOn(userDb, 'removeFollowing').mockResolvedValueOnce(user);
      await userService.unfollowUser('user', 'requser');
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('Get Followers', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      jest.spyOn(userDb, 'getFollowers').mockResolvedValueOnce(user);
      const followers = await userService.getFollowers(user._id.toString());
      expect(followers).toBe(user);
    });
  });
  describe('Get Following', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(userDb, 'findById').mockResolvedValueOnce(user);
      jest.spyOn(userDb, 'getFollowers').mockResolvedValueOnce(user);
      const followers = await userService.getFollowing(user._id.toString());
      expect(followers).toBe(user);
    });
  });
  describe('Search User', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(userDb, 'searchUser').mockResolvedValueOnce(user);
      const searchedUser = await userService.searchUser('Ayan');
      expect(searchedUser).toBe(user);
    });
  });
  describe('Change Avatar', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(postDb, 'getPostsByUserId').mockResolvedValueOnce(posts);
      jest.spyOn(postDb, 'avatarChange').mockResolvedValueOnce(post);
      jest
        .spyOn(commentDb, 'findCommetsByUserId')
        .mockResolvedValueOnce(comments);
      jest.spyOn(commentDb, 'avatarChange').mockResolvedValueOnce(comment);
      jest.spyOn(userDb, 'changeAvatar').mockResolvedValueOnce(user);
      const currentUser = await userService.changeAvatar(
        user._id.toString(),
        'avatar',
      );
      expect(currentUser).toBe(user);
    });
  });
});
