import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Charts({ transactions }) {
  const categories = [];
  const amounts = [];
  const colors = [];

  // aggregate by category
  const map = {};
  transactions.forEach((tx) => {
    if (!map[tx.category]) map[tx.category] = 0;
    map[tx.category] += tx.amount;
  });

  Object.entries(map).forEach(([cat, amt]) => {
    categories.push(cat);
    amounts.push(amt);
    colors.push("#" + Math.floor(Math.random()*16777215).toString(16));
  });

  const pieData = {
    labels: categories,
    datasets: [
      {
        data: amounts,
        backgroundColor: colors,
      },
    ],
  };

  const barData = {
    labels: categories,
    datasets: [
      {
        label: 'Spending by category',
        data: amounts,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div className="charts">
      <div className="chart">
        <h3>Pie Chart</h3>
        <Pie data={pieData} />
      </div>
      <div className="chart">
        <h3>Bar Chart</h3>
        <Bar data={barData} />
      </div>
    </div>
  );
}
