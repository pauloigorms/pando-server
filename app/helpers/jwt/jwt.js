const expressJwt = require('express-jwt');
const users = require('./../../services/users');

module.exports = jwt;

function jwt() {
    return expressJwt(
        { 
            secret: process.env.JWT_SECRET, 
            algorithms: ['HS256'], 
            isRevoked 
        }).unless({
        path: [
            '/users/signup',
            '/users/signin',
            '/users/signup/password',
            /^\/users\/upload-image\/.*/          
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await users.getById(payload.sub);
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }
    done();
};
