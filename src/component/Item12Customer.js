import React from 'react';
import { useSelector } from 'react-redux'

function Item12Customer() {

  const allRecord = useSelector(state => state.all_record);

  return (
    <div>
        <h3>사용 이력</h3>
        <ul>
            {allRecord.map((record, index) => (
                <li key={index}>{record}</li>
            ))}
        </ul>
    </div>
);
}

export default Item12Customer;
