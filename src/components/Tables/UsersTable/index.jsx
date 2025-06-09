import React from "react";

const UsersTable = ({ users }) => {
  return (
    <>
      <div className="py-[30px]">
        <table className="border border-black border-collapse">
          <thead>
            <tr>
              <th className="border border-black py-2 px-3">Name</th>
              <th className="border border-black py-2 px-3">Email Id</th>
              <th className="border border-black py-2 px-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id}>
                <td className="border border-black py-2 px-3">{item.name}</td>
                <td className="border border-black py-2 px-3">{item.email}</td>
                <td className="border border-black py-2 px-3">{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersTable;
