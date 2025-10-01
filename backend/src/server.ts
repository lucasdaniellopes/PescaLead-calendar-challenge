import express from 'express'
import 'dotenv/config'
import { apiReference } from '@scalar/express-api-reference'

const app = express()
const PORT = process.env.PORT

app.use( '/docs',apiReference({
    url: '/openapi.json'
}))

app.get('/openapi.json', (req, res) => {
    res.json({
        openapi: '3.0.0',
        info: {
            title: 'API de Eventos',
            version: '1.0.0',
        },
        paths: {}
    })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})