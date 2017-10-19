import React from 'react';
import {connect} from 'react-redux';
import {setTextFilter, sortByAmount, sortByDate} from "../store/actions/filters";


const ExpenseListFilter = ({filters, dispatch}) => {
  const handleSortChange = (e) => {
    if (e.target.value === 'date') {
      dispatch(sortByDate());
    } else {
      dispatch(sortByAmount());
    }
  };

  return (
    <div>
      Filter name <input type="text" value={filters.text} onChange={(e) => {
      dispatch(setTextFilter(e.target.value));
    }}/>
      Date begin <input type="text" value={filters.startDate}/>
      Date end <input type="text" value={filters.stopDate}/>
      <select value={filters.sortBy} onChange={handleSortChange}>
        <option value="date">Date</option>
        <option value="amount">Amount</option>
      </select>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ExpenseListFilter);