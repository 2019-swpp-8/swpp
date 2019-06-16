import React from 'react';
import debounce from 'lodash/debounce';
import {DayHeader, TimeRow} from 'components';

const timesToSched = (times, tutoringTimes, a, b, c, inv) => {
  const day = [];
  for (let i = 0; i < 48; i++) {
    if ((inv && (tutoringTimes % 2 === 0)) || (!inv && (tutoringTimes % 2 === 1))) {
      day.push(c);
    } else if (times % 2 === 1) {
      day.push(b);
    } else {
      day.push(a);
    }
    tutoringTimes = Math.floor(tutoringTimes / 2);
    times = Math.floor(times / 2);
  }
  return day;
}

const schedToTimes = (sched, filled) => {
  let a = 0;
  for (let i = 47; i >= 0; i--) {
    if (sched[i] == filled) {
      a++;
    }
    a *= 2;
  }
  return a / 2;
}

class WeeklyScheduler extends React.Component {
  constructor(props) {
    super(props);
    this.unavailEv = { event: 'unavailable', color: '#dadde4' };
    this.availEv = { event: 'available', color: '#8683c3' };
    this.tutoringEv = { event: 'tutoring', color: '#6f747a' };
    this.events = [this.unavailEv, this.availEv, this.tutoringEv];
    const { currentSchedule, times, tutoringTimes, inv } = this.props;
    const defaultEvent = this.unavailEv;
    const selectedEvent = this.availEv;
    const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    let days = [];
    for (let i = 0; i < 7; i += 1) {
      const day = timesToSched(times ? times[weekdays[i]] : 0,
        tutoringTimes ? tutoringTimes[weekdays[i]] : 0, this.unavailEv, this.availEv, this.tutoringEv, inv);
      days.push(day);
    }
    this.state = {
      days,
      startingCell: null,
      currentEvent: selectedEvent || defaultEvent,
      oldDays: days
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { times, tutoringTimes, inv } = newProps;
    const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    if (times && tutoringTimes) {
      let days = [];
      for (let i = 0; i < 7; i += 1) {
        const day = timesToSched(times[weekdays[i]], tutoringTimes[weekdays[i]], this.unavailEv, this.availEv, this.tutoringEv, inv);
        days.push(day);
      }
      this.setState({
        days: days,
        oldDays: days
      });
    }
  }
  onMouseDown(e) {
    e.preventDefault();
    if (this.props.readonly) return;
    const rowNum = e.target.getAttribute('data-row');
    const dayNum = e.target.getAttribute('data-day');
    this.setState({
      startingCell: {
        day: parseInt(dayNum, 10),
        time: parseInt(rowNum, 10)
      }
    });
    var currentEvent;
    let no = false;
    if (this.state.oldDays[parseInt(dayNum, 10)][parseInt(rowNum, 10)] == this.unavailEv) {
      currentEvent = this.availEv;
    } else if (this.state.oldDays[parseInt(dayNum, 10)][parseInt(rowNum, 10)] == this.availEv) {
      currentEvent = this.unavailEv;
    } else {
      currentEvent = this.availEv;
      no = true;
    }
    this.setState({
      currentEvent: currentEvent
    });

    this.weekTable.addEventListener('mouseover', this.onMouseOver);
    window.addEventListener('mouseup', this.onMouseUp);

    if (!no) {
      const newDays = [];

      for (let j = 0; j < 7; j += 1) {
        newDays.push(this.state.oldDays[j].slice());
      }
      newDays[parseInt(dayNum, 10)][parseInt(rowNum, 10)] = currentEvent;

      this.setState({ days: newDays });
    }
  }
  onMouseUp() {
    if (this.props.readonly) return;
    const { days } = this.state;
    this.weekTable.removeEventListener('mouseover', this.onMouseOver);
    window.removeEventListener('mouseup', this.onMouseUp);
    this.setState({ oldDays: days });
    this.props.onChange({
      mon: schedToTimes(days[0], this.availEv),
      tue: schedToTimes(days[1], this.availEv),
      wed: schedToTimes(days[2], this.availEv),
      thu: schedToTimes(days[3], this.availEv),
      fri: schedToTimes(days[4], this.availEv),
      sat: schedToTimes(days[5], this.availEv),
      sun: schedToTimes(days[6], this.availEv),
    });
  }
  onMouseOver(e) {
    if (this.props.readonly) return;
    const rowNum = e.target.getAttribute('data-row');
    const dayNum = e.target.getAttribute('data-day');
    this.handleDragOver(parseInt(dayNum, 10), parseInt(rowNum, 10));
  }
  setupTimeRows() {
    const { days } = this.state;
    const rows = [];
    for (let i = 0; i < 48; i += 1) {
      const row = [];
      for (let j = 0; j < 7; j += 1) {
        row.push(days[j][i]);
      }
      rows.push(row);
    }
    return rows.map((tRow, index) => (
      <TimeRow
        key={index} rowNumber={index} dayItems={tRow}
      />
    ));
  }
  handleDragOver(dayNum, rowNum) {
    const { startingCell, currentEvent, oldDays } = this.state;

    const dayDiff = dayNum - startingCell.day;
    const timeDiff = rowNum - startingCell.time;
    const newDays = [];

    for (let j = 0; j < 7; j += 1) {
      newDays.push(oldDays[j].slice());
    }
    if (dayDiff !== 0) {
      const dayStart = (startingCell.day < dayNum) ? startingCell.day : dayNum;
      const dayEnd = (startingCell.day < dayNum) ? dayNum : startingCell.day;
      const timeStart = (startingCell.time < rowNum) ? startingCell.time : rowNum;
      const timeEnd = (startingCell.time < rowNum) ? rowNum : startingCell.time;
      for (let j = dayStart; j <= dayEnd; j += 1) {
        if (timeDiff !== 0) {
          for (let i = timeStart; i <= timeEnd; i += 1) {
            if (newDays[j][i] != this.tutoringEv)
              newDays[j][i] = currentEvent;
          }
        } else {
          if (newDays[j][startingCell.time] != this.tutoringEv)
            newDays[j][startingCell.time] = currentEvent;
        }
      }
    } else {
      const timeStart = (startingCell.time < rowNum) ? startingCell.time : rowNum;
      const timeEnd = (startingCell.time < rowNum) ? rowNum : startingCell.time;
      for (let j = timeStart; j <= timeEnd; j += 1) {
        if (newDays[startingCell.day][j] != this.tutoringEv)
          newDays[startingCell.day][j] = currentEvent;
      }
    }
    this.setState({ days: newDays });
  }
  render() {
    const events = this.events;
    const defaultEvent = this.unavailEv;
    const { currentEvent } = this.state;
    return (
      <div id="WeeklySchedulerTable">
        <table>
          <DayHeader />
          <tbody
            className="week-table" onMouseDown={this.onMouseDown}
            ref={(tbody) => { this.weekTable = tbody; }}
          >
            {this.setupTimeRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default WeeklyScheduler;
