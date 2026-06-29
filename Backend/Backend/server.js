require('dotenv').config();
const {app,port} = require('./index.js');

const connectDB = require('./config/db.js');

connectDB();




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})