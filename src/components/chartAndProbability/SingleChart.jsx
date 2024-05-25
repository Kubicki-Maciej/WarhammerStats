import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function SingleChart(
  {clickedElement, chartLabelData, chartProbabilityData}
){
    console.log('chartLabelData');
    console.log('faker');
    console.log(faker.datatype.number({ min: 0, max: 1000 }));
    console.log(chartLabelData);
    console.log(chartProbabilityData);
    const labels = chartLabelData
    const data = {
        labels,
        datasets: [
          {
            label: 'To hit table',
            data:  chartProbabilityData,
            // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
      };

  return (
    // <div>chart</div>
    <div style={{
      width:"400px",
    }}>
      <Bar options={options} data={data} />
    </div>
    
  )
}
