import * as React from "react";
import PropTypes from "prop-types";

export default function BtnBiru(props) {
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

BtnBiru.defaultProps = {
  judulButton: "Button",
};

BtnBiru.propTypes = {
  judulButton: PropTypes.string.isRequired,
};
