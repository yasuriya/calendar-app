import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Event from '../event/Event'
import { formatMins, isCurrentTime } from '../../../src/utils/dateUtils.js'

const Hour = ({ dataHour, hourEvents, modalToggle, dataDay }) => {
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
      onClick={modalToggle}
    >
      {isCurrentTime(dataDay, dataHour) && (
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
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
          />
        )
      })}
    </div>
  )
}

export default Hour
