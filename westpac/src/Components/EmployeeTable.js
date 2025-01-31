import React, { useEffect, useState } from "react";

const EmployeeTable = ({ data, handleRowClick }) => {
  const itemsPerPage = 5; // Display 5 items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data?.employees || []);

  useEffect(() => {
    const filtered = data?.filter((employee) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        employee?.id.toString().includes(searchTerm) ||
        employee?.firstName.toLowerCase().includes(searchTerm) ||
        employee?.lastName.toLowerCase().includes(searchTerm) ||
        employee?.contactNo.toLowerCase().includes(searchTerm) ||
        employee?.address.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchQuery, data]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-4 py-2 ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          } rounded-md`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };
  const showingStart = indexOfFirstItem + 1;
  const showingEnd = Math.min(indexOfLastItem, filteredData?.length);
  const showingCount = `Showing ${showingStart}-${showingEnd} of ${filteredData?.length}`;
  return (
    <div>
      <div className="inline-flex justify-between w-full items-center mb-4 flex-col sm:flex-row">
        <div className="flex mb-2 sm:mb-0">{showingCount}</div>
        <div className="flex w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto"
          />
        </div>
      </div>

      {/* Responsive design*/}
      <div className="sm:hidden">
        {currentItems?.map((employee) => (
          <div
            key={employee?.id}
            className="border p-4 rounded-md mb-4 hover:shadow-md cursor-pointer"
            onClick={() => handleRowClick(employee)}
          >
            <div className="flex items-center mb-3">
              <img
                src="https://randomuser.me/api/portraits/men/52.jpg"
                alt={`${employee?.firstName} ${employee?.lastName}'s avatar`}
                className="w-16 h-16 rounded-full mr-3"
              />
              <div>
                <h3 className="font-semibold">
                  {employee?.firstName} {employee?.lastName}
                </h3>
                <p className="text-sm text-gray-600">{employee?.contactNo}</p>
                <p className="text-sm text-gray-600">{employee?.address}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Layout for Tablet and Larger Screens */}
      <div className="hidden sm:block">
        <table className="border border-solid border-black w-full table-auto">
          <thead className="border-b border-black">
            <tr>
              <th className="border-r border-black w-1/4">ID</th>
              <th className="border-r border-black w-1/4">Name</th>
              <th className="border-r border-black w-1/4">Contact No</th>
              <th className="border-l border-black w-1/4">Address</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((employee) => (
              <tr
                key={employee?.id}
                onClick={() => handleRowClick(employee)}
                className="cursor-pointer"
              >
                <td className="text-center">{employee?.id}</td>
                <td className="flex items-center">
                  <img
                    src="https://randomuser.me/api/portraits/men/52.jpg"
                    alt={`${employee?.firstName} ${employee?.lastName}'s avatar`}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  {employee?.firstName} {employee?.lastName}
                </td>
                <td className="text-center">{employee?.contactNo}</td>
                <td className="text-center">{employee?.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          {"<"}
        </button>
        {renderPageNumbers()}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;
