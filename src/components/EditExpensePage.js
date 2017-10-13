import React from 'react';

const EditExpensePage = (props) => (
  <div>
    Edit expense component <br />
    Editing: {props.match.params.id}
  </div>
);

export default EditExpensePage;