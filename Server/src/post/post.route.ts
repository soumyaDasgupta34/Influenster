import { Router } from 'express';
import authGuard from '../middlewares/authenticationMiddleware';
import upload from '../middlewares/imageUploadMiddleware';
import * as postController from './post.controller';

const router = Router();

router.post(
  '/addPost',
  authGuard,
  upload.single('image'),
  postController.addPost,
);
router.get('/getAllPost', authGuard, postController.getAllPosts);
router.get('/:id', authGuard, postController.getPostById);
router.get('/userId/:id', authGuard, postController.getPostsByUserId);
router.post('/like', authGuard, postController.likePost);
router.post('/unlike', authGuard, postController.unlikePost);
router.route('/:id').delete(authGuard, postController.deletePost);

export default router;
