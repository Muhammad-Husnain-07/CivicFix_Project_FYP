import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "./complaint.css";

function Complaint() {
  const allComplaints = [
    {
      id: 1,
      description: "Electricity outage",
      status: "Pending",
      submittedBy: "John Doe",
      assignedTeam: "Electrical Team",
      type: "Electricity",
    },
    {
      id: 2,
      description: "Water leakage",
      status: "Resolved",
      submittedBy: "Jane Smith",
      assignedTeam: "Plumbing Team",
      type: "Water",
    },
    {
      id: 3,
      description: "Road block",
      status: "In Progress",
      submittedBy: "Michael Johnson",
      assignedTeam: "Road Maintenance",
      type: "Roads",
    },
    {
      id: 4,
      description: "Gas leakage",
      status: "Pending",
      submittedBy: "Emily Davis",
      assignedTeam: "Gas Services",
      type: "Gas",
    },
    {
      id: 5,
      description: "Street light issue",
      status: "Resolved",
      submittedBy: "Chris Wilson",
      assignedTeam: "Electrical Team",
      type: "Electricity",
    },
    {
      id: 6,
      description: "Garbage not collected",
      status: "In Progress",
      submittedBy: "Sophia Brown",
      assignedTeam: "Sanitation",
      type: "Garbage",
    },
    {
      id: 7,
      description: "Tree blocking road",
      status: "Pending",
      submittedBy: "Liam Miller",
      assignedTeam: "Tree Cutting Services",
      type: "Roads",
    },
    {
      id: 8,
      description: "Broken pipeline",
      status: "Resolved",
      submittedBy: "Olivia Garcia",
      assignedTeam: "Plumbing Team",
      type: "Water",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayedComplaints = allComplaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { dataField: "id", text: "ID" },
    { dataField: "description", text: "Description" },
    { dataField: "status", text: "Status" },
    { dataField: "submittedBy", text: "Submitted By" },
    { dataField: "assignedTeam", text: "Assigned Team" },
    { dataField: "type", text: "Complaint Type" },
  ];

  const totalPages = Math.ceil(allComplaints.length / itemsPerPage);

  return (
    <div className="complaint-container">
      <div className="header">
        <h1>Complaints</h1>
        <button className="add-but">Add</button>
      </div>
      <div className="table-con">
        <BootstrapTable
          keyField="id"
          data={displayedComplaints}
          columns={columns}
        />
      </div>
      <div className="comp-pagination">
        <button
          className="comp-pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <span className="page-indicator">{`${currentPage}`}</span>
        <button
          className="comp-pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Complaint;
