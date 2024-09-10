import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CombinationChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    // Count occurrences of each "type" and "status" value
    const typeCounts = {
      Glaucoma: 0,
      Cataract: 0,
      DME: 0,
      DR: 0,
    };

    const statusCounts = {
      decline: [],
      accept: [],
      pending: [],
    };

    data.forEach(item => {
      const type = item.type;
      const status = item.status;
      typeCounts[type] = (typeCounts[type] || 0) + 1;
      statusCounts[status].push(type);
    });

    const typeLabels = Object.keys(typeCounts);
    const typeData = Object.values(typeCounts);
    const statusLabels = Object.keys(statusCounts);

    const dataForChart = {
      labels: typeLabels,
      datasets: [
        {
          type: 'bar',
          label: 'Type Count',
          data: typeData,
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          yAxisID: 'y-axis-1',
        },
        {
          type: 'line',
          label: 'Decline Count',
          data: statusCounts.decline,
          borderColor: 'rgba(54, 162, 235, 0.7)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          yAxisID: 'y-axis-2',
        },
        {
          type: 'line',
          label: 'Accept Count',
          data: statusCounts.accept,
          borderColor: 'rgba(255, 206, 86, 0.7)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          yAxisID: 'y-axis-2',
        },
        {
          type: 'line',
          label: 'Pending Count',
          data: statusCounts.pending,
          borderColor: 'rgba(75, 192, 192, 0.7)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          yAxisID: 'y-axis-2',
        },
      ],
    };

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: dataForChart,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
          y1: {
            type: 'linear',
            position: 'right',
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      // Cleanup chart when the component unmounts
      myChart.destroy();
    };
  }, [data]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default CombinationChartComponent;
