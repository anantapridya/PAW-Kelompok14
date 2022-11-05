import React, { useState } from 'react';
import TimePicker from 'react-time-picker';

export default function SetTime(props) {
  // const [value, onChange] = useState(new Date());
  // state dipindah ke 'atas'

  return (
    <div>
      <TimePicker
        onChange={props.onChange}
        value={props.value}
        className="font-body w-[200px] h-[50px] my-3"
        locale='sv-sv'
        disableClock={true}
        maxDetail="second"
        format='hh:mm:ss'
    />
    </div>
  );
}