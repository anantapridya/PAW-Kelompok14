import * as React from "react";
import PropTypes from "prop-types";

export default function DefaultBtn(props) {
  return (
    <div>
      <button
        type={props.type}
        className={
          "bg-biru-tua h-fit w-fit p-3 rounded-md font-body " + props.className
        }
        onClick={props.onClick}
        name={props.name || ""}
      >
        {props.judulButton}
      </button>
    </div>
  );
}

DefaultBtn.defaultProps = {
  judulButton: "Button",
};

DefaultBtn.propTypes = {
  judulButton: PropTypes.string.isRequired,
};
