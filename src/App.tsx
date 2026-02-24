import './App.css';
import EnergyOverview from './EnergyOverview';
import EnergyBarChart from './EnergyBarChart';
import EnergyPieChart from './EnergyPieChart';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#f7fafc' }}>
      <header style={{ textAlign: 'center', marginTop: 40, marginBottom: 24 }}>
        <h1 style={{
          fontSize: 44,
          fontWeight: 800,
          letterSpacing: 1,
          color: '#234',
          textShadow: '0 2px 12px #43e97b22',
        }}>
          Energia Appi
        </h1>
      </header>
      <EnergyOverview />
      <EnergyBarChart />
      <EnergyPieChart />
    </div>
  );
}

export default App;
