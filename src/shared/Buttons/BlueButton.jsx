import React from "react";

const BlueButton = ({ title, type = "button", onClick }) => {
  return (
    <>
      <button type={type} onClick={onClick} className="p-2 rounded bg-blue text-white">
        {title}
      </button>
    </>
  );
};

export default BlueButton;
