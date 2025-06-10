import { useEffect, useState } from "react";
import { api } from "../../api/client";
import SearchInput from "../../shared/Inputs/SearchInput";
import BlueButton from "../../shared/Buttons/BlueButton";
import UsersTable from "../../components/Tables/UsersTable";
import { useSelector } from "react-redux";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState("");
  const userInfo = useSelector((state) => state.users.userInfo);

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
          <h2 className="text-xl font-bold">Welcome {userInfo.name},</h2>
          <div className="text-lg font-bold">Email Id: {userInfo.email}</div>
          <br />
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

          <UsersTable users={users} />
        </div>
      </section>
    </>
  );
};

export default Users;
