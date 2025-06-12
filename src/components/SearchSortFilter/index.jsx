import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sortAndFilterTasks } from "../../redux/slices/tasks.slice";
import SearchInput from "../../shared/Inputs/SearchInput";
import useDebounce from "../../hooks/useDebounce";

const SearchSortFilter = () => {
  const [searchTasks, setSearchTasks] = useState("");
  const [queryData, setQueryData] = useState({
    filterArray: [],
    filterQuery: "",
    sortTask: "",
  });

  const dispatch = useDispatch();

  useDebounce(searchTasks, 500); // Search using debounce custom hook

  useEffect(() => {
    dispatch(sortAndFilterTasks(queryData));
  }, [queryData, dispatch]);

  const handleChangeSearch = (e) => {
    setSearchTasks(e.target.value);
  };

  const handleSort = async (e) => {
    setQueryData({ ...queryData, sortTask: e.target.value });
  };

  const handleFilter = async (e) => {
    const { checked, value } = e.target;
    let tempArr;
    if (checked) {
      tempArr = [...queryData.filterArray, value];
    } else {
      tempArr = queryData.filterArray.filter((item) => item !== value);
    }
    const query = tempArr.map((item) => `status=${item}`).join("&");
    setQueryData({ ...queryData, filterArray: tempArr, filterQuery: query });
  };

  return (
    <>
      <div>
        <SearchInput
          placeholder={"Search"}
          type={"text"}
          value={searchTasks}
          onChange={handleChangeSearch}
        />
      </div>
      <br />

      <div>
        <select
          onChange={handleSort}
          className="p-2 border border-black rounded"
        >
          <option value="">Sort By</option>
          <option value="dueDate">Due Date</option>
        </select>
        <br />
        <br />

        <div className="flex gap-5">
          <label>Filter By Starus: </label>
          <div>
            <input
              type="checkbox"
              value={"completed"}
              onChange={handleFilter}
            />{" "}
            <label>completed</label>
          </div>
          <div>
            <input type="checkbox" value={"pending"} onChange={handleFilter} />{" "}
            <label>pending</label>
          </div>
          <div>
            <input
              type="checkbox"
              value={"in progress"}
              onChange={handleFilter}
            />{" "}
            <label>in progress</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchSortFilter;
