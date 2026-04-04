
import { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const mockConsumption = 3200; // kWh per year (example)
const mockCO2 = 900; // kg CO2 per year (example)

// بيانات استهلاك سنوي وهمية
const yearlyData = [3200, 3100, 3300, 3400, 3000];
const yearlyLabels = ['2022', '2023', '2024', '2025', '2026'];

// بيانات استهلاك شهري وهمية
const monthlyData = [250, 220, 270, 300, 280, 260, 240, 230, 210, 200, 190, 180];
const monthlyLabels = ['Tammi', 'Helmi', 'Maalis', 'Huhti', 'Touko', 'Kesä', 'Heinä', 'Elo', 'Syys', 'Loka', 'Marras', 'Joulu'];

// بيانات استهلاك يومي وهمية (شهر 30 يوم)
const dailyData = Array.from({ length: 30 }, () => Math.round(5 + Math.random() * 5));
const dailyLabels = Array.from({ length: 30 }, (_, idx) => `${idx + 1}`);

export default function EnergyOverview() {
  const [count, setCount] = useState(0);
  return (
    <div
      style={{
        maxWidth: 700,
        margin: "2.5rem auto",
        padding: 32,
        background: "linear-gradient(135deg, #e0f7fa 0%, #f1f8e9 100%)",
        borderRadius: 20,
        boxShadow: "0 6px 32px #0002, 0 1.5px 6px #4caf5022",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontWeight: 700, fontSize: 28, color: "#234", marginBottom: 28 }}>
        Energiankulutuksen Yhteenveto
      </h2>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "2.5rem 0 1.5rem 0" }}>
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 32,
            fontWeight: 700,
            boxShadow: "0 4px 18px #43e97b44",
            border: "4px solid #fff",
          }}
        >
          {mockConsumption} <span style={{ fontSize: 20, fontWeight: 400 }}>kWh</span>
          <span style={{ fontSize: 16, fontWeight: 400, marginTop: 2 }}>vuodessa</span>
        </div>
      </div>
      {/* رسم بياني سنوي */}
      <div style={{ margin: '32px 0 32px 0', background: '#fff', borderRadius: 16, padding: 18, boxShadow: '0 2px 12px #0001' }}>
        <h3 style={{ color: '#388e3c', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Kulutus vuosittain (kWh)</h3>
        <Line
          data={{
            labels: yearlyLabels,
            datasets: [
              {
                label: 'Vuosikulutus',
                data: yearlyData,
                borderColor: '#43e97b',
                backgroundColor: 'rgba(67,233,123,0.15)',
                tension: 0.3,
                pointRadius: 4,
                fill: true,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              title: { display: false },
            },
            scales: {
              y: { beginAtZero: true },
            },
          }}
          height={120}
        />
      </div>

      {/* رسم بياني شهري */}
      <div style={{ margin: '32px 0 32px 0', background: '#fff', borderRadius: 16, padding: 18, boxShadow: '0 2px 12px #0001' }}>
        <h3 style={{ color: '#388e3c', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Kulutus kuukausittain (kWh)</h3>
        <Bar
          data={{
            labels: monthlyLabels,
            datasets: [
              {
                label: 'Kuukausikulutus',
                data: monthlyData,
                backgroundColor: '#43e97b',
                borderRadius: 6,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              title: { display: false },
            },
            scales: {
              y: { beginAtZero: true },
            },
          }}
          height={120}
        />
      </div>

      {/* رسم بياني يومي */}
      <div style={{ margin: '32px 0 32px 0', background: '#fff', borderRadius: 16, padding: 18, boxShadow: '0 2px 12px #0001' }}>
        <h3 style={{ color: '#388e3c', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Kulutus päivittäin (kWh)</h3>
        <Bar
          data={{
            labels: dailyLabels,
            datasets: [
              {
                label: 'Päiväkulutus',
                data: dailyData,
                backgroundColor: '#38f9d7',
                borderRadius: 6,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              title: { display: false },
            },
            scales: {
              y: { beginAtZero: true },
            },
          }}
          height={120}
        />
      </div>
      <button
        style={{
          padding: '10px 28px',
          fontSize: 18,
          fontWeight: 600,
          borderRadius: 8,
          border: 'none',
          background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
          color: '#fff',
          boxShadow: '0 2px 8px #43e97b33',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onClick={() => setCount(count + 1)}
      >
        Lisää kulutusta
      </button>
      <div style={{ fontSize: 22, fontWeight: 700, color: '#234', marginTop: 10 }}>
        Nykyinen määrä: {count}
      </div>
      <div style={{
        background: '#e8f5e9',
        borderRadius: 12,
        padding: '18px 16px',
        margin: '18px 0 18px 0',
        boxShadow: '0 1.5px 8px #43e97b22',
        textAlign: 'left',
      }}>
        <div style={{ fontWeight: 700, color: '#388e3c', fontSize: 18, marginBottom: 6 }}>
          Vinkkejä energiansäästöön:
        </div>
        <ul style={{ margin: 0, paddingLeft: 22, color: '#234', fontSize: 15 }}>
          <li>Sammuta valot ja laitteet, kun et käytä niitä.</li>
          <li>Käytä energiatehokkaita laitteita ja LED-lamppuja.</li>
          <li>Vältä turhaa veden ja sähkön kulutusta.</li>
          <li>Seuraa kulutustasi säännöllisesti ja aseta tavoitteita.</li>
        </ul>
      </div>
      <p style={{ fontSize: 18, color: "#234", margin: "0 0 10px 0" }}>
        <span style={{ fontWeight: 500 }}>Arvioitu hiilijalanjälki:</span>
        <span style={{ fontWeight: 700, color: "#388e3c" }}> {mockCO2} kg CO₂/vuosi</span>
      </p>
      <p style={{ fontSize: 16, color: "#333", margin: 0 }}>
        Tämä on esimerkki energiankulutuksen esitystavasta. Voit seurata omaa kulutustasi ja nähdä vaikutukset ympäristöön helposti.
        <br />
        <span style={{ color: '#388e3c', fontWeight: 500 }}>
          Jokainen pieni teko säästää energiaa ja auttaa ympäristöä!
        </span>
      </p>
    </div>
  );
}

