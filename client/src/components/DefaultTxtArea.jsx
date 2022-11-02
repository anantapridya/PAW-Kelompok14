import * as React from "react";

export default function DefaultTxtArea(props) {
  return (
    <div className="w-full">
      <textarea
        className={
          "w-full h-[200px] my-3 px-3 py-2 rounded-md font-body border shadow-sm focus:outline-none focus:border-biru-sedang focus:ring-biru-sedang focus:ring-1 " +
          props.className
        }
        placeholder={props.placeholder}
      />
    </div>
  );
}

DefaultTxtArea.defaultProps = {
  placeholder: "Placeholder Text",
};
