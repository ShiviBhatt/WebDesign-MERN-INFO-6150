/* importing express */
import express from 'express';
/* importing auth js file from controller */
import authController from './../controllers/auth.controller';

/* using express router */
const router = express.Router();

/* creating signup route */
router.route('/signup')
    .post(authController.signup);

/* creating signin route */
router.route('/signin')
    .post(authController.signin);

/* creating reset-password route*/
router.route('/reset-password')
    .post(authController.resetPassword);

/* creating new-password route */
router.route('/new-password')
    .post(authController.newPassword);

/* exporting default router */
export default router;