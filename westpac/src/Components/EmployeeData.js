import React, { useState } from "react";
import moment from "moment";
import Modal from "react-modal";
import EmployeeTable from "./EmployeeTable";
import { useSelector } from "react-redux";

export default function EmployeeData() {
  const employees = useSelector((state) => state.company.employees);
  const companyInfo = useSelector((state) => state.company.companyInfo);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };
  return (
    <div className="p-6">
      <div className="w-100 p-2 h-100 border border-black">
        <div className=" p-4 flex flex-col gap-2 font-sans border-b-2">
          <h2 className="text-xl">{companyInfo?.companyName}</h2>
          <div className="flex justify-between ">
            <span> {companyInfo?.companyMotto}</span>
            <span>Since {moment(companyInfo?.companyEst).year()}</span>
          </div>
        </div>
        <div className="mt-2">
          <EmployeeTable data={employees} handleRowClick={handleRowClick} />
        </div>
        {showModal && (
          <Modal
            isOpen={showModal}
            onRequestClose={handleCloseModal}
            contentLabel="Employee Details Modal"
            className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-6 bg-white rounded-lg shadow-lg relative"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          >
            <button
              data-testid="close"
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <img src="/cross-icon.png" alt="Close" className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row w-full">
              <div className="flex flex-col sm:w-1/2 mb-4 sm:mb-0 sm:mr-4 items-center sm:items-start">
                <img
                  src="https://randomuser.me/api/portraits/men/52.jpg"
                  alt={`${selectedEmployee?.firstName} ${selectedEmployee?.lastName}'s avatar`}
                  className="w-24 h-24 mb-4"
                />
                <p>{selectedEmployee?.jobTitle}</p>
                <p>{selectedEmployee?.age} y</p>
                <p>
                  DOJ:{" "}
                  {moment(selectedEmployee?.dateJoined)
                    .startOf("day")
                    .format("YYYY-MM-DD")}
                </p>
              </div>

              <div className="sm:w-1/2">
                <div className="mb-2 pl-4 flex flex-col">
                  <h3 className="border-b font-semibold mb-2">
                    {selectedEmployee?.firstName} {selectedEmployee?.lastName}
                  </h3>
                  <div>{selectedEmployee?.bio}</div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
