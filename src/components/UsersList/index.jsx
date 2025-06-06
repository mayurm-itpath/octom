import React, { useEffect, useState } from "react";
import { api } from "../../api/client";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const res = await api.USERS.getAll({});
        setUsers(res);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <section>
        <div className="container mx-auto py-[50px]">
          <div>
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
        </div>
      </section>
    </>
  );
};

export default UsersList;
