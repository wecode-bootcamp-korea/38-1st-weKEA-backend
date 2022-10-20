const { DataSource } = require('typeorm');

const weKEADataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    database: process.env.TYPEORM_DATABASE
});

const weKEADSinit = async () => {
    
    await weKEADataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized");
        })
        .catch((err) => {
            console.error('Error occured during Data Source initialization', err);
            weKEADataSource.destroy();
        });
}

weKEADSinit();

module.exports = { weKEADataSource }