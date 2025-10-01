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
    components: {
      schemas: {
        Event: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            start_time: { type: 'string', format: 'date-time' },
            end_time: { type: 'string', format: 'date-time' },
            color: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' }
          },
          required: ['id', 'title', 'start_time', 'end_time', 'color']
        }
      }
    },
    paths: eventSpec
  }



app.get('/openapi.json', (req, res) => res.json(openApiSpec))


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})