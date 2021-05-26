import { Application } from 'express';
import passport from 'passport';

class Passport {
  public mountPackage(express: Application): Application {
    express = express.use(passport.initialize());
    express = express.use(passport.session());

    passport.serializeUser(this.serializeUser);

    passport.deserializeUser(this.deserializeUser);

    this.initStrategy();

    return express;
  }

  protected serializeUser<T>(
    _user: Express.User,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _done: (err: any, id?: T) => void
  ) {
    throw new Error('Not implemented');
  }

  protected deserializeUser(
    _id: string | number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _done: (err: any, user: false | Express.User) => void
  ) {
    throw new Error('Not implemented');
  }

  protected initStrategy() {
    throw new Error('Not implemented');
  }
}
