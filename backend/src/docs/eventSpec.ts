export const eventSpec = {
  '/api/events': {
    get: {
      summary: 'Listar todos os eventos',
      responses: {
        200: {
          description: 'Lista de eventos',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Event' }
              }
            }
          }
        }
      }
    },
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
                      pattern: '^#[0-9A-Fa-f]{6}$',
                      example: '#FF5733'
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
  },
  '/api/events/{id}': {
    get: {
      summary: 'Buscar evento por ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'number' },
          description: 'ID do evento'
        }
      ],
      responses: {
        200: {
          description: 'Evento encontrado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Event' }
            }
          }
        },
        404: {
          description: 'Evento não encontrado'
        },
        400: {
          description: 'ID inválido'
        }
      }
    },
    patch: {
      summary: 'Atualizar evento',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'number' }
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string', minLength: 3, maxLength: 50 },
                start_time: { type: 'string', format: 'date-time' },
                end_time: { type: 'string', format: 'date-time' },
                color: { type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Evento atualizado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Event' }
            }
          }
        },
        400: { description: 'Dados inválidos' },
        404: { description: 'Evento não encontrado' }
      }
    }
  }
}