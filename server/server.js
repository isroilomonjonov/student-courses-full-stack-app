const dotenv = require('dotenv')
dotenv.config()
const catchAsync=require('./utils/catchAsync')
const db = require('./utils/db')
const app = require('./app')
const PORT=process.env.PORT||8080
const start=catchAsync(async()=>{
await db.authenticate()
console.log("DATABASE CONNECTED");
await db.sync()
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  })
})
start()