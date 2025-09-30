export interface Event {
  id: number
  title: string
  start_utc: Date
  end_utc: Date
  color: string
  created_at: Date
}

export interface CreateEventInput {
  title: string
  start_utc: Date
  end_utc: Date
  color: string
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  id: number
}