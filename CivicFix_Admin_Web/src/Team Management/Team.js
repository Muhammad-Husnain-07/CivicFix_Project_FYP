import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import './Team.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons for edit and delete
import { useState } from "react";

function Team() {
    const products = [
        { id: 1, name: "hassan",  status:"Resolved" },
        { id: 2, name: "hassan",  status:"Unresolved"},
        { id: 3, name: "hassan", status:"Pending"},
        { id: 4, name: "hassan", status:"Pending"},
        { id: 5, name: "hassan", status:"Pending"},
        { id: 6, name: "hassan", status:"Pending"},
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const displayedTeam = products.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    const columns = [
        { dataField: 'id', text: 'ID' },
        { dataField: 'name', text: 'Name' },
        
        { dataField: 'status', text: 'Status' },
        {
            dataField: 'actions',
            text: 'Actions',
            formatter: (cell, row) => (
                <div className="action-icons">
                    <FaEdit className="edit-icon" title="Edit" />
                    <FaTrashAlt className="delete-icon" title="Delete" />
                </div>
            )
        }
    ];
    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
        <div className="team-container">
            <div className="team-content">
                <h1>Manage Team</h1>
                </div>
                <div>
                    <button className="adds">Add</button>
                </div>
                <div className="table-container">
    <BootstrapTable
        keyField="id"
        data={displayedTeam}
        columns={columns}
       
        
               
    />
     <div className="paginations">
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>

          <span className="Page-Indicator">{`${currentPage}`}</span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
        </div>
      
</div>
        </div>
    );
}

export default Team;
