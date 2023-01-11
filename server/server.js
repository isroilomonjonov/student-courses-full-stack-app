const dotenv = require('dotenv')
dotenv.config()
const initialData = require("./utils/initialData")
const catchAsync=require('./utils/catchAsync')
const db = require('./utils/db')
const app = require('./app')
const PORT=process.env.PORT||8080
const start = async () => {
  try {
    await db.authenticate();
    await db.sync({
      // force: true,
      // alter: true,
    });
    app.listen(PORT, () => {
      console.log(
        `Server ${process.env.NODE_ENV} started on port ${PORT}`
      );
    });
    initialData();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();