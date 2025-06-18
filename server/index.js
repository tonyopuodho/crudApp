import express from 'express'
import cors from 'cors';
import crudRouter from './routes/cruderoutes.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(crudRouter)


app.listen(process.env.PORT, () => {
    console.log("Server is running")
})