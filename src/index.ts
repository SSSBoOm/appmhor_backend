import express, { Express, Request, Response, Application } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Application = express()
const port = process.env.PORT || 8080

app.get('/', (req: Request, res: Response) => {
  res.send('Backend AppMhor')
})

app.listen(port, () => {
  console.log(`Server is Runing at http://localhost:${port}`)
})
