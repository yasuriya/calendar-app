import React from 'react'
import Day from '../day/Day'

import './week.scss'

const Week = (props) => {
  const { weekDates, events, fetchEvents, setDefaultTime } = props
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        )

        const dayEvents = events.filter(
          (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
        )

        return (
          <Day
            setDefaultTime={setDefaultTime}
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayStart={dayStart}
            dayEvents={dayEvents}
            fetchEvents={fetchEvents}
          />
        )
      })}
    </div>
  )
}

export default Week
