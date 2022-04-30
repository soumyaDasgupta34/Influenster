import express from 'express';
import * as userController from './user.controller';
import authGuard from '../middlewares/authenticationMiddleware';
import upload from '../middlewares/imageUploadMiddleware';

const router = express.Router();

router.post('/registerUser', userController.registerUser);
router.post('/login', userController.logIn);
router.get('/getAllUsers', authGuard, userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/:id/follow', authGuard, userController.followUser);
router.get('/:id/unfollow', authGuard, userController.unfollowUser);
router.get('/:id/followers', authGuard, userController.getFollowers);
router.get('/:id/following', authGuard, userController.getFollowing);
router.get('/search/:query', authGuard, userController.searchUser);
router.post(
  '/changeAvatar',
  authGuard,
  upload.single('avatar'),
  userController.changeAvatar,
);
export default router;
