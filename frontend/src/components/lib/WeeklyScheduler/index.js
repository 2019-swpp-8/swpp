import React from 'react';
import debounce from 'lodash/debounce';
import {DayHeader, TimeRow} from 'components';


class WeeklyScheduler extends React.Component {
  constructor(props) {
    super(props);
    this.unavailEv = { event: 'unavailable', color: '#d4d8dd' };
    this.availEv = { event: 'available', color: '#b66363' };
    this.tutoringEv = { event: 'tutoring', color: '#d6bd43' };
    this.events = [this.unavailEv, this.availEv, this.tutoringEv];
    const { currentSchedule } = this.props;
    const defaultEvent = this.unavailEv;
    const selectedEvent = this.availEv;
    let days = [];
    if (currentSchedule) {
      days = currentSchedule;
    } else {
      for (let i = 0; i < 7; i += 1) {
        const day = [];
        for (let j = 0; j < 48; j += 1) {
          day.push(defaultEvent);
        }
        days.push(day);
      }
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
    const { currentSchedule } = this.props;
    const { days } = this.state;
    this.setState({
      days: newProps.currentSchedule || days
    });
  }
  onMouseDown(e) {
    e.preventDefault();
    const rowNum = e.target.getAttribute('data-row');
    const dayNum = e.target.getAttribute('data-day');
    this.setState({
      startingCell: {
        day: parseInt(dayNum, 10),
        time: parseInt(rowNum, 10)
      }
    });
    var currentEvent;
    if (this.state.oldDays[parseInt(dayNum, 10)][parseInt(rowNum, 10)] == this.unavailEv) {
      currentEvent = this.availEv;
    } else if (this.state.oldDays[parseInt(dayNum, 10)][parseInt(rowNum, 10)] == this.availEv) {
      currentEvent = this.unavailEv;
    } else {
      currentEvent = this.availEv;
    }
    this.setState({
      currentEvent: currentEvent
    });

    this.weekTable.addEventListener('mouseover', this.onMouseOver);
    window.addEventListener('mouseup', this.onMouseUp);

    const newDays = [];

    for (let j = 0; j < 7; j += 1) {
      newDays.push(this.state.oldDays[j].slice());
    }
    newDays[parseInt(dayNum, 10)][parseInt(rowNum, 10)] = currentEvent;

    this.setState({ days: newDays });
  }
  onMouseUp() {
    const { days } = this.state;
    this.weekTable.removeEventListener('mouseover', this.onMouseOver);
    window.removeEventListener('mouseup', this.onMouseUp);
    this.setState({ oldDays: days });
  }
  onMouseOver(e) {
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
