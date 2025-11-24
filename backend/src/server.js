import dotenv from "dotenv"
dotenv.config();

import app from "./app.js";
// import the connection 
import connectDb from "./db/dbConnection.js";



const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI
// console.log(MONGO_URI)

//est connection
connectDb(MONGO_URI).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server running on ${PORT}`)
    })
})


