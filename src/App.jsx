import React, { useState } from 'react'
import Header from './components/header/Header.jsx'
import Calendar from './components/calendar/Calendar.jsx'
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js'
import './common.scss'

const App = () => {
  const [visibility, setVisibility] = useState(false)
  const [weekStartDate, setWeekStartDate] = useState(new Date())

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate))

  const modalToggle = () => {
    setVisibility(!visibility)
  }

  return (
    <>
      <Header
        weekDates={weekDates}
        modalToggle={modalToggle}
        weekStartDate={weekStartDate}
        setWeekStartDate={setWeekStartDate}
      />
      <Calendar
        weekDates={weekDates}
        modalToggle={modalToggle}
        visibility={visibility}
      />
    </>
  )
}

export default App
