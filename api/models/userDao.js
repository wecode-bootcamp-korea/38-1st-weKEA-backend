const { weKEADataSource } = require('./dataSource');

const getUserById = async(id) => {
    const result = await weKEADataSource.query(`
        SELECT
            id,
            last_name AS lastName,
            first_name AS firstName,
            birthday,
            phone_number AS phoneNumber,
            email,
            point
        FROM users
        WHERE id=?;`,
        [id]
    )
    return result[0]
    
};

const createUser = async(lastName, firstName, birthday, phoneNumber, point, email, password) => {
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
        [lastName, firstName, birthday, phoneNumber, point, email, password]
    )
    return result.insertId
};

const getUserByEmail = async(email) => {
    const result = await weKEADataSource.query(`
        SELECT
            id,
            last_name AS lastName,
            first_name AS firstName,
            password
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