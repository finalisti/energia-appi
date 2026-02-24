import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: [
    'Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu',
    'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'
  ],
  datasets: [
    {
      label: 'Kulutuksesi (kWh)',
      data: [250, 220, 210, 200, 180, 170, 160, 170, 180, 200, 220, 240],
      backgroundColor: 'rgba(67, 233, 123, 0.7)',
      borderRadius: 8,
      barPercentage: 0.45,
      categoryPercentage: 0.6,
    },
    {
      label: 'Keskimääräinen kotitalous (kWh)',
      data: [230, 210, 200, 190, 170, 160, 150, 160, 170, 190, 210, 220],
      backgroundColor: 'rgba(33, 150, 243, 0.5)',
      borderRadius: 8,
      barPercentage: 0.45,
      categoryPercentage: 0.6,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        font: { size: 15 },
      },
    },
    title: {
      display: true,
      text: 'Kuukausittainen energiankulutus ja vertailu',
      font: { size: 20 },
      color: '#234',
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#234', font: { size: 14 } },
    },
    y: {
      grid: { color: '#e0e0e0' },
      ticks: { color: '#234', font: { size: 14 } },
      beginAtZero: true,
    },
  },
};

export default function EnergyBarChart() {
  return (
    <div style={{ maxWidth: 650, margin: '32px auto 0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #43e97b22', padding: 24 }}>
      <Bar data={data} options={options} />
      <div style={{ textAlign: 'center', marginTop: 18, color: '#234', fontSize: 15 }}>
        <b>Vihreä:</b> Kuukausittainen kulutuksesi &nbsp; | &nbsp; <b>Sininen:</b> Keskimääräinen kotitalous Suomessa
      </div>
    </div>
  );
}
