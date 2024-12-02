// CustomPieChart.js
import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const CustomPieChart = ({ data, colors, width = 150, height = 150 }) => { // Reduced size
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="63%"
        outerRadius={60} // Adjust outer radius for smaller chart
        innerRadius={30} // Adjust inner radius for smaller chart
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Legend verticalAlign="bottom" height={36} />
    </PieChart>
  );
};

export default CustomPieChart;
