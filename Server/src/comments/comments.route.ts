import { Router } from 'express';
import authGuard from '../middlewares/authenticationMiddleware';
import * as commentController from './comments.controller';

const router = Router();

router.post('/addComment', authGuard, commentController.addComment);
router.get('/:id', authGuard, commentController.getComments);
router.put('/:id/edit', authGuard, commentController.editComment);
router.delete('/:id/delete', authGuard, commentController.deleteComment);

export default router;
