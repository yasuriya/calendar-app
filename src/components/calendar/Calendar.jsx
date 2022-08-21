import React, { useState, useEffect } from 'react'
import Modal from '../modal/Modal'
import Navigation from './../navigation/Navigation'
import Week from '../week/Week'
import Sidebar from '../sidebar/Sidebar'
import { getEvents } from '../../gateway/gateWay'

import './calendar.scss'

const Calendar = ({ weekDates, visibility, modalToggle }) => {
  const [eventState, setEventState] = useState([])

  const fetchEvents = () =>
    getEvents().then((eventsList) => setEventState(eventsList))

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <section className="calendar">
      {visibility && (
        <Modal
          modalToggle={modalToggle}
          fetchEvents={fetchEvents}
          eventState={eventState}
        />
      )}
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={eventState}
            modalToggle={modalToggle}
            fetchEvents={fetchEvents}
          />
        </div>
      </div>
    </section>
  )
}

export default Calendar
