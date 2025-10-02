import { EventService } from "./eventService"
import type { CreateEventInput } from "../models/event.js"

jest.mock('../services/database')
import database from '../services/database'

describe("EventService - Validações", () => {
    let eventService: EventService

    beforeEach(() => {
        eventService = new EventService()
        jest.clearAllMocks()
    })

    describe("validateTimeOrder", () => {
        it("deve lançar erro quando end_time for igual a start_time", () => {
            const start_time = "2025-10-01T10:00:00Z"
            const end_time = "2025-10-01T10:00:00Z"

            expect(() => {
                eventService.validateTimeOrder(start_time, end_time)
            }).toThrow('O horário de término deve ser posterior ao horário de início.')
        })

        it("não deve lançar erro quando end_time for posterior a start_time", () => {
            const start_time = "2025-10-01T10:00:00Z"
            const end_time = "2025-10-01T11:00:00Z"

            expect(() => {
                eventService.validateTimeOrder(start_time, end_time)
            }).not.toThrow()
        })
    })

    describe("validateDuration", () => {
        it("deve lançar erro quando duração for menor que 15 minutos", () => {
            const start_time = "2025-10-01T10:00:00Z"
            const end_time = "2025-10-01T10:14:00Z"

            expect(() => {
                eventService.validateDuration(start_time, end_time)
            }).toThrow('A duração do evento deve ser de pelo menos 15 minutos')
        })

        it("deve lançar erro quando duração for maior que 12 horas", () => {
            const start_time = "2025-10-01T10:00:00Z"
            const end_time = "2025-10-01T22:01:00Z"

            expect(() => {
                eventService.validateDuration(start_time, end_time)
            }).toThrow('A duração maxima do evento é de 12 horas')
        })
    })

    describe("validateDailyLimit", () => {
        it("deve lançar erro quando atingir limite de 8 eventos no dia", async () => {
            ;(database.query as jest.Mock).mockResolvedValue({ rows: [{ count: '8' }] })

            const start_time = "2025-10-01T10:00:00Z"

            await expect(
                eventService.validateDailyLimit(start_time)
            ).rejects.toThrow('Máximo de 8 eventos por dia')
        })
    })

    describe("validateTimeOverlap", () => {
        it("deve lançar erro quando houver sobreposição de eventos", async () => {
            ;(database.query as jest.Mock).mockResolvedValue({ rows: [{ count: '1' }] })

            const eventData: CreateEventInput = {
                title: "Test Event",
                start_time: "2025-10-01T10:00:00Z",
                end_time: "2025-10-01T11:00:00Z",
                color: "#ff0000"
            }

            await expect(
                eventService.validateTimeOverlap(eventData)
            ).rejects.toThrow('Já existe um evento nesse intervalo de tempo')
        })
    })
})