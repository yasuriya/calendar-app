import React, { useState } from 'react'
import { getDateTime, eventAtSameTime } from '../../utils/dateUtils'
import {
  durationIsValid,
  timeRangeisValid,
  timeMultiplicityIsValid,
} from '../../utils/validation'
import './modal.scss'
import { postEvents } from '../../gateway/gateWay'

const Modal = (props) => {
  const { modalToggle, fetchEvents, eventState, newEvent, setNewEvent } = props
  const { id, title, description, date, dateFrom, dateTo } = newEvent

  const changeHandler = (e) => {
    const { name, value } = e.target

    setNewEvent({
      ...newEvent,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (eventAtSameTime(eventState, dateFrom, dateTo, date)) {
      alert('Time slot is already booked. Please choose another one!')
      return
    }

    if (timeRangeisValid(dateFrom, dateTo)) {
      alert('Set correct duration of event please!')
      return
    }

    if (durationIsValid(dateFrom, dateTo)) {
      alert('Your event can not be longer than 6 hours')
      return
    }

    if (timeMultiplicityIsValid(dateFrom, dateTo)) {
      alert('Your event time must be divisible by 15 minutes')
      return
    }

    postEvents({
      id,
      title,
      description,
      dateFrom: getDateTime(date, dateFrom),
      dateTo: getDateTime(date, dateTo),
    }).then(() => fetchEvents())

    modalToggle()
  }

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={modalToggle}>
            +
          </button>
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              onChange={changeHandler}
              value={title}
              required
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                onChange={changeHandler}
                value={date}
              />
              <input
                type="time"
                name="dateFrom"
                className="event-form__field"
                onChange={changeHandler}
                value={dateFrom}
              />
              <span>-</span>
              <input
                type="time"
                name="dateTo"
                className="event-form__field"
                onChange={changeHandler}
                value={dateTo}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              onChange={changeHandler}
              value={description}
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Modal
