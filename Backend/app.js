const express = require('express');
const app = express();
const  registerRoutes  = require('./routes/registerRoute');
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', registerRoutes);


module.exports = {app,port};