import React from "react";

const Success = ({ success }) => {
  return (
    <div className="success_component">
      <span className="success_message">{success.message}</span>
    </div>
  );
};

export default Success;
