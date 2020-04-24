import React from "react";
import { Alert } from "react-bootstrap/";

/**
 * Error alert function, isErr is read from store in parent component and passed to ErrAlert along with the error message
 */

export const ErrAlert = (props) => {
  if (props.isErr) {
    //If error return alert otherwise return nothing
    return (
      <Alert className="mt-3" variant="danger">
        {props.msg}
      </Alert>
    );
  }
  return <div></div>;
};
