'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.zfill = zfill;
exports.isFirsDay = isFirsDay;
exports.monthDays = monthDays;
exports.createWeeksArray = createWeeksArray;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function zfill(num, len) {
  return (Array(len).join('0') + num).slice(-len);
}
function isFirsDay(day) {
  return day.ordinal === 1;
}
function monthDays(date) {
  var d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.getDate();
}
function createWeeksArray(daysInMonth, firstWeekDay, data) {
  function createOrdinalDay(ordinal) {
    return (0, _assign2.default)({}, { ordinal: ordinal }, data[ordinal.toString()] || {});
  }

  var days = Array.apply(null, Array(daysInMonth)).map(function (x, i) {
    return i + 1;
  });
  return days.reduce(function (reduced, ordinal) {
    if (reduced.length === 0) {
      reduced.push([createOrdinalDay(ordinal)]);
      return reduced;
    }

    if (reduced.length === 1) {
      var firstWeek = reduced[0];
      if (firstWeek.length < 7 - firstWeekDay) {
        firstWeek.push(createOrdinalDay(ordinal));
        return reduced;
      }

      reduced.push([createOrdinalDay(ordinal)]);
      return reduced;
    }

    var week = reduced[reduced.length - 1];
    if (week.length < 7) {
      week.push(createOrdinalDay(ordinal));
      return reduced;
    }

    reduced.push([createOrdinalDay(ordinal)]);
    return reduced;
  }, []);
}

var Month = function (_React$Component) {
  (0, _inherits3.default)(Month, _React$Component);

  function Month() {
    (0, _classCallCheck3.default)(this, Month);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Month).apply(this, arguments));
  }

  (0, _createClass3.default)(Month, [{
    key: 'render',
    value: function render() {
      var date = new Date(this.props.year, this.props.month - 1, 1);
      var firstWeekDay = date.getDay();
      var weeks = createWeeksArray(monthDays(date), firstWeekDay, this.props.data || {});

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('Month', this.props.className && this.props.className) },
        weeks.map(function (week, i) {
          return _react2.default.createElement(Week, { days: week, key: i });
        })
      );
    }
  }]);
  return Month;
}(_react2.default.Component);

Month.propTypes = {
  year: _react2.default.PropTypes.number.isRequired,
  month: _react2.default.PropTypes.number.isRequired,
  className: _react2.default.PropTypes.string,
  data: _react2.default.PropTypes.object
};
exports.default = Month;

var Week = function (_React$Component2) {
  (0, _inherits3.default)(Week, _React$Component2);

  function Week() {
    (0, _classCallCheck3.default)(this, Week);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Week).apply(this, arguments));
  }

  (0, _createClass3.default)(Week, [{
    key: 'render',
    value: function render() {
      var leftEmptyCells = this.props.days.length < 7 && isFirsDay(this.props.days[0]) ? Array.apply(null, Array(7 - this.props.days.length)) : [];
      var rightEmptyCells = this.props.days.length < 7 && !isFirsDay(this.props.days[0]) ? Array.apply(null, Array(7 - this.props.days.length)) : [];

      return _react2.default.createElement(
        'div',
        { className: 'Week' },
        leftEmptyCells.map(function (x, i) {
          return _react2.default.createElement(EmptyCell, { key: 'empty' + i });
        }),
        this.props.days.map(function (day, i) {
          return _react2.default.createElement(Day, { day: day, key: 'day' + i });
        }),
        rightEmptyCells.map(function (x, i) {
          return _react2.default.createElement(EmptyCell, { key: 'empty' + i });
        })
      );
    }
  }]);
  return Week;
}(_react2.default.Component);

Week.propTypes = {
  days: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object).isRequired
};

var Day = function (_React$Component3) {
  (0, _inherits3.default)(Day, _React$Component3);

  function Day() {
    (0, _classCallCheck3.default)(this, Day);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Day).apply(this, arguments));
  }

  (0, _createClass3.default)(Day, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('Day', (0, _defineProperty3.default)({}, this.props.day.className, this.props.day.className)) },
        _react2.default.createElement(
          'div',
          { className: 'Day__container' },
          this.props.day.component ? this.props.day.component : null
        ),
        _react2.default.createElement(
          'div',
          { className: 'Day__number' },
          zfill(this.props.day.ordinal, 2)
        )
      );
    }
  }]);
  return Day;
}(_react2.default.Component);

Day.propTypes = {
  day: _react2.default.PropTypes.object.isRequired
};

var EmptyCell = function (_React$Component4) {
  (0, _inherits3.default)(EmptyCell, _React$Component4);

  function EmptyCell() {
    (0, _classCallCheck3.default)(this, EmptyCell);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(EmptyCell).apply(this, arguments));
  }

  (0, _createClass3.default)(EmptyCell, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: 'EmptyCell' });
    }
  }]);
  return EmptyCell;
}(_react2.default.Component);