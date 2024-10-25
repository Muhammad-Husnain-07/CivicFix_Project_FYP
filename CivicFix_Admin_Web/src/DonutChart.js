// src/DonutChart.js

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

function DonutChart({ data, colors, title }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DonutChart;
