require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');

const route  = require('./api/routes');
// const { weKEADataSource } = require('./api/utils/auth');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(route);
// app.use(weKEADataSource);

app.get('/ping', (req, res) => {
    res.status(200).json({ message : 'pong'}); 
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening to request on 127.0.0.1:${PORT}`);
})