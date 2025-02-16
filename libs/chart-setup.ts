const colors = [
  '#36b9cc',
  '#1cc88a',
  '#6f42c1',
  '#e74a3b',
  '#fd7e14',
  '#f6c23e',
  '#84cc16',
  '#22c55e',
  '#2563eb',
  '#f43f5e',
  '#8b5cf6',
  '#ea580c',
  '#facc15',
];

// Populate Data for ChartJS
function populateData(param: any, type?: string) {
  let labels = [];
  let totals = [];
  let bgColor = [];
  let borderColor = [];
  let labelName = '';
  switch (type) {
    // type book = label & total
    case 'book':
      param.map((item: any) => labels.push(item.label));
      param.map((item: any) => totals.push(item.total));
      bgColor = colors.slice(0, 13);
      borderColor = colors.slice(0, 13);
      labelName = 'Total Book';
      break;
    // type quote = label & total
    case 'quote':
      param.map((item: any) => labels.push(item.label));
      param.map((item: any) => totals.push(item.total));
      bgColor = colors.slice(1, 13);
      borderColor = colors.slice(1, 13);
      labelName = 'Total Quote';
      break;
    default:
      param.map((item: any) => labels.push(item.label));
      param.map((item: any) => totals.push(item.total));
      bgColor = colors.slice(2, 13);
      borderColor = colors.slice(3, 13);
      labelName = 'Total';
      break;
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: labelName,
        data: totals,
        backgroundColor: bgColor,
        categoryPercentage: 0.8,
        barPercentage: 0.8,
        // borderColor: type == "song" ? "#888" : null,
        // borderWidth: type == "song" ? 1 : null,
      },
    ],
  };
  return data;
}

const options = {
  plugins: {
    legend: {
      labels: {
        font: {},
        color: '#888',
      },
    },
  },
};

function optionsBarChart(theme?: string) {
  return {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#888',
        },
        grid: {
          color: theme == 'dark' ? '#3f3f46' : '#e2e8f0',
        },
      },
      y: {
        ticks: {
          color: '#888',
          stepSize: 1,
        },
        grid: {
          color: theme == 'dark' ? '#3f3f46' : '#e2e8f0',
        },
      },
    },
  };
}

function optionsHorizontalBarChart(theme?: string, windowWidth?: number) {
  return {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: '#888',
          stepSize: 1,
        },
        grid: {
          color: theme == 'dark' ? '#3f3f46' : '#e2e8f0',
        },
      },
      y: {
        ticks: {
          color: '#888',
          autoSkip: windowWidth > 500 ? false : true,
          // autoSkip: false,
          font: {
            size: 11,
          },
        },
        grid: {
          color: theme == 'dark' ? '#3f3f46' : '#e2e8f0',
        },
      },
    },
  };
}

export { populateData, options, optionsBarChart, optionsHorizontalBarChart };
