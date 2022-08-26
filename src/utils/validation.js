import moment from 'moment'

export const timeRangeisValid = (from, to) => {
  const defaultTo = to.slice(0, 2) == '00' ? '24' : to.slice(0, 2)
  return Number(from.slice(0, 2)) > Number(defaultTo)
}

export const durationIsValid = (from, to) => {
  return (
    Number(to.slice(0, 2) - Number(from.slice(0, 2))) >= 6 &&
    Number(to.slice(3, 5)) > 0
  )
}

export const timeMultiplicityIsValid = (from, to) => {
  return (
    Number(from.slice(3, 5) % 15 !== 0) || Number(to.slice(3, 5) % 15 !== 0)
  )
}

export const timeBeforeRemoveIsValid = (from) => {
  const eventTime = moment(from.getTime())
  const currentTime = new Date().getTime()

  const eventDate = moment(eventTime).format('l')
  const currentDate = moment(currentTime).format('l')

  const eventHour = moment(eventTime).format('HH')
  const currentHour = moment(currentTime).format('HH')

  const timeDifference = Number(moment(eventTime - currentTime).format('mm'))

  return (
    timeDifference <= 15 &&
    currentDate === eventDate &&
    eventHour === currentHour
  )
}

export const eventTimeIsPast = (date, hour) => {
  const eventTime = new Date(date)
  const currentTime = new Date()

  const h = hour.split(':')

  eventTime.setHours(h[0], h[1], 0, 0)

  return eventTime < currentTime
}
