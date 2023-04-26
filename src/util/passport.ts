const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const opts: any = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

module.exports = (passport: any) => {
  passport.use(
    new JWTStrategy(opts, (jwt_payload: any, done: any) => {
      User.findById(jwt_payload.id)
        .then((user: any) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err: any) => console.error(err));
    })
  );
};
