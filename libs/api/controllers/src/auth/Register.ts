import { RegisterRes, RegisterReq } from '@cookingblog/api-interfaces';
import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { exception } from '@api/middlewares';
import { APIError } from '@cookingblog/shared/exception';
import { User } from '@api/models';

class Register {
  static perform = [
    body('name', 'User name cannot be empty').exists(),
    body('email')
      .exists()
      .withMessage('Email cannot be empty')
      .bail()
      .isEmail()
      .withMessage('Email is invalid'),
    body('password')
      .exists()
      .withMessage('Password cannot be empty')
      .bail()
      .isLength({ min: 8 })
      .withMessage('Password length must be at least 8 characters'),
    body('cpassword')
      .exists()
      .withMessage('Confirm password cannot be empty')
      .bail()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      }),
    exception.validatorHandler,
    async (
      req: Request<undefined, RegisterRes, RegisterReq>,
      res: Response<RegisterRes>,
      next: NextFunction
    ) => {
      // Get POST data
      const { name, email, password } = req.body;

      // Check if email already exist
      let user = await User.findOne({ email });
      // User exist
      if (user) {
        return next(new APIError('Email already exists'));
      }
      user = await User.findOne({ name });
      // User exist
      if (user) {
        return next(new APIError('This name already exists'));
      }

      // User not exist
      // Save user to database
      new User({ name, email, password }).save().then((user) => {
        // Hide sensitive data
        user.password = undefined;

        // Return user
        return res.status(200).json({
          data: user,
          message: 'You have been successfully registered',
          success: true,
        });
      });
    },
  ];
}

export default Register;
