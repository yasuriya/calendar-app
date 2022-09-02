import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  getCurrentMonth,
  defaultHourFrom,
  defaultHourTo,
} from '../../utils/dateUtils'

import './header.scss'

const Header = ({
  modalVisibility,
  setModalVisibility,
  weekDates,
  weekStartDate,
  setWeekStartDate,
  setNewEvent,
}) => {
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

  const handleModal = () => {
    setModalVisibility(!modalVisibility)

    setNewEvent({
      id: '',
      title: '',
      description: '',
      date: moment(new Date()).format('YYYY-MM-DD'),
      dateFrom: defaultHourFrom,
      dateTo: defaultHourTo,
    })
  }

  return (
    <header className="header">
      <button className="button create-event-btn" onClick={handleModal}>
        <i className="fas fa-plus create-event-btn__icon"></i>
        Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={resetWeek}>
          Today
        </button>
        <button className="icon-button navigation__nav-icon" onClick={prevWeek}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={nextWeek}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">
          {getCurrentMonth(weekDates)}
        </span>
      </div>
    </header>
  )
}

export default Header

Header.propTypes = {
  weekDates: PropTypes.array.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  modalVisibility: PropTypes.bool.isRequired,
  weekStartDate: PropTypes.object.isRequired,
  setWeekStartDate: PropTypes.func.isRequired,
  setNewEvent: PropTypes.func.isRequired,
}
