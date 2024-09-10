import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DoctorDiagnosisPieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    // Count occurrences of each "doctorDiagnosis" value
    const diagnosisCounts = {
      'Cataract Positive': 0,
      'Cataract Negative': 0,
      'Glaucoma Positive': 0,
      'Glaucoma Negative': 0,
      'Diabetes Retinopathy Positive': 0,
      'Diabetes Retinopathy Negative': 0,
      'DME-POSITIVE': 0,
      'DME-NEGATIVE': 0,
    };

    data.forEach(item => {
      const diagnosis = item.results.top;
    //   console.log(item.results.top);
      diagnosisCounts[diagnosis] = (diagnosisCounts[diagnosis] || 0) + 1;
    });
    

    const diagnosisLabels = Object.keys(diagnosisCounts);
    const diagnosisData = Object.values(diagnosisCounts);

    const dataForChart = {
      labels: diagnosisLabels,
      datasets: [{
        data: diagnosisData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(100, 200, 86, 0.7)',
          'rgba(50, 150, 250, 0.7)',
          // Add more colors as needed
        ],
      }],
    };

    const myChart = new Chart(ctx, {
        type: 'doughnut',
      data: dataForChart,
      options: {
        plugins: {
          legend: {
            position: 'bottom',
        align: 'start',  // You can change this to 'top', 'bottom', 'left', 'right', or any other desired position.
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

export default DoctorDiagnosisPieChart;
