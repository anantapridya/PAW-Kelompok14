import React, { useState } from 'react';
import TimePicker from 'react-time-picker';

export default function SetTime() {
  const [value, onChange] = useState('11:11');

  return (
    <div>
      <TimePicker
        onChange={onChange}
        value={value}
        className="font-body w-[200px] h-[50px] my-3"
        locale='sv-sv'
    />
    </div>
  );
}