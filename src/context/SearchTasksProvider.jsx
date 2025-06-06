import { useState } from "react";
import { SearchTasksContext } from "./SearchTasksContext";

const SearchTasksProvider = ({ children }) => {
  const [searchTasks, setSearchTasks] = useState("");

  return (
    <>
      <SearchTasksContext.Provider value={{ searchTasks, setSearchTasks }}>
        {children}
      </SearchTasksContext.Provider>
    </>
  );
};

export default SearchTasksProvider;
