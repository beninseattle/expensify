import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
// react-dates must be initialized first before importing
import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import {setTextFilter, setStartDate, setStopDate, sortByAmount, sortByDate} from "../store/actions/filters";


class ExpenseListFilter extends React.Component {
  state = {
    calendarFocused: null
  };

  handleSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.dispatch(sortByDate());
    } else {
      this.props.dispatch(sortByAmount());
    }
  };
  onDateChange = ({startDate, endDate}) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setStopDate(endDate));
  };
  onFocusChange = calendarFocused => this.setState({calendarFocused});

  render() {
    return (
      <div>
        Filter name
        <input type="text"
               value={this.props.filters.text}
               onChange={(e) => {
                 this.props.dispatch(setTextFilter(e.target.value));
               }}
        />
        <DateRangePicker
          startDate={moment(this.props.filters.startDate)}
          endDate={moment(this.props.filters.stopDate)}
          onDatesChange={this.onDateChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDates={true}
        />
        <select value={this.props.filters.sortBy} onChange={this.handleSortChange}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ExpenseListFilter);