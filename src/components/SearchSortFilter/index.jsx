import SearchInput from "../../shared/Inputs/SearchInput";

const SearchSortFilter = ({ filterState, handleFilterChange }) => {
  return (
    <>
      <div className="flex flex-wrap items-center gap-5">
        <SearchInput
          name="q"
          placeholder={"Search"}
          type={"text"}
          value={filterState?.q || ""}
          onChange={handleFilterChange}
        />

        <select
          name="_sort"
          onChange={handleFilterChange}
          value={filterState?._sort || ""}
          className="p-2 border border-black rounded"
        >
          <option hidden>Select</option>
          <option value="">Select All</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>
      <br />
      <br />

      <div className="flex flex-wrap gap-5">
        <label>Filter By Status: </label>
        <select
          name="status"
          onChange={handleFilterChange}
          value={filterState?.status || ""}
          className="p-2 border border-black rounded"
        >
          <option hidden>Select</option>
          <option value="">Select All</option>
          <option value="pending">Pending</option>
          <option value="in progress">Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </>
  );
};

export default SearchSortFilter;
