export const eventSpec = {
    post: {
        summary: 'Criar evento',
        requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                  type: 'object',
                  required: ['title', 'start_time', 'end_time', 'color'],
                  properties: {
                    title: {
                      type: 'string',
                      minLength: 3,
                      maxLength: 50,
                      example: 'Reunião de equipe'
                    },
                    start_time: {
                      type: 'string',
                      format: 'date-time',
                      example: '2025-10-01T14:00:00Z'
                    },
                    end_time: {
                      type: 'string',
                      format: 'date-time',
                      example: '2025-10-01T15:30:00Z'
                    },
                    color: {
                      type: 'string',
                      enum: ['blue', 'green', 'red', 'yellow', 'purple'],
                      example: 'blue'
                    }
                  }
                }
              }
            }
          },
          responses: {
            '201': { description: 'Evento criado com sucesso' },
            '400': { description: 'Dados inválidos' }
          }
        }
}