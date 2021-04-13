import { LoginReq, LoginRes } from '@cookingblog/api-interfaces';
import { exception } from '@api/middlewares';
import { APIError } from '@utils/exception';
import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '@api/models';

class Login {
  static perform = [
    body('email', 'Email or user name is required').exists(),
    body('password').exists().withMessage('Password cannot be empty'),
    exception.validatorHandler,
    function (
      req: Request<undefined, LoginRes, LoginReq>,
      res: Response<LoginRes>,
      next: NextFunction
    ): void {
      // Get POST data
      const { email, password } = req.body;

      // Check if user exist
      User.findOne({ $or: [{ name: email }, { email }] }).then((user) => {
        // User not exist
        if (!user) {
          return next(
            new APIError(`Can not found any user associated with ${email}`)
          );
        }

        // If user exist
        user.comparePassword(password, (err, isMatch) => {
          if (err) return next(err);
          if (!isMatch) return next(new APIError('Password does not match'));

          const payload = { id: user.id, email, password };

          jwt.sign(
            payload,
            req.app.locals.appSecret,
            { expiresIn: req.app.locals.jwtExpiresIn * 60 },
            (err, token) => {
              if (err) return next(err);

              // Hide sensitive data
              user.password = undefined;

              res.status(200).json({
                data: { user, token: 'Bearer ' + token },
                message: 'You have been successfully logged in',
                success: true,
              });
            }
          );
        });
      });
    },
  ];
}

export default Login;
