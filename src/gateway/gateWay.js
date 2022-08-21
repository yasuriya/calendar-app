const API_URL = 'https://62da76989eedb699636eee99.mockapi.io/api/v1/events'

export const getEvents = () => {
  return fetch(API_URL)
    .then((response) => {
      if (!response.ok)
        throw new Error("Internal Server Error. Can't display events ")

      return response.json()
    })
    .then((events) =>
      events.map((el) => {
        const { dateFrom, dateTo, id } = el

        return {
          ...el,
          dateFrom: new Date(dateFrom),
          dateTo: new Date(dateTo),
          id: Number(id),
        }
      })
    )
    .catch((error) => alert(error.message))
}

export const postEvents = (events) => {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(events),
  })
}

export const deleteEvents = (id) => {
  return fetch(`${API_URL}/${id}`, { method: 'DELETE' })
}
