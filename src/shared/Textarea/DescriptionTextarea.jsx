import React from "react";

const DescriptionTextarea = ({ placeholder, error, ...other }) => {
  return (
    <>
      <div>
        <textarea
          placeholder={placeholder}
          className="p-2 border border-black w-[300px] h-[100px] rounded"
          {...other}
        ></textarea>
        <div className="text-red">{error?.message}</div>
      </div>
    </>
  );
};

export default DescriptionTextarea;
