import { useState } from "react";
import type { Event } from "../../types/event";
import './CalendarGrid.css'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface CalendarGridProps {
    events: Event[]
}

export const CalendarGrid = ({ events }: CalendarGridProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = new Date(year, month, 1).getDay()
        return day === 0 ? 6 : day - 1
    }

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' })
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDayOfMonth = getFirstDayOfMonth(currentDate)

    return (
    <div className="calendar-container">
        <div className="calendar-header">
            <button onClick={prevMonth}><FaAngleLeft /></button>
            <h2>{`${currentMonth} ${currentYear}`}</h2>
            <button onClick={nextMonth}><FaAngleRight /></button>
        </div>

        <div className="calendar-grid">
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(day => (
                <div key={day} className="calendar-weekday-header">{day}</div>
            ))}

            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="calendar-day empty"></div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1
                return (
                    <div key={day} className="calendar-day">
                        <div className="calendar-day-number">{day}</div>
                    </div>
                )
            })}
        </div>
    </div>
)
}


