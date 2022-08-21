import React from 'react'
import Hour from '../hour/Hour'
import './day.scss'

const Day = (props) => {
  const { dayStart, dataDay, dayEvents, fetchEvents, setDefaultTime } = props
  const hours = Array(24)
    .fill()
    .map((val, index) => index)

  return (
    <div
      className="calendar__day "
      data-day={dataDay}
      data-month={dayStart.getMonth()}
    >
      {hours.map((hour) => {
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        )

        return (
          <Hour
            setDefaultTime={setDefaultTime}
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            dayStart={dayStart}
            fetchEvents={fetchEvents}
          />
        )
      })}
    </div>
  )
}

export default Day
