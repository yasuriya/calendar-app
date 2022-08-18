import React, { useState, useEffect } from 'react'
import Header from './components/header/Header.jsx'
import Calendar from './components/calendar/Calendar.jsx'
import moment from 'moment'

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js'

import './common.scss'

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date())

  const nextWeek = () => {
    weekStartDate.setDate(weekStartDate.getDate() + 7)
    setWeekStartDate(new Date(weekStartDate))
  }

  const prevWeek = () => {
    weekStartDate.setDate(weekStartDate.getDate() - 7)
    setWeekStartDate(new Date(weekStartDate))
  }

  const resetWeek = () => {
    setWeekStartDate(new Date())
  }

  const currentMonth = moment(weekStartDate).format('MMMM')
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate))
  return (
    <>
      <Header
        resetWeek={resetWeek}
        prevWeek={prevWeek}
        nextWeek={nextWeek}
        currentMonth={currentMonth}
      />
      <Calendar weekDates={weekDates} />
    </>
  )
}

export default App
