import express, { Express, Request, Response, Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
const cookieParser = require('cookie-parser')
import { mainRouter } from '@/Routes/main'
dotenv.config()

const mysql = require('mysql2')
export const db = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: '12345678',
  database: 'appmhor',
})

const app: Application = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: ['http://localhost:5173', 'https://appmhor.vercel.app/'], credentials: true }))

export const cookieConfig = {
  httpOnly: true,
  secure: true,
  maxAge: 24 * 60 * 3600 * 1000,
}

app.get('/', (req: Request, res: Response) => {
  res.send('Backend AppMhor')
})

app.use(mainRouter)

app.listen(port, () => {
  console.log(`Server is Runing at http://localhost:${port}`)
})
