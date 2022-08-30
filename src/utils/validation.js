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
  const currentTime = moment().format('YYYY-MM-DD HH:mm')
  const timeDifference = moment(from).diff(currentTime, 'minutes')

  return timeDifference <= 15 && timeDifference >= 0
}

export const eventTimeIsPast = (date, hour) => {
  const eventTime = new Date(date)
  const currentTime = new Date()

  const h = hour.split(':')

  eventTime.setHours(h[0], h[1], 0, 0)

  return eventTime < currentTime
}
