import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Event from '../event/Event'
import { formatMins, isCurrentTime } from '../../../src/utils/dateUtils.js'

const Hour = (props) => {
  const { dataHour, hourEvents, dayStart, fetchEvents, setDefaultTime } = props
  const [currentTime, setCurrentTime] = useState(
    moment(new Date()).format('mm')
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment(new Date()).format('mm'))
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div
      className="calendar__time-slot "
      data-time={dataHour + 1}
      onClick={setDefaultTime}
    >
      {isCurrentTime(dayStart, dataHour) && (
        <div
          className="red-line"
          style={{
            marginTop: `${currentTime}px`,
          }}
        ></div>
      )}
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(
          dateFrom.getMinutes()
        )}`
        const eventEnd = `${dateTo.getHours()}:${formatMins(
          dateTo.getMinutes()
        )}`

        return (
          <Event
            key={id}
            eventId={id}
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            dateFrom={dateFrom}
            title={title}
            fetchEvents={fetchEvents}
          />
        )
      })}
    </div>
  )
}

export default Hour

Hour.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  setDefaultTime: PropTypes.func.isRequired,
  dayStart: PropTypes.object.isRequired,
  dataHour: PropTypes.number.isRequired,
  hourEvents: PropTypes.array.isRequired,
}
