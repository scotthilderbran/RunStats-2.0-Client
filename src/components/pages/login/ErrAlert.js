import React from "react";
import { Alert } from "react-bootstrap/";

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
