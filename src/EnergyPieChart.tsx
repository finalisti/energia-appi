import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Sähkö', 'Lämpö', 'Vesi', 'Jäte', 'Muu'],
  datasets: [
    {
      label: 'Kulutuksen osuus',
      data: [45, 25, 15, 10, 5],
      backgroundColor: [
        'rgba(67, 233, 123, 0.8)',
        'rgba(33, 150, 243, 0.7)',
        'rgba(255, 193, 7, 0.7)',
        'rgba(156, 39, 176, 0.7)',
        'rgba(244, 67, 54, 0.7)'
      ],
      borderColor: '#fff',
      borderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { font: { size: 15 } },
    },
    title: {
      display: true,
      text: 'Energian kulutuksen jakautuminen lähteittäin',
      font: { size: 20 },
      color: '#234',
    },
  },
};

export default function EnergyPieChart() {
  return (
    <div style={{ maxWidth: 480, margin: '32px auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #43e97b22', padding: 24 }}>
      <Pie data={data} options={options} />
    </div>
  );
}
