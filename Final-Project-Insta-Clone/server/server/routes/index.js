/* importing user router */
import userRouter from './user';
/* importing auth router */
import authRouter from './auth';
/* importing post router */
import postRouter from './post';

/* exporting default */
export default (app) => {
  app.use('/', userRouter);
  app.use('/', authRouter);
  app.use('/', postRouter);
};