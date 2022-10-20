const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { userDao } = require('../models');

const getUserById = async(id) => {
    return await userDao.getUserById(id);
}

const hashPassword = async(plainPassword) => {
    const saltRounds = 10;
    const salt =await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainPassword, salt);
}

const signUp = async(last_name, first_name, birthday, phone_number, point, email, password) => {
    const emailRegex    =/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
	const pwRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if(!emailRegex.test(email)) {
        const error = new Error('INVALID_EMAIL');
        error.statusCode = 400;
        throw error
    }

    if(!pwRegex.test(password)) {
        const error = new Error('INVALID_PASSWORD');
        error.statusCode = 400;
        throw error
    }

    const hashedPassword =  await hashPassword(password);
    return await userDao.createUser(last_name, first_name, birthday, phone_number, point, email, hashedPassword);
}

const signIn = async(email, password) => {
    const emailRegex    =/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
	const pwRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if(!emailRegex.test(email)) {
        const error = new Error('INVALID_EMAIL');
        error.statusCode = 400;
        throw error
    }

    if(!pwRegex.test(password)) {
        const error = new Error('INVALID_PASSWORD');
        error.statusCode = 400;
        throw error
    }

    const user = await userDao.getUserByEmail(email);

    // console.log('여기다', user);

    if(!user) {
        const error = new Error('WRONG_EMAIL')
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        const error = new Error('WRONG_PASSWORD')
    }

    const accessToken = jwt.sign({id:user.id}, process.env.JWT_SECRET,{
        algorithm: process.env.ALGORITHM,
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    const userInfo = {};
    userInfo['accessToken'] = accessToken;
    userInfo['userName'] = {};
    userInfo.userName['first_name'] = user.first_name;
    userInfo.userName['last_name'] = user.last_name;

    return userInfo;
};

module.exports = {
    getUserById,
    signUp,
    signIn
}