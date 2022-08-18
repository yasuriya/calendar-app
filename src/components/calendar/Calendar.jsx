import React, { useState } from 'react'

import Navigation from './../navigation/Navigation'
import Week from '../week/Week'
import Sidebar from '../sidebar/Sidebar'
import events from '../../gateway/events'

import './calendar.scss'

const Calendar = ({ weekDates }) => {
  const [eventState, setEventState] = useState(events)

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week weekDates={weekDates} events={eventState} />
        </div>
      </div>
    </section>
  )
}

export default Calendar

// class Calendar extends Component {
//   state = {
//     events,
//   }

//   render() {
//     const { weekDates } = this.props

//     return (
//       <section className="calendar">
//         <Navigation weekDates={weekDates} />
//         <div className="calendar__body">
//           <div className="calendar__week-container">
//             <Sidebar />
//             <Week weekDates={weekDates} events={this.state.events} />
//           </div>
//         </div>
//       </section>
//     )
//   }
// }

// export default Calendar
