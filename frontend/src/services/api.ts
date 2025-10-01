import axios from "axios";
import type { Event } from "../types/event";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


export const findAllEvents = async (): Promise<Event[]> => {
  const response = await api.get<Event[]>("/events");
  return response.data;
};


