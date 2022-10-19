const { weKEADataSource } = require('./dataSource');

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
        VALUES(?, ?, ?, ?, ?, ?, ?);`,
        [last_name, first_name, birthday, phone_number, point, email, password]
    )
    return result.insertId
};

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