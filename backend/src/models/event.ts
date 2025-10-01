export interface Event {
  id: number
  title: string
  start_time: Date
  end_time: Date
  color: string
  created_at: Date
}

export interface CreateEventInput {
  title: string
  start_time: Date
  end_time: Date
  color: string
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  id: number
}