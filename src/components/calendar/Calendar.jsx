import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Modal from '../modal/Modal'
import Navigation from './../navigation/Navigation'
import Week from '../week/Week'
import Sidebar from '../sidebar/Sidebar'
import { getEvents } from '../../gateway/gateWay'
import './calendar.scss'

const Calendar = ({ weekDates, modalVisibility, setModalVisibility }) => {
  const [eventState, setEventState] = useState([])

  const fetchEvents = () =>
    getEvents().then((eventsList) => setEventState(eventsList))

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <section className="calendar">
      {modalVisibility && (
        <Modal
          setModalVisibility={setModalVisibility}
          modalVisibility={modalVisibility}
          fetchEvents={fetchEvents}
          eventState={eventState}
        />
      )}
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            setModalVisibility={setModalVisibility}
            modalVisibility={modalVisibility}
            weekDates={weekDates}
            events={eventState}
            fetchEvents={fetchEvents}
          />
        </div>
      </div>
    </section>
  )
}

export default Calendar

Calendar.propTypes = {
  weekDates: PropTypes.array.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  modalVisibility: PropTypes.bool.isRequired,
}
