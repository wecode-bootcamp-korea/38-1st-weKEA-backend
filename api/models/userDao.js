const { weKEADataSource } = require('./dataSource');

// 1. getUserById
const getUserById = async(id) => {
    const result = await weKEADataSource.query(`
        SELECT
            id,
            last_name,
            first_name,
            birthday,
            phone_number,
            email
        FROM users
        WHERE id=?;`,
        [id]
    )
    return result[0]
};

// 2. signUp
const createUser = async(last_name, first_name, birthday, phone_number, point, email, password) => {
    const result = await weKEADataSource.query(`
        INSERT INTO users (
            last_name,
            first_name,
            birthday,
            phone_number,
            point,
            email,
            password
        )
        VALUES(?, ?, ?, ?, ?, ?, ?);`, // point 백만점을 부여한다
        [last_name, first_name, birthday, phone_number, point, email, password]
    )
    return result.insertId
};

// 3. signIn
const getUserByEmail = async(email) => {
    const result = await weKEADataSource.query(`
        SELECT
            *
        FROM users
        WHERE email=?;`,
        [email]
    )
    return result[0]
};

module.exports = {
    getUserById,
    createUser,
    getUserByEmail
}