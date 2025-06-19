import React from "react";
import CustomTable from "../CustomTable";

const UsersTable = ({ users }) => {
  const usersColumns = [
    {
      id: "name",
      label: "Name",
      fieldName: "name",
    },
    {
      id: 'email',
      label: 'Email Id',
      fieldName: 'email'
    },
    {
      id: 'role',
      label: 'Role',
      fieldName: 'role'
    }
  ];

  return (
    <>
      <div className="py-[30px]">
        <CustomTable columns={usersColumns} data={users} />
      </div>
    </>
  );
};

export default UsersTable;
