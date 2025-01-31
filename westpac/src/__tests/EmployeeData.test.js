import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EmployeeData from "../Components/EmployeeData";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useSelector } from "react-redux";
import moment from "moment";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("EmployeeData Component", () => {
  const employees = [
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
  ];

  const companyInfo = {
    companyName: "Kovacek - Koss",
    companyMotto: "turn-key empower communities",
    companyEst: "2021-01-14T11:02:12.073Z",
  };

  beforeEach(() => {
    useSelector.mockImplementation((callback) =>
      callback({ company: { employees, companyInfo } })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render company name, motto, and establishment year", () => {
    render(
      <Provider store={store}>
        <EmployeeData />
      </Provider>
    );

    expect(screen.getByText("Kovacek - Koss")).toBeInTheDocument();
    expect(
      screen.getByText("turn-key empower communities")
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Since ${moment("2021-01-14T11:02:12.073Z").year()}`)
    ).toBeInTheDocument();
  });

  test("should render employee table and handle row click", async () => {
    render(
      <Provider store={store}>
        <EmployeeData />
      </Provider>
    );

    const row = screen
      .getByText("90d3669e-3093-439c-8ca0-1bf746922c5d")
      .closest("tr");
    expect(row).toBeInTheDocument();
    fireEvent.click(row);
    await waitFor(() =>
      expect(screen.getByText("Customer Brand Technician")).toBeInTheDocument()
    );

    expect(screen.getByText("32 y")).toBeInTheDocument();
    expect(screen.getByText("DOJ: 2023-07-21")).toBeInTheDocument();
    expect(
      screen.getByText("Quas est officia sit ut debitis rerum non.")
    ).toBeInTheDocument();
  });

  test("should close modal when close button is clicked", async () => {
    render(
      <Provider store={store}>
        <EmployeeData />
      </Provider>
    );

    const row = screen.getByText("90d3669e-3093-439c-8ca0-1bf746922c5d");
    fireEvent.click(row);
    await waitFor(() =>
      expect(screen.getByText("Customer Brand Technician")).toBeInTheDocument()
    );
    const closeButton = screen.getByTestId("close");
    fireEvent.click(closeButton);
    await waitFor(() =>
      expect(screen.queryByText("Customer Brand Technician")).toBeNull()
    );
  });
});
