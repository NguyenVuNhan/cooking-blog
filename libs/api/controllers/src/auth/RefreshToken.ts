import { IUserModel } from '@cookingblog/api-interfaces';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@api/models';

class RefreshToken {
  static getToken(req: Request): string {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token as string;
    }

    return '';
  }

  static perform(req: Request, res: Response) {
    try {
      const token = RefreshToken.getToken(req);
      if (token === '') {
        return res.status(400).json({
          data: { message: 'Invalid refresh token' },
          message: 'Invalid refresh token',
          success: true,
        });
      }

      jwt.verify(
        token,
        res.app.locals.appSecret,
        (_err: Error, { id, email, password }: IUserModel) => {
          // Check if user exist
          User.findById(id).then((user) => {
            // User not exist
            if (!user) {
              return res.status(400).json({
                data: { email },
                message: 'Can not found any user with this email',
                success: false,
              });
            }

            // If user exist
            user.comparePassword(password, (err, isMatch) => {
              if (err) throw err;
              if (!isMatch) {
                res.status(400).json({
                  data: { error: 'Password does not match' },
                  message: 'Error',
                  success: false,
                });
              }

              const payload = {
                id: user.id,
                email: user.email,
                password: user.password,
              };

              jwt.sign(
                payload,
                req.app.locals.appSecret,
                {
                  expiresIn: req.app.locals.jwtExpiresIn * 60,
                },
                (err, token) => {
                  if (err) throw err;

                  // Hide sensitive data
                  user.password = undefined;

                  res.status(200).json({
                    data: { user, token: 'Bearer ' + token },
                    message: 'Token refreshed',
                    success: true,
                  });
                }
              );
            });
          });
        }
      );
    } catch (err) {
      res.status(400).json({
        data: { ...err },
        message: 'Error',
        success: false,
      });
    }
  }
}

export default RefreshToken;
