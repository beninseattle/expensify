import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
// react-dates must be initialized first before importing
import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import {setTextFilter, setStartDate, setStopDate, sortByAmount, sortByDate} from "../store/actions/filters";

// TODO: Set up type object for filters object?
/**
 * @property {Object} props
 * @property {function(string)} props.setTextFilter
 * @property {function(moment)} props.setStartDate
 * @property {function(moment)} props.setStopDate
 * @property {function} props.sortByDate
 * @property {function} props.sortByAmount
 * @property {Object} props.filters
 */
export class ExpenseListFilter extends React.Component {
  state = {
    calendarFocused: null
  };

  handleSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else {
      this.props.sortByAmount();
    }
  };
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onDateChange = ({startDate, endDate}) => {
    this.props.setStartDate(startDate);
    this.props.setStopDate(endDate);
  };
  onFocusChange = calendarFocused => this.setState({calendarFocused});

  // TODO: Revisit usage of moment vs timestamps as it's unclear where which should be used and ugliness below
  render() {
    return (
      <div>
        Filter name
        <input type="text"
               value={this.props.filters.text}
               onChange={this.onTextChange}
        />
        <DateRangePicker
          startDate={this.props.filters.startDate ? moment(this.props.filters.startDate) : this.props.filters.startDate}
          endDate={this.props.filters.stopDate ? moment(this.props.filters.stopDate) : this.props.filters.stopDate}
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

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  setStartDate: (date) => dispatch(setStartDate(date)),
  setStopDate: (date) => dispatch(setStopDate(date)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount())
});

const mapStateToProps = (state) => ({
  filters: state.filters
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilter);