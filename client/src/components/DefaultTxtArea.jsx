import * as React from "react";

export default function DefaultTxtArea(props) {
  return (
    <div className="w-full">
      <textarea
        className={
          "w-full h-[150px] my-3 px-3 py-2 rounded-md font-body border shadow-sm focus:outline-none focus:border-biru-sedang focus:ring-biru-sedang focus:ring-1 " +
          props.className
        }
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        value={props.value || ''}
      />
    </div>
  );
}

DefaultTxtArea.defaultProps = {
  placeholder: "Placeholder Text",
};
