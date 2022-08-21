import React, { useState, useEffect } from 'react'
import Modal from '../modal/Modal'
import Navigation from './../navigation/Navigation'
import Week from '../week/Week'
import Sidebar from '../sidebar/Sidebar'
import { getEvents } from '../../gateway/gateWay'
import moment from 'moment'
import { setTimeByDefault } from '../../utils/dateUtils'

import './calendar.scss'

const Calendar = ({ weekDates, visibility, modalToggle }) => {
  const [eventState, setEventState] = useState([])
  const [newEvent, setNewEvent] = useState({
    id: '',
    title: '',
    description: '',
    date: moment(new Date()).format('YYYY-MM-DD'),
    dateFrom: `${new Date().getHours()}:00`,
    dateTo: `${new Date().getHours() + 1}:00`,
  })

  const setDefaultTime = (e) => {
    const [defaultDate, defaultDateFrom, defaultDateTo] = setTimeByDefault(e)

    setNewEvent({
      id: '',
      title: '',
      description: '',
      date: defaultDate,
      dateFrom: defaultDateFrom,
      dateTo: defaultDateTo,
    })

    modalToggle()
  }

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
          newEvent={newEvent}
          setNewEvent={setNewEvent}
        />
      )}
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            setDefaultTime={setDefaultTime}
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
