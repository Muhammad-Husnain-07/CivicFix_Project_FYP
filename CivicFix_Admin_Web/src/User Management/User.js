import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import './User.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons for edit and delete
import { useState } from "react";

function User() {
    const products = [
        { id: 1, name: "hassan", email: "hassan@gmail.com", address: "ali por", type:"SNGPL", status:"Resolved" },
        { id: 2, name: "hassan", email: "hassan@gmail.com", address: "ali por" ,type:"LESCO", status:"Unresolved"},
        { id: 3, name: "hassan", email: "hassan@gmail.com", address: "ali por" ,type:"LWMC",status:"Pending"},
        { id: 4, name: "hassan", email: "hassan@gmail.com", address: "ali por" ,type:"LWMC",status:"Pending"},
        { id: 5, name: "hassan", email: "hassan@gmail.com", address: "ali por" ,type:"LWMC",status:"Pending"},
    ];
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const itemsPerPage = 3; // Items per page
  
    const handlePageChange = (page) => {
      setCurrentPage(page); // Update current page
    };
  
    const Products = products.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    const columns = [
        { dataField: 'id', text: 'ID' },
        { dataField: 'name', text: 'Name' },
        { dataField: 'email', text: 'Email' },
        { dataField: 'address', text: 'Address' },  
        { dataField: 'type', text: 'Type' },
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
        <div className="user-container">
            <div className="content">
                <h1>Manage User</h1>
                </div>
                <div>
                    <button className="add">Add</button>
                </div>
                <div className="tab-container">
    <BootstrapTable
        keyField="id"
        data={Products}
        columns={columns}
       
               
    />
     <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>

          <span className="page-indicator">{`${currentPage}`}</span>
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

export default User;
