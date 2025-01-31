import React, { useState } from "react";
import data from "../sample-data.json";
import moment from "moment";
import Modal from "react-modal";

export default function EmployeeData() {
  let a = [1, 2, 3];
  b = [...a];
  console.log("dataa", data, moment(data?.companyInfo?.companyEst).year());
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Function to open modal and set the selected employee
  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };
  return (
    <div className="w-100 p-2 h-100 border border-black">
      <div className=" p-4 flex flex-col gap-2 font-sans border-b-2">
        <h2 className="text-xl">{data?.companyInfo?.companyName}</h2>
        <div className="flex justify-between ">
          <span> {data?.companyInfo?.companyMotto}</span>
          <span>Since {moment(data?.companyInfo?.companyEst).year()}</span>
        </div>
      </div>
      <div className="mt-2">
        <table className="border border-solid border-black w-full">
          <thead className="border-b border-black">
            <tr>
              <th className="border-r border-black w-1/4">ID</th>
              <th className="border-r border-black w-1/4">Name</th>
              <th className="border-r border-black w-1/4">Contact No</th>
              <th className="border-l border-black w-1/4">Address</th>
            </tr>
          </thead>
          <tbody>
            {data?.employees?.map((employee) => {
              return (
                <tr
                  key={employee?.id}
                  onClick={() => handleRowClick(employee)}
                  className="cursor-pointer"
                >
                  <td className="">{employee?.id}</td>
                  <td className="flex items-center">
                    <img
                      src="https://randomuser.me/api/portraits/men/52.jpg"
                      //   alt={`${employee?.firstName} ${employee?.lastName}'s avatar`}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    {employee?.firstName} {employee?.lastName}
                  </td>
                  <td className=" ">{employee?.contactNo}</td>
                  <td className="">{employee?.address}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* React Modal */}
      <Modal
        isOpen={showModal} // Show the modal when this is true
        onRequestClose={handleCloseModal} // Close the modal when clicking outside
        contentLabel="Employee Details Modal"
        className="w-1/3 p-6 bg-white rounded-lg shadow-lg relative" // Add relative to position the close button
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {/* Close button inside the modal box */}
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <img
            src="/cross-icon.png" // Reference to the image inside the public folder
            alt="Close"
            className="w-4 h-4" // Smaller size (16px x 16px)
          />
        </button>

        {/* Modal Content */}
        <div className="inline-flex items-baseline w-full">
          <div className="flex flex-col w-1/2">
            <img
              src="https://randomuser.me/api/portraits/men/52.jpg"
              //   alt={`${employee?.firstName} ${employee?.lastName}'s avatar`}
              className="w-24 h-24 mr-3"
            />
            <p> {selectedEmployee?.jobTitle}</p>
            <p>{selectedEmployee?.age} y</p>
            <p>
              DOJ:{" "}
              {moment(selectedEmployee?.dateJoined)
                .startOf("day")
                .format("YYYY-MM-DD")}
            </p>
          </div>
          <div className="w-1/2">
            <div className="mb-2 pl-4 flex flex-col">
              <h3 className="border-b">
                {selectedEmployee?.firstName} {selectedEmployee?.lastName}{" "}
              </h3>
              <div>{selectedEmployee?.bio}</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
