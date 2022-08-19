import React, { useState } from 'react'
import Modal from '../modal/Modal'
import Navigation from './../navigation/Navigation'
import Week from '../week/Week'
import Sidebar from '../sidebar/Sidebar'
import events from '../../gateway/events'

import './calendar.scss'

const Calendar = ({ weekDates, visibility, modalToggle }) => {
  const [eventState, setEventState] = useState(events)

  return (
    <section className="calendar">
      {visibility && <Modal modalToggle={modalToggle} />}
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={eventState}
            modalToggle={modalToggle}
          />
        </div>
      </div>
    </section>
  )
}

export default Calendar
