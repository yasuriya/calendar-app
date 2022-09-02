import React from 'react'
import PropTypes from 'prop-types'
import { getDateTime, eventAtSameTime } from '../../utils/dateUtils'
import {
  durationIsValid,
  timeRangeisValid,
  timeMultiplicityIsValid,
  eventTimeIsPast,
} from '../../utils/validation'
import './modal.scss'
import { postEvent } from '../../gateway/gateWay'

const Modal = ({
  modalVisibility,
  setModalVisibility,
  fetchEvents,
  eventState,
  newEvent,
  setNewEvent,
}) => {
  const { id, title, description, date, dateFrom, dateTo } = newEvent

  const handleInputValue = (e) => {
    const { name, value } = e.target

    setNewEvent({
      ...newEvent,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (eventTimeIsPast(date, dateFrom)) {
      alert('You can not create events in the past!')
      return
    }
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

    postEvent({
      id,
      title,
      description,
      dateFrom: getDateTime(date, dateFrom),
      dateTo: getDateTime(date, dateTo),
    }).then(() => fetchEvents())

    setModalVisibility(!modalVisibility)
  }

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button
            className="create-event__close-btn"
            onClick={() => setModalVisibility(!modalVisibility)}
          >
            +
          </button>
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              onChange={handleInputValue}
              value={title}
              required
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                onChange={handleInputValue}
                value={date}
              />
              <input
                type="time"
                name="dateFrom"
                className="event-form__field"
                onChange={handleInputValue}
                value={dateFrom}
              />
              <span>-</span>
              <input
                type="time"
                name="dateTo"
                className="event-form__field"
                onChange={handleInputValue}
                value={dateTo}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              onChange={handleInputValue}
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

Modal.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  modalVisibility: PropTypes.bool.isRequired,
  eventState: PropTypes.array.isRequired,
  newEvent: PropTypes.object.isRequired,
  setNewEvent: PropTypes.func.isRequired,
}
