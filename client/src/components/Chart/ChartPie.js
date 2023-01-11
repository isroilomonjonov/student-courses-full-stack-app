import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



export function ChartPie(props) {
 const data = {
    labels: props.data.label,
    datasets: [
      {
        label: '# of Votes',
        data:props.data.value,
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
         
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie width={50}
  height={50} data={data}  options={{ maintainAspectRatio: true }} />;
}
