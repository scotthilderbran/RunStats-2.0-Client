import React from "react";
import { Alert } from "react-bootstrap/";

/**
 * Error alert function: isErr is read from store and passed as prop to ErrAlert.
 * If isErr is true, function will return error component with message from props.
 * If isErr is false/null, nothing will render.
 */

export const ImportSuccess = (props) => {
  if (props.isImported) {
    return (
      <Alert className="mt-3" variant="success">
        Import success: imported all runs not currently in database, please
        refresh to propigate runs
      </Alert>
    );
  }
  return <div></div>;
};
