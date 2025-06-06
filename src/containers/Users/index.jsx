import { useEffect, useState } from "react";
import { api } from "../../api/client";
import SearchInput from "../../shared/Inputs/SearchInput";
import BlueButton from "../../shared/Buttons/BlueButton";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState("");

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

  const handleSearch = async (data) => {
    const res = await api.USERS.searchByName({ data });
    setUsers(res);
  };

  const handleChangeSearch = (e) => {
    setSearchUsers(e.target.value);
  };

  return (
    <>
      <section>
        <div className="container mx-auto py-[50px]">
          <div>
            <SearchInput
              placeholder={"Search"}
              type={"text"}
              value={searchUsers}
              onChange={handleChangeSearch}
            />
            <BlueButton
              title={"Search"}
              onClick={() => handleSearch(searchUsers)}
            />
          </div>

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
                    <td className="border border-black py-2 px-3">
                      {item.name}
                    </td>
                    <td className="border border-black py-2 px-3">
                      {item.email}
                    </td>
                    <td className="border border-black py-2 px-3">
                      {item.role}
                    </td>
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

export default Users;
