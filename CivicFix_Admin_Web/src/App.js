import React from 'react';
import './App.css';
import { FaHome, FaUser, FaBell, FaCog, FaSignOutAlt, FaTasks } from "react-icons/fa";
import DonutChart from './DonutChart';

function App() {
  const totalcomplaints = [
    { name: 'Total complain', value: 100 }
  ];

  const completed = [
    { name: 'Completed', value: 70 }
    
  ];

  const remaining = [
    { name: 'Remaining', value: 30 }
    
  ];
  return (
    <>
   <div className="app-container">
  <nav className="navbar">
    <div className="heading">
      <h1>CIVICFIX</h1>
    </div>
    <ul className="navbar-menu">
      <li><FaHome className="icon" />Dashboard</li>
      <li><FaUser className="icon" />Profile</li>
      <li><FaBell className="icon" />Complaints</li>
      <li><FaTasks className="icon" />Notification</li>
      <li><FaCog className="icon" />Setting</li>
      <li><FaSignOutAlt className="icon" />Logout</li>
    </ul>
  </nav>

  <div className="main-content">
    <h1 className="dash">Dashboard</h1>
    <div className='welcome'> <h3 className='wel'>Welcome back, Admin</h3>
    </div>
    <div className="App">
      <h1>Statistics Overview</h1>

      
      <DonutChart
        data={totalcomplaints}
        colors={['#0088FE', '#FF0000']}
        title="Total complaints"
      />

      
      <DonutChart
        data={completed}
        colors={['#00C49F', '#FFBB28']}
        title="Completed"
      />

      
      <DonutChart
        data={remaining}
        colors={['#8884d8', '#FF8042']}
        title="Remaining"
      />
    </div>
  </div>
  
</div>


   </>
  );
}

export default App;
