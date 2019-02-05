import express from 'express';

import authController from '../controller/authController';
import authenticator from '../middleware/authenticate';

const authRoute = express.Router();

// get /users/all
authRoute.get(
  '/all',
  authenticator.authenticateAdmin,
  authController.getAllUser
);

// get /users/me
authRoute.get(
  '/:userId',
  authenticator.authenticateUser,
  authController.getOneUser
);
export default authRoute;
