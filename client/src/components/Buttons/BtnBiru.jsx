import * as React from "react"
import PropTypes from "prop-types"

export default function BtnBiru({judulButton}) {
  return (
    <div>
      <button className="text-putih bg-biru-tua h-fit w-fit p-3 rounded-md">{judulButton}</button>
    </div>
  )
}

BtnBiru.defaultProps = {
  judulButton: "Button",
}

BtnBiru.propTypes = {
  judulButton: PropTypes.string.isRequired,
}