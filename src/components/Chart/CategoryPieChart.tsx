import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryPieChart({ data }) {
  return (
    <div className="w-1/3 rounded border p-4 shadow-md">
      <h1 className="mb-2 font-semibold">Categories</h1>
      <Pie data={data} />
    </div>
  );
}

export default CategoryPieChart;
