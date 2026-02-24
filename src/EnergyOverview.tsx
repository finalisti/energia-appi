
import { useState } from 'react';
const mockConsumption = 3200; // kWh per year (example)
const mockCO2 = 900; // kg CO2 per year (example)

export default function EnergyOverview() {
  const [count, setCount] = useState(0);
  return (
    <div
      style={{
        maxWidth: 440,
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
      <div style={{ margin: '18px 0 24px 0' }}>
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
      </div>
      <p style={{ fontSize: 18, color: "#234", margin: "0 0 10px 0" }}>
        <span style={{ fontWeight: 500 }}>Arvioitu hiilijalanjälki:</span>
        <span style={{ fontWeight: 700, color: "#388e3c" }}> {mockCO2} kg CO₂/vuosi</span>
      </p>
      <p style={{ fontSize: 16, color: "#333", margin: 0 }}>
        Tämä on esimerkki energiankulutuksen esitystavasta. Voit seurata omaa kulutustasi ja nähdä vaikutukset ympäristöön helposti.
      </p>
    </div>
  );
}
