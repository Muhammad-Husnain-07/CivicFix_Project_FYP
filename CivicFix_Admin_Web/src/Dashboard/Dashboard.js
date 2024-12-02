import React from 'react';

import Card from './Card/Card';
import CustomPieChart from './Charts/CustomPieChart'; // Import your new chart component
import './App.css';


function Dashboard() {
 

  // Data and colors for the pie charts
  const data1 = [
    { name: "",value: 30 },
    
  ];
  
  const colors1 = ["#4CAF50"]; // Unique colors for Chart 1

  const data2 = [
    { name: "", value: 150 },
    
  ];
  
  const colors2 = ["#2196F3"]; // Unique colors for Chart 2

  const data3 = [
    { name: "", value: 100 },
    
  ];
  
  const colors3 = ["#FF9800"]; // Unique colors for Chart 3

  const data4 = [
    { name: "", value: 120 },
   
  ];
  
  const colors4 = ["#795548"]; // Unique colors for Chart 4

  return (
    <>
      <div className="app-container">
       
        <div className="main-content">
          <h1 className="dash">Dashboard</h1>
          <div className="welcome">
            <h3 className="wel">Welcome back, Admin</h3>
          </div>
          <div className="card-container">
            <Card title="Total Issues" count={500}  />
            <Card title="Resolved Issues" count={200}  />
            <Card title="Pending Issues" count={200}  />
            <Card title="Not Resolved" count={100}  />
          </div>
          <div className="chart-container">
            
          <div className="charts-row">
                 <div className="chart-card">
                 <p className='texts'>Total Issues</p>
                   <CustomPieChart data={data1} colors={colors1} />
                   <p className='textt'>100%</p>
                  
              </div>
                 <div className="chart-card">
                 <p className='text'>Resolved Issues</p>
                    <CustomPieChart data={data2} colors={colors2} />
                    <p className='textt'>45%</p>
                 </div>
                  <div className="chart-card">
                  <p className='text'>Pending Issues</p>
                    <CustomPieChart data={data3} colors={colors3} />
                    <p className='textt'>45%</p>
                 </div>
                   <div className="chart-card">
                   <p className='text'>Not Resolved</p>
                   <CustomPieChart data={data4} colors={colors4} />
                   <p className='textt'>10%</p>
                  </div>
                </div>

          </div>
         
        </div>
      </div>
    </>
  );
}

export default Dashboard;
