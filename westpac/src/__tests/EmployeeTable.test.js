import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EmployeeTable from "../Components/EmployeeTable";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";

// Mock Data
const mockEmployees = [
  {
    id: "90d3669e-3093-439c-8ca0-1bf746922c5d",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/stefooo/128.jpg",
    firstName: "Matilda",
    lastName: "Muller",
    jobTitle: "Customer Brand Technician",
    contactNo: "0466 419 191",
    address: "Larson Pass East Lillianstad, Victoria",
    age: 32,
    bio: "Quas est officia sit ut debitis rerum non.",
    dateJoined: "2023-07-21T10:37:23.521Z",
  },
  {
    id: "90d3669e-3093-439c-8ca0-1bf746922cer",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/stefooo/128.jpg",
    firstName: "Konal",
    lastName: "Kunar",
    jobTitle: "Associate Brand Technician",
    contactNo: "0466 419 121",
    address: "Victoria",
    age: 40,
    bio: "das est officia sit ut debitis rerum non.",
    dateJoined: "2020-06-21T10:37:23.521Z",
  },
  {
    id: "90d3669e-3093-439c-8ca0-1bf746922cer",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/stefooo/128.jpg",
    firstName: "Krishna",
    lastName: "Kunar",
    jobTitle: "Associate Brand Technician",
    contactNo: "0466 419 121",
    address: "Victoria",
    age: 40,
    bio: "das est officia sit ut debitis rerum non.",
    dateJoined: "2020-06-21T10:37:23.521Z",
  },
  {
    id: "90d3669e-3093-439c-8ca0-1bf746922cer",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/stefooo/128.jpg",
    firstName: "Dileep",
    lastName: "Kunar",
    jobTitle: "Associate Brand Technician",
    contactNo: "0466 419 121",
    address: "Victoria",
    age: 40,
    bio: "das est officia sit ut debitis rerum non.",
    dateJoined: "2020-06-21T10:37:23.521Z",
  },
  {
    id: "90d3669e-3093-439c-8ca0-1bf746922cer",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/stefooo/128.jpg",
    firstName: "dany",
    lastName: "Kunar",
    jobTitle: "Associate Brand Technician",
    contactNo: "0466 419 121",
    address: "Victoria",
    age: 40,
    bio: "das est officia sit ut debitis rerum non.",
    dateJoined: "2020-06-21T10:37:23.521Z",
  },
  {
    id: "90d3669e-3093-439c-8ca0-1bf746922cer",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/stefooo/128.jpg",
    firstName: "hari",
    lastName: "Kunar",
    jobTitle: "Associate Brand Technician",
    contactNo: "0466 419 121",
    address: "Victoria",
    age: 40,
    bio: "das est officia sit ut debitis rerum non.",
    dateJoined: "2020-06-21T10:37:23.521Z",
  },
];

const renderComponent = () => {
  render(
    <Provider store={store}>
      <EmployeeTable data={mockEmployees} handleRowClick={jest.fn()} />
    </Provider>
  );
};

describe("EmployeeTable Component", () => {
  test("should render the table with employee data", async () => {
    renderComponent();
    const employee1 = await screen.findAllByText("Matilda Muller");
    expect(employee1.length).toBeGreaterThan(1);
    const employee2 = await screen.findAllByText("Konal Kunar");
    expect(employee2.length).toBeGreaterThan(1);
  });

  test("should filter employees based on search query", async () => {
    renderComponent();

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Matilda" } });

    const employee1 = await screen.findAllByText("Matilda Muller");
    expect(employee1.length).toBeGreaterThan(0);

    const employee2 = screen.queryAllByText("Konal Kunar");
    expect(employee2.length).toBe(0);
  });

  test("should paginate the employee data", async () => {
    renderComponent();

    const employee1 = await screen.findAllByText("Matilda Muller");
    expect(employee1.length).toBeGreaterThan(1);
    const employee2 = await screen.findAllByText("Konal Kunar");
    expect(employee2.length).toBeGreaterThan(1);

    const nextPageButton = screen.getByText(">");
    fireEvent.click(nextPageButton);

    const employee6 = await screen.findAllByText("hari Kunar");
    expect(employee6.length).toBeGreaterThan(1);
  });

  test("should allow navigation to specific pages", async () => {
    renderComponent();

    const pageTwoButton = screen.getByText("2");
    fireEvent.click(pageTwoButton);

    const employee6 = await screen.findAllByText("hari Kunar");
    expect(employee6.length).toBeGreaterThan(1);
  });

  //   test("should call handleRowClick when a row is clicked", async () => {
  //     const handleRowClickMock = jest.fn();
  //     render(
  //       <Provider store={store}>
  //         <EmployeeTable
  //           data={mockEmployees}
  //           handleRowClick={handleRowClickMock}
  //         />
  //       </Provider>
  //     );

  //     const employeeRow = await screen
  //       .findByText("Matilda Muller")
  //       .parentElement.closest("tr");

  //     // Fire click on the row
  //     fireEvent.click(employeeRow);
  //     expect(handleRowClickMock).toHaveBeenCalledWith(mockEmployees[0]);
  //   });
});
