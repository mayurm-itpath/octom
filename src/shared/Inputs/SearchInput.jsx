import React from "react";

const SearchInput = ({ type, placeholder, value, onChange, ...other }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className="p-2 border border-black w-[300px] rounded"
        value={value}
        onChange={onChange}
        {...other}
      />
    </>
  );
};

export default SearchInput;
