import React, { useState, useEffect } from 'react'
import Header from './components/header/Header.jsx'
import Calendar from './components/calendar/Calendar.jsx'

import {
  getWeekStartDate,
  generateWeekRange,
  getCurrentMonth,
} from '../src/utils/dateUtils.js'

import './common.scss'

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(null)
  const [visibility, setVisibility] = useState(false)

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate))

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

  const modalToggle = () => {
    setVisibility(!visibility)
  }

  useEffect(() => {
    setCurrentMonth(getCurrentMonth(weekDates))
  }, [weekDates])

  return (
    <>
      <Header
        resetWeek={resetWeek}
        prevWeek={prevWeek}
        nextWeek={nextWeek}
        currentMonth={currentMonth}
        modalToggle={modalToggle}
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
