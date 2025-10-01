export interface Event {
  id: number
  title: string
  start_time: string
  end_time: string
  color: string
  created_at: string
}

export interface CreateEventInput {
  title: string
  start_time: string
  end_time: string
  color: string
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  id: number
}