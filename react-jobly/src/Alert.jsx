import { React } from "react";

/**
 * Shows error message.
 *
 * State:
 *  none
 *
 * Props:
 * error
 */


export default function Alert({ message, color }) {

  console.log(color, "Color")
  return (
    <div className="Alert" style={{backgroundColor:color, color: 'white'}}>
      <p>{message}</p>
    </div>
  );
}
