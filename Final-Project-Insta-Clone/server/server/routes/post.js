/* importing express */
import express from 'express';
/* importing post js file from controller */
import postController from './../controllers/post.controller';

/* using express router */
const router = express.Router();

/* creating allpost route */
router.route('/posts')
    .get(postController.allpost);

/* creating getsubpost route */
router.route('/subposts')
    .get(postController.getsubpost);

/* creating createpost route */
router.route('/posts')
    .post(postController.createpost);

/* creating mypost route */
router.route('/myposts')
    .get(postController.mypost);

/* creating like route */
router.route('/like')
    .put(postController.like);

/* creating unlike route */
router.route('/unlike')
    .put(postController.unlike);

/* creating comment route */
router.route('/comment')
    .put(postController.comment);

/* creating deletepost route */
router.route('/posts/:postId')
    .delete(postController.deletepost);

/* exporting default router */
export default router;
