const express = require('express');
const app = express();
const  registerRoutes  = require('./routes/registerRoute');
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);



app.use('/api/auth', registerRoutes);
app.use('/api/user', registerRoutes);


module.exports = {app,port};