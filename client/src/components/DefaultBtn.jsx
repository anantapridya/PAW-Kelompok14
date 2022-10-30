import * as React from "react";
import PropTypes from "prop-types";

export default function DefaultBtn(props) {
  return (
    <div>
      <button
        type={props.type}
        className={
          "text-putih bg-biru-tua h-fit w-fit p-3 rounded-md font-body text-xl " +
          props.className
        }
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
