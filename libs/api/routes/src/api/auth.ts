import { Router } from 'express';
import {
  LoginController,
  RegisterController,
  RefreshTokenController,
} from '@api/controllers';

const router = Router();

/**
 * @swagger
 * paths:
 *   /api/auth/login:
 *      post:
 *        summary: Login
 *        description: User logging
 *        requestBody:
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                    example: 123@gmail.com
 *                  password:
 *                    type: string
 *                    example: myPassword
 *        responses:
 *          '200':
 *            description: OK
 *          '400':
 *            description: User did not login properly
 */
router.post('/login', LoginController.perform);

/**
 * @swagger
 * paths:
 *   /api/auth/register:
 *      post:
 *        summary: Register
 *        description: User register
 *        requestBody:
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                    example: 123@gmail.com
 *                  password:
 *                    type: string
 *                    example: myPassword
 *                  cpassword:
 *                    type: string
 *                    example: myPassword
 *        responses:
 *          '200':
 *             description: OK
 *          '400':
 *            description: User did not login properly
 */
router.post('/register', RegisterController.perform);

/**
 * @swagger
 * paths:
 *   /api/auth/refresh:
 *      get:
 *        summary: Token refresher
 *        security:
 *          - BearerAuth: []
 *        description: Token refresh for new session
 *        responses:
 *          '200':
 *            description: OK
 *          '400':
 *            description: Invalid token provided
 */
router.get('/refresh', RefreshTokenController.perform);

export default router;
