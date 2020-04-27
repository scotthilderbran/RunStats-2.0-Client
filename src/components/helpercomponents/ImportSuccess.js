import React from "react";
import { Alert } from "react-bootstrap/";

/**
 * Import Success alert component, generates alert after successful strava import
 * Alert disappears after 3 seconds
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
