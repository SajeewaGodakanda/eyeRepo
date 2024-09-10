import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length === 0) return;

    const ctx = chartRef.current.getContext('2d');
    
    // Count occurrences of each "type" value
    const counts = {};
    data.forEach(item => {
      const type = item.type;
      counts[type] = (counts[type] || 0) + 1;
    });

    const typeLabels = Object.keys(counts);
    const typeCounts = Object.values(counts);

    const dataForChart = {
      labels: typeLabels,
      datasets: [{
        data: typeCounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
      }],
    };

    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: dataForChart,
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

export default PieChartComponent;
