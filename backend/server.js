import express from 'express'
const app=express()
import cors from 'cors'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import Routes from "./Routes/index.js";

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectDB().then(
    console.log('database is connected successfully')
).catch((e)=>{
    console.error(e)
})

app.use('/v1',Routes)

app.listen(process.env.PORT,()=>{
    console.log(`=== server running at port ${process.env.PORT} ===>` );
})