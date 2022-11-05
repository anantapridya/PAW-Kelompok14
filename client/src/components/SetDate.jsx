import React, { useState } from 'react';
import DatePicker from 'react-date-picker';

export default function SetDate(props) {
  // const [value, onChange] = useState(new Date());
  // state dipindah ke 'atas'

  return (
    <div>
      <DatePicker
        onChange={props.onChange}
        value={props.value} 
        className="font-body w-[200px] h-[50px] my-3"
        // format='MM/dd/yyyy'
      />
    </div>
  );
}