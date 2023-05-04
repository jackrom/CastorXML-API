const passport = require("passport")
const jwt = require("jsonwebtoken")
const Strategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

module.exports = app => {
    const Users = app.db.models.Users;
    const cfg = app.libs.config;
    const options = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };
    passport.use(new Strategy(options, (payload, done) => {
        Users.findById(payload.id)
            .then(user => {
                if (user) {
                    return done(null, {
                        id: user.id,
                        email: user.email
                    });
                }
                return done(null, false);
            })
            .catch(error => done(error, null));
    }));
    return {
        initialize: () => {
            return passport.initialize()
        },
        authenticate: (token) => {
            let response = jwt.verify(token, cfg.jwtSecret)
            let isValid = response.exp - parseInt(Date.now() / 1000)
            if (isValid > 0) {
                return true
            } else {
                return false
            }
        }
    };
};
