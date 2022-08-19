import React, { useState } from 'react'
import { getDateTime } from '../../utils/dateUtils'
import events from '../../gateway/events'
import './modal.scss'

const Modal = ({ modalToggle }) => {
  const [newEvent, setNewEvent] = useState({
    id: new Date(),
    title: '',
    description: '',
    date: '',
    dateFrom: '',
    dateTo: '',
  })

  const changeHandler = (e) => {
    const { name, value } = e.target

    setNewEvent({
      ...newEvent,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    events.push({
      id,
      title,
      description,
      dateFrom: getDateTime(date, dateFrom),
      dateTo: getDateTime(date, dateTo),
    })
    modalToggle()
  }
  const { id, title, description, date, dateFrom, dateTo } = newEvent
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
