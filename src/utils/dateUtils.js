import moment from 'moment'

export const getWeekStartDate = (date) => {
  const dateCopy = new Date(date)
  const dayOfWeek = dateCopy.getDay()
  const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek

  const monday = new Date(dateCopy.setDate(date.getDate() + difference))
  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate())
}

export const generateWeekRange = (startDate) => {
  const result = []
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate)
    result.push(new Date(base.setDate(base.getDate() + i)))
  }
  return result
}

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(':')
  const withHours = new Date(new Date(date).setHours(Number(hours)))
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)))
  return withMinutes
}

export const formatMins = (mins) => {
  return mins < 10 ? `0${mins}` : mins
}

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const getCurrentMonth = (weekDates) => {
  const currentMonthText = weekDates
    .map((date) => moment(date).format('MMMM'))
    .filter((month, index, array) => array.indexOf(month) === index)
    .map((month, i, array) => (array.length > 1 ? month.slice(0, 3) : month))
    .join(' - ')

  return currentMonthText
}

export const isCurrentTime = (day, hour) => {
  return (
    moment(new Date()).format('L') == moment(day).format('L') &&
    moment(new Date()).format('HH') == hour
  )
}

export const isToday = (day) => {
  return moment(day).format('ll') === moment(new Date()).format('ll')
}

export const eventAtSameTime = (eventsArr, from, to, date) => {
  return eventsArr.some((event) => {
    const plannedEventFrom = event.dateFrom.getTime()
    const plannedEventTo = event.dateTo.getTime()

    const newEventFrom = getDateTime(date, from).getTime()
    const newEventTo = getDateTime(date, to).getTime()

    return (
      (newEventFrom > plannedEventFrom && newEventFrom < plannedEventTo) ||
      (newEventTo > plannedEventFrom && newEventTo < plannedEventTo) ||
      (newEventFrom < plannedEventTo && newEventTo > plannedEventFrom)
    )
  })
}

export const setTimeByDefault = (e) => {
  const timeFrom = Number(e.target.dataset.time) - 1
  const timeTo = Number(e.target.dataset.time)
  const day = Number(e.target.closest('.calendar__day').dataset.day)
  const month = Number(e.target.closest('.calendar__day').dataset.month) + 1

  const defaultDate = `${new Date().getFullYear()}-${
    month <= 9 ? `0${month}` : `${month}`
  }-${day <= 9 ? `0${day}` : `${day}`}`
  const defaultDateFrom = `${timeFrom <= 9 ? `0${timeFrom}` : timeFrom}:30`
  const defaultDateTo = `${
    timeTo <= 9 ? `0${timeTo}` : `${timeTo == 24 ? '00' : timeTo}`
  }:30`

  return [defaultDate, defaultDateFrom, defaultDateTo]
}

export const defaultHourFrom = `${
  new Date().getHours() <= 9
    ? '0' + new Date().getHours()
    : new Date().getHours()
}:00`
export const defaultHourTo = `${
  new Date().getHours() + 1 <= 9
    ? '0' + (new Date().getHours() + 1)
    : new Date().getHours() + 1
}:00`
