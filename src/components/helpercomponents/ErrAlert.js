import React from "react";
import { Alert } from "react-bootstrap/";

/**
 * Error alert function: isErr is read from store and passed as prop to ErrAlert.
 * If isErr is true, function will return error component with message from props.
 * If isErr is false/null, nothing will render.
 */

export const ErrAlert = (props) => {
  if (props.isErr) {
    return (
      <Alert className="mt-3" variant="danger">
        {props.msg}
      </Alert>
    );
  }
  return <div></div>;
};
