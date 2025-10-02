import { useState } from "react";
import type { Event } from "../../types/event";
import "./CalendarGrid.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

interface CalendarGridProps {
  events: Event[]
  onEventClick: (event: Event) => void
  onAddEvent: () => void
}

export const CalendarGrid = ({ events, onEventClick, onAddEvent }: CalendarGridProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = () => {
    return new Date(currentYear, currentMonthNumber + 1, 0).getDate();
  };

  const getFirstDayOfMonth = () => {
    const day = new Date(currentYear, currentMonthNumber, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const getEventsForDay = (day: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start_time);
      return (
        eventDate.getFullYear() === currentYear &&
        eventDate.getMonth() === currentMonthNumber &&
        eventDate.getDate() === day
      );
    });
  };

  const formatEventTime = (start_time: string) => {
    const date = new Date(start_time);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getFullYear() === currentYear &&
      today.getMonth() === currentDate.getMonth() &&
      today.getDate() === day
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentMonthNumber = currentDate.getMonth();
  const daysInMonth = getDaysInMonth();
  const firstDayOfMonth = getFirstDayOfMonth();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="nav-section">
          <button onClick={prevMonth}>
            <FaAngleLeft />
          </button>
          <h2>{`${currentMonth} ${currentYear}`}</h2>
          <button onClick={nextMonth}>
            <FaAngleRight />
          </button>
        </div>
        <button className="add-event-button-header" onClick={onAddEvent}>
          <FiPlus />
        </button>
      </div>

      <div className="calendar-grid">
        {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => (
          <div key={day} className="calendar-weekday-header">
            {day}
          </div>
        ))}

        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-day empty"></div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          return (
            <div key={day} className="calendar-day">
              <div
                className={`calendar-day-number ${
                  isToday(day) ? "today-number" : ""
                }`}
              >
                {day}
              </div>
              <div className="calendar-events">
                {getEventsForDay(day)
                  .slice(0, 3)
                  .map((event) => (
                    <div
                      key={event.id}
                      className="calendar-event"
                      style={{ backgroundColor: event.color }}
                      onClick={() => onEventClick(event)}
                    >
                      <div className="event-time">
                        {formatEventTime(event.start_time)}
                      </div>
                      <div className="event-title">{event.title}</div>
                    </div>
                  ))}
                {getEventsForDay(day).length > 3 && (
                  <div className="more-events">
                    +{getEventsForDay(day).length - 3} mais
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
