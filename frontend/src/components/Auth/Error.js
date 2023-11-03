import React from "react";

const Error = ({ error }) => {
  return (
    <div className="error_component">
      <span className="error_message">{error.message}</span>
    </div>
  );
};

export default Error;
