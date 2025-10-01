import express from 'express'
import dotenv from 'dotenv'
import { apiReference } from '@scalar/express-api-reference'
import eventRoutes from './routes/eventRoutes.js'
import { eventSpec } from './docs/eventSpec.js'



const app = express()
const PORT = process.env.PORT

dotenv.config()
app.use(express.json())


app.use( '/docs',apiReference({
    url: '/openapi.json'
}))

app.use('/api', eventRoutes)



 const openApiSpec = {
    openapi: '3.0.0',
    info: { title: 'API de Eventos', version: '1.0.0' },
    paths: {
      '/api/events': eventSpec
    }
    
  }



app.get('/openapi.json', (req, res) => res.json(openApiSpec))


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})