import React from 'react'

import './header.scss'

const Header = ({
  currentMonth,
  resetWeek,
  nextWeek,
  prevWeek,
  modalToggle,
}) => {
  return (
    <header className="header">
      <button className="button create-event-btn" onClick={modalToggle}>
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
        <span className="navigation__displayed-month">{currentMonth}</span>
      </div>
    </header>
  )
}

export default Header
