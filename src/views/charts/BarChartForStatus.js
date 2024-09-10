import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChartForStatusComponent = ({ data }) => {
    const chartRef = useRef(null);

  useEffect(() => {
    if (data.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    // Count occurrences of each "status" value
    const counts = {
      decline: 0,
      accept: 0,
      pending: 0,
    };

    data.forEach(item => {
      const status = item.status;
      counts[status] = (counts[status] || 0) + 1;
    });

    const statusLabels = Object.keys(counts);
    const statusCounts = Object.values(counts);

    const dataForChart = {
      labels: statusLabels,
      datasets: [
        {
          label: 'Status Count',
          data: statusCounts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
          ],
        },
      ],
    };

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: dataForChart,
      options: {
        plugins: {
          legend: {
            display: false, // Hide the legend at the top of the chart
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
export default BarChartForStatusComponent;
