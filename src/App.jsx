import React, { useState } from 'react'
import Header from './components/header/Header.jsx'
import Calendar from './components/calendar/Calendar.jsx'
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js'
import './common.scss'

const App = () => {
  const [modalVisibility, setModalVisibility] = useState(false)
  const [weekStartDate, setWeekStartDate] = useState(new Date())
  const [newEvent, setNewEvent] = useState({})
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate))

  return (
    <>
      <Header
        weekDates={weekDates}
        setModalVisibility={setModalVisibility}
        modalVisibility={modalVisibility}
        weekStartDate={weekStartDate}
        setWeekStartDate={setWeekStartDate}
        setNewEvent={setNewEvent}
      />
      <Calendar
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        weekDates={weekDates}
        setModalVisibility={setModalVisibility}
        modalVisibility={modalVisibility}
      />
    </>
  )
}

export default App
