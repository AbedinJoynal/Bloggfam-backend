import express from 'express';
import blogController from '../controllers/blog-controller.js';
const blogRouter = express.Router();

blogRouter.get('/', blogController.getAllBlogs);
blogRouter.post('/add', blogController.addBlog);
blogRouter.put('/update/:id', blogController.updateBlog);
blogRouter.get('/:id', blogController.getById);
blogRouter.delete('/:id', blogController.deleteBlog);
blogRouter.get('/user/:id', blogController.getByUserId);
export default blogRouter;
