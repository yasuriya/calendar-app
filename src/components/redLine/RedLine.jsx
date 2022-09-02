import React from 'react'
import { useState, useEffect } from 'react'
import moment from 'moment'

const RedLine = () => {
  const [currentTime, setCurrentTime] = useState(
    moment(new Date()).format('mm')
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment(new Date()).format('mm'))
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])
  return (
    <div
      className="red-line"
      style={{
        marginTop: `${currentTime}px`,
      }}
    ></div>
  )
}

export default RedLine
