import React from "react";

const FormInput = ({ type, placeholder, error, value, ...other }) => {
  return (
    <>
      <div>
        <input
          type={type}
          placeholder={placeholder}
          className="p-2 border border-black w-[300px] rounded"
          value={value}
          {...other}
        />
        <div className="text-red">{error?.message}</div>
      </div>
    </>
  );
};

export default FormInput;
