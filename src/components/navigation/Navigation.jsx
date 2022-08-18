import React from 'react'
import { days } from '../../utils/dateUtils.js'
import moment from 'moment'

const Navigation = ({ weekDates }) => {
  const isToday = (day) => {
    return moment(day).format('ll') === moment(new Date()).format('ll')
  }

  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => (
        <div
          key={Math.floor(Math.random() * 100000000)}
          className="calendar__day-label day-label"
        >
          <span className="day-label__day-name">{days[dayDate.getDay()]}</span>
          <span className={`day-label${isToday(dayDate) && '__day-number'} `}>
            {dayDate.getDate()}
          </span>
        </div>
      ))}
    </header>
  )
}

export default Navigation
