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

export default function Alert({ error }) {
  return (
    <div className="Alert" style={{backgroundColor:'red', color: 'white'}}>
      <p>{error}</p>
    </div>
  );
}