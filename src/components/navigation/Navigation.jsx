import React from 'react'
import PropTypes from 'prop-types'
import { days, isToday } from '../../utils/dateUtils.js'

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => (
        <div
          key={Math.floor(Math.random() * 100000000)}
          className="calendar__day-label day-label "
        >
          <span className="day-label__day-name">{days[dayDate.getDay()]}</span>
          <span className={`day-label${isToday(dayDate) && '__day-number '} `}>
            {dayDate.getDate()}
          </span>
        </div>
      ))}
    </header>
  )
}

export default Navigation

Navigation.propTypes = {
  weekDates: PropTypes.array.isRequired,
}
