import React from 'react';
import {withRouter} from 'react-router-dom';

const theButton = ({title, className, path, history}) => (
  <button className={className} onClick={() => {
    history.push(path)
  }}>
    {title}
  </button>
);

export default withRouter(theButton);

