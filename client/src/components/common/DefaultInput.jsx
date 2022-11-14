import * as React from "react";

export default function DefaultInput(props) {
  return (
    <div className="w-full">
      <input
        type={props.type}
        className={
          "my-3 px-3 py-2 rounded-md font-body border shadow-sm focus:outline-none focus:border-biru-sedang focus:ring-biru-sedang focus:ring-1 " +
          props.className
        }
        placeholder={props.placeholder}
        value={props.value}
        name={props.name || function(){}}
        onChange={props.onChange || function(){}}
        min={props.min ? props.min : ''}
      />
    </div>
  );
}

DefaultInput.defaultProps = {
  placeholder: "Placeholder Text",
};
