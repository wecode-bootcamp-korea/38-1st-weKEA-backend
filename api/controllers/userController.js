const { userService } = require('../services')
const { catchAsync } = require('../utils/error');

const signUp = catchAsync(async(req, res) => {
    const point = 1000000;
    const { last_name, first_name, birthday, phone_number, email, password } = req.body;
    if(!last_name||!first_name||!birthday||!phone_number||!email||!password) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;

        throw error
    }
    const insertId =  await userService.signUp(last_name, first_name, birthday, phone_number, point, email, password);
    res.status(201).json({insertId});
    
});

const signIn = async(req, res) => {
    const { email, password } = req.body;

    try {
        if(!email||!password) {
            const error = new Error('KEY_ERROR');
            error.statusCode = 401;

            console.log(error);
            throw error
        }

        const accessToken = await userService.signIn(email, password);
        res.status(200).json({accessToken});

    } catch (error) {
        console.log(error);
        res.status(error.statusCode).json({message : error.message});
    }
};

module.exports = {
    signUp,
    signIn
}