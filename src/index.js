import React from 'react';
import classNames from 'classnames';

export function zfill(num, len) { return (Array(len).join('0') + num).slice(-len); }
export function isFirsDay(day) { return day.ordinal === 1; }
export function monthDays(date) {
  const d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.getDate();
}
export function createWeeksArray(daysInMonth, firstWeekDay, data) {
  function createOrdinalDay(ordinal) {
    return Object.assign({}, { ordinal }, data[ordinal.toString()] || {});
  }

  const days = Array.apply(null, Array(daysInMonth)).map((x, i) => (i + 1));
  return days.reduce((reduced, ordinal) => {
    if (reduced.length === 0) {
      reduced.push([createOrdinalDay(ordinal)]);
      return reduced;
    }

    if (reduced.length === 1) {
      const firstWeek = reduced[0];
      if (firstWeek.length < 7 - firstWeekDay) {
        firstWeek.push(createOrdinalDay(ordinal));
        return reduced;
      }

      reduced.push([createOrdinalDay(ordinal)]);
      return reduced;
    }

    const week = reduced[reduced.length - 1];
    if (week.length < 7) {
      week.push(createOrdinalDay(ordinal));
      return reduced;
    }

    reduced.push([createOrdinalDay(ordinal)]);
    return reduced;
  }, []);
}

export default class Month extends React.Component {
  static propTypes = {
    year: React.PropTypes.number.isRequired,
    month: React.PropTypes.number.isRequired,
    className: React.PropTypes.string,
    data: React.PropTypes.object,
  };

  render() {
    const date = new Date(this.props.year, this.props.month - 1, 1);
    const firstWeekDay = date.getDay();
    const weeks = createWeeksArray(monthDays(date), firstWeekDay, this.props.data || {});

    return (
      <div className={classNames('Month', this.props.className && this.props.className)}>
        {weeks.map((week, i) => <Week days={week} key={i} />)}
      </div>
    );
  }
}

class Week extends React.Component {
  static propTypes = {
    days: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  };

  render() {
    const leftEmptyCells = (this.props.days.length < 7 && isFirsDay(this.props.days[0])) ?
      Array.apply(null, Array(7 - this.props.days.length)) : [];
    const rightEmptyCells = (this.props.days.length < 7 && !isFirsDay(this.props.days[0])) ?
      Array.apply(null, Array(7 - this.props.days.length)) : [];

    return (
      <div className="Week">
        {leftEmptyCells.map((x, i) => <EmptyCell key={`empty${i}`} />)}

        {this.props.days.map((day, i) => <Day day={day} key={`day${i}`} />)}

        {rightEmptyCells.map((x, i) => <EmptyCell key={`empty${i}`} />)}
      </div>
    );
  }
}

class Day extends React.Component {
  static propTypes = {
    day: React.PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className={classNames('Day', { [this.props.day.className]: this.props.day.className })}>
        <div className="Day__container">
          {(this.props.day.component) ? this.props.day.component : null}
        </div>
        <div className="Day__number">{zfill(this.props.day.ordinal, 2)}</div>
      </div>
    );
  }
}

class EmptyCell extends React.Component {
  render() {
    return <div className="EmptyCell"></div>;
  }
}

