import React, { useState } from 'react';
import DatePicker from 'react-date-picker';

export default function SetDate() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <DatePicker
        onChange={onChange}
        value={value} 
        className="font-body w-[150px] h-[50px] border-0"
      />
    </div>
  );
}