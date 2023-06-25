import { ChangeEvent, useState } from "react";

export interface FilterParams {
  name: string;
  page: number;
  limit: number;
}

interface FilterComponentProps {
  onFilterChange?: (filter: FilterParams) => void;
  initialValues: FilterParams;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  onFilterChange,
  initialValues,
}) => {
  const [filterParams, setFilterParams] = useState<FilterParams>(initialValues);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterParams((prevParam) => ({
      ...prevParam,
      name: event.target.value,
      page: 1,
    }));
  };

  return (
    <div className="w-full p-5 bg-red-100 rounded-lg my-5 flex flex-col gap-2">
      <div>Search</div>

      <div>
        Name:
        <input
          type="text"
          value={filterParams.name}
          onChange={handleNameChange}
          className="border border-gray-300 rounded-lg px-3 py-2  w-full"
        />
      </div>
      <div className="text-right">
        <button
          className="px-3 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => {
            if (onFilterChange) {
              onFilterChange(filterParams);
            }
          }}
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};
export default FilterComponent;
