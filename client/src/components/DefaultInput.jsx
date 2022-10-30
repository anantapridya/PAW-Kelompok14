import * as React from "react";

export default function DefaultInput(props) {
  return (
    <div>
      <input
        type={props.type}
        className="px-3 py-2 rounded-md sm:text-sm font-body border shadow-sm focus:outline-none focus:border-biru-sedang focus:ring-biru-sedang focus:ring-1"
        placeholder={props.placeholder}
      />
    </div>
  );
}

DefaultInput.defaultProps = {
    placeholder: "Placeholder Text",
}