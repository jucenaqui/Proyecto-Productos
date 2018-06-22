'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "CLAVE_SECRET";

exports.createToken = function (user) {
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(1, 'day').unix()
    }
    return jwt.encode(payload, secret);
};