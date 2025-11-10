import { Router } from 'express';
import * as PostController from '../controllers/post.controller.js'

const router = Router(); 

router.route('/').get(PostController.getAllPosts);
router.route('/').post(PostController.createPost);
router.route('/:id/like').post(PostController.toggleLikePost);
router.route('/:id').delete(PostController.deletePost);

export default router;
