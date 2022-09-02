import React from 'react'
import RedLine from '../redLine/RedLine'
import PropTypes from 'prop-types'
import Event from '../event/Event'
import { formatMins, isCurrentTime } from '../../../src/utils/dateUtils.js'

const Hour = ({
  dataHour,
  hourEvents,
  dayStart,
  fetchEvents,
  setModalVisibility,
  modalVisibility,
}) => {
  return (
    <div
      className="calendar__time-slot "
      data-time={dataHour + 1}
      onClick={() => {
        setModalVisibility(!modalVisibility)
      }}
    >
      {isCurrentTime(dayStart, dataHour) && <RedLine />}
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
  dayStart: PropTypes.object.isRequired,
  dataHour: PropTypes.number.isRequired,
  hourEvents: PropTypes.array.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  modalVisibility: PropTypes.bool.isRequired,
}
