import { Application } from 'express';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@api/models';
import { log } from '@cookingblog/shared/api/utils';

class JWT {
  public static init(
    passport: typeof import('passport'),
    appSecret: string
  ): void {
    passport.use(
      new Strategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: appSecret,
        },
        (payload, done) => {
          User.findById(payload.id)
            .then((user) => (user ? done(null, user) : done(null, false)))
            .catch((err) => done(err, false));
        }
      )
    );
  }
}

class Passport {
  public mountPackage(
    express: Application,
    config: { appSecret: string }
  ): Application {
    express = express.use(passport.initialize());
    express = express.use(passport.session());

    passport.serializeUser<string>((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      User.findById(id)
        .then((user) => done(null, user))
        .catch((err) => done(err, false));
    });

    try {
      JWT.init(passport, config.appSecret);
    } catch (err) {
      log.error(err.stack);
    }

    return express;
  }
}

export default new Passport();
