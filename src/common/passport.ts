import jwt from "passport-jwt";
import passportLocal from "passport-local";
import config from "config";
import logger from "./logger";
import UsersModel from "../models/user.model";
import passport from "passport";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, cb) => {
      UsersModel.findOne(
        { email: email, password: password },
        (error: Error, user) => {
          if (error) return cb(error, false);
          if (!user) return cb(null, false);
          user.comparePassword(password, (error: Error, isMatch) => {
            if (error) return cb(error, false);
            if (isMatch) return cb(false, user);
            return cb(false, false);
          });
        }
      );
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    },
    function (payload, cb) {
      UsersModel.findOne({ email: payload.email }, (error, user) => {
        if (error) return cb(error, false);
        if (user) return cb(null, user);
        else return cb(null, false);
      });
    }
  )
);
