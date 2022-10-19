const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { userDao } = require('../models');

const getUserById = async(id) => {
    return await userDao.getUserById(id);
}

const hashPassword = async(plainPassword) => {
    const saltRounds = 10;
    const salt =await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainPassword, salt); // hash 메소드 반환값이 promise인지 질문하기
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

    // 해당 유저가 DB에 있는가? 해당 유저의 정보 변수 user에 할당하기
    const user = await userDao.getUserByEmail(email);

    if(!user) {
        const error = new Error('WRONG_EMAIL')
    }

    // DB의 hashedPassword와 PW평문 비교하기
    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        const error = new Error('WRONG_PASSWORD')
    }

    // 일치하면 jwt 토큰 발급
    const accessToken = jwt.sign({id:user.id}, process.env.JWT_SECRET,{
        algorithm: process.env.ALGORITHM,
        expiresIn: process.env.JWT_EXPIRES_IN // 왜 객체형태로 주는건지 질문
    });

    return accessToken;
};

module.exports = {
    getUserById,
    signUp,
    signIn
}