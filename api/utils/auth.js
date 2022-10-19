const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { userService } = require('../services');

const loginRequired = async(req, res, next) => {
    // 1. 토큰이 req.headers에 있는지 확인하기
    const accessToken = req.headers.authorization;

    if(!accessToken) {
        const error = new Error('NEED_ACCESS_TOKEN');
        error.statusCode = 401;
        return res.status(err.statusCode).json({message: error.message});
    }

    // 2. 토큰 검증하기
    const decoded = promisify(jwt.verify)(accessToken, process.env.JWT_SECRET); // jwt가 가지고 있던 payload값이 decoded에 할당됨

    // 3. 해당 유저가 db에 있니? (userDao)
    const user = await userService.getUserById(decoded.id);

    if(!user) {
        const error = new Error('USER_DOES_NOT_EXIST');
        error.statusCode = 404;
        return res.status(err.statusCode).json({message: error.message});
    }

    // 4. GRANT ACCESS
    req.user = user;

    next();
}

module.exports = { loginRequired }