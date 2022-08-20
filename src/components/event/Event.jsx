import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

import './event.scss'

const Event = ({ height, marginTop, title, time }) => {
  const [eventState, setEventState] = useState(true)
  const [deleteBtn, setDeleteBtn] = useState(false)

  const eventStyle = {
    height,
    marginTop,
  }

  const handleEventState = (e) => {
    e.stopPropagation()
    setEventState(false)
  }

  const handleDeleteBtn = (e) => {
    e.stopPropagation()
    setDeleteBtn(!deleteBtn)
  }

  return (
    eventState && (
      <>
        <div style={eventStyle} className="event" onClick={handleDeleteBtn}>
          <div className="event__title">{title}</div>
          <div className="event__time">{time}</div>
          {deleteBtn && (
            <>
              <div className="overlay"></div>
              <button className="delete-event-btn" onClick={handleEventState}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </>
          )}
        </div>
      </>
    )
  )
}

export default Event
