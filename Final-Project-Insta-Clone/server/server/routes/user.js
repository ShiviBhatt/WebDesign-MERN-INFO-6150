/* importing express */
import express from 'express';
/* importing use js file from controller */
import userController from './../controllers/user.controller';

/* using express router */
const router = express.Router();

/**
 * Update - Put /follow
*/
router.route('/follow')
    .put(userController.follow);

/**
 * Update - Put /unfollow
*/
router.route('/unfollow')
    .put(userController.unfollow);

/**
 * Update - Put /updatepic
*/
router.route('/users')
    .put(userController.updatepic);

/**
 * GET - Get /search-users'
*/
router.route('/search-users')
    .post(userController.search_users);

/**
 * Retrieve - GET /user/${id}
*/
router.route('/users/:id')
    .get(userController.getUser);

export default router;