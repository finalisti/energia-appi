import React, { useEffect, useState } from 'react';
import './Dashboard.css';

import EnergyPieChart from './EnergyPieChart';
import EnergyOverview from './EnergyOverview';
import EnergyDaily from './EnergyDaily';
import EnergyHourly from './EnergyHourly';
import EnergyMonthly from './EnergyMonthly';
import EnergyBarChart from './EnergyBarChart';



interface ContractData {
  subscription: string;
  power: string;
  endDate: string;
  billDetails: string;
}

interface BillData {
  id: number;
  amount: string;
  date: string;
  status: string;
}

interface EnergyData {
  hourly: { hour: number; value: number }[];
  daily: { day: number; value: number }[];
  monthly: { month: number; value: number }[];
}

interface DashboardProps {
  username: string | null;
  onLogout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ username, onLogout }) => {
  // Tervetuloviestin näyttäminen 2,5 sekunniksi
  const [showWelcome, setShowWelcome] = useState(true);
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => setShowWelcome(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  const [activePage, setActivePage] = useState('Etusivu');
  const [contract, setContract] = useState<ContractData | null>(null);
  const [bills, setBills] = useState<BillData[]>([]);
  const [energy, setEnergy] = useState<EnergyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // tuoden sopimustiedot
  const fetchContract = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:4000/api/contract');
      if (!res.ok) throw new Error('Sopimustietojen hakeminen epäonnistui');
      const data: ContractData = await res.json();
      setContract(data);
    } catch (e) {
      if (e instanceof Error) setError(e.message || 'Sopimuksessa tapahtui virhe');
      else setError('Sopimuksessa tapahtui virhe');
    } finally {
      setLoading(false);
    }
  };

  // tuoden laskutiedot
  const fetchBills = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:4000/api/bills');
      if (!res.ok) throw new Error('Laskujen hakeminen epäonnistui');
      const data: BillData[] = await res.json();
      setBills(data);
    } catch (e) {
      if (e instanceof Error) setError(e.message || 'Laskuissa tapahtui virhe');
      else setError('Laskuissa tapahtui virhe');
    } finally {
      setLoading(false);
    }
  };

  // tuoda sähkötiedot
  const fetchEnergy = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:4000/api/energy');
      if (!res.ok) throw new Error('Sähkötietojen hakeminen epäonnistui');
      const data: EnergyData = await res.json();
      setEnergy(data);
    } catch (e) {
      if (e instanceof Error) setError(e.message || 'Sähkössä tapahtui virhe');
      else setError('Sähkössä tapahtui virhe');
    } finally {
      setLoading(false);
    }
  };
//tutustu Reactin useEffect-hookkiin, joka mahdollistaa sivun tietojen päivittämisen automaattisesti, kun käyttäjä vaihtaa näkymää. Näin varmistetaan, että käyttäjällä on aina ajantasaiset tiedot sopimuksista, laskuista ja sähkönkulutuksesta.
  useEffect(() => {
    if (activePage === 'Etusivu') fetchContract();
    if (activePage === 'Laskut') fetchBills();
    if (activePage === 'Sähkö') fetchEnergy();
// Voit lisätä muita tietohakuja muihin sivuihin tarpeen mukaan
    
  }, [activePage]);

  // sopimuksen latausfunktio
  const handleDownload = () => {
    window.open('http://localhost:4000/api/contract/download', '_blank');
  };




  // Sisältö, joka näytetään aktiivisesta sivusta riippuen
  let pageContent = null;
  if (activePage === 'Energia analyytikat') {
    pageContent = (
      <section style={{padding: 0, background: 'none'}}>
        <EnergyOverview />
        <EnergyBarChart />
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', margin: '32px 0'}}>
          <div style={{flex: 1, minWidth: 320, maxWidth: 500}}><EnergyDaily /></div>
          <div style={{flex: 1, minWidth: 320, maxWidth: 500}}><EnergyHourly /></div>
          <div style={{flex: 1, minWidth: 320, maxWidth: 500}}><EnergyMonthly /></div>
        </div>
        <EnergyPieChart />
      </section>
    );
  } else if (activePage === 'Omat tiedot') {
    pageContent = (
      <section className="contract-info">
        <h3>Omat tiedot</h3>
        <div>Käyttäjänimi: <strong>{username}</strong></div>
        {/* Lisää muita henkilötietoja tähän jos saatavilla */}
      </section>
    );
  } else if (activePage === 'Käyttäjän oikeudet') {
    pageContent = (
      <section className="contract-info">
        <h3>Käyttäjän oikeudet</h3>
        <ul>
          <li>Pääsy henkilötietoihin.</li>
          <li>Salasanan ja tietojen muokkaus.</li>
          <li>Pyydä tilin poistamista.</li>
          <li>Näytä laskujen ja sopimusten historia.</li>
        </ul>
      </section>
    );
  } else if (activePage === 'Etusivu') {
    pageContent = (
      <>
        <header className="dashboard-header">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h1>Hallintapaneeli</h1>
            {username && (
              <span style={{ color: '#2196f3', fontWeight: 600, fontSize: 18, marginTop: 4 }}>
                Tervetuloa, {username}!
              </span>
            )}
          </div>
          <div className="dashboard-actions">
            <button onClick={fetchContract} disabled={loading}>{loading ? 'Päivitetään...' : 'Päivitä tiedot'}</button>
            <button onClick={handleDownload}>Lataa sopimus</button>
          </div>
        </header>
        <section className="contract-info">
          <h3>Sopimustiedot</h3>
          {error && <div style={{color: 'red', marginBottom: 8}}>{error}</div>}
          {!contract && !error ? (
            <div>Ladataan...</div>
          ) : contract && (
            <ul>
              <li>Tilaus: <strong>{contract.subscription}</strong></li>
              <li>Sähköteho: <strong>{contract.power.replace('كيلوواط', 'kW')}</strong></li>
              <li>Päättymispäivä: <strong>{contract.endDate}</strong></li>
              <li>Laskun tiedot: <strong>{(() => {
                
                const amountNumber = parseFloat(contract.billDetails.replace(/[^\d.]/g, ''));
                if (isNaN(amountNumber)) return contract.billDetails;
                return (amountNumber * 0.25).toFixed(2) + ' €';
              })()}</strong></li>
            </ul>
          )}
        </section>
        <section className="energy-source-chart">
          <h3>Energian lähde</h3>
          <EnergyPieChart />
        </section>
        <div style={{marginTop: 32, textAlign: 'center'}}>
          <button
            style={{
              padding: '12px 32px',
              fontSize: 18,
              fontWeight: 600,
              borderRadius: 8,
              border: 'none',
              background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
              color: '#fff',
              boxShadow: '0 2px 8px #43e97b33',
              cursor: 'pointer',
              margin: '0 8px'
            }}
            onClick={() => setActivePage('Energia analyytikat')}
          >
            Näytä edistyneet energia-analyysit
          </button>
        </div>
      </>
    );
  } else if (activePage === 'Sähkö') {
    pageContent = (
      <section className="contract-info">
        <h3>Sähkötiedot</h3>
        {error && <div style={{color: 'red', marginBottom: 8}}>{error}</div>}
        {!energy && !error ? (
          <div>Ladataan...</div>
        ) : energy && (
          <>
            <div>Päivän 1 kulutus: <strong>{energy.daily[0]?.value} kWh</strong></div>
            <div>Tämän kuun kulutus: <strong>{energy.monthly[0]?.value} kWh</strong></div>
            {/* Voit näyttää kaavion tässä */}
          </>
        )}
      </section>
    );
  } else if (activePage === 'Laskut') {
    pageContent = (
      <section className="contract-info">
        <h3>Laskut</h3>
        {error && <div style={{color: 'red', marginBottom: 8}}>{error}</div>}
        {!bills.length && !error ? (
          <div>Ladataan...</div>
        ) : (
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{background: '#f0f0f0'}}>
                <th>Numero</th>
                <th>Määrä</th>
                <th>Päivämäärä</th>
                <th>Tila</th>
              </tr>
            </thead>
            <tbody>
              {bills.map(bill => {
                // Muunna laskun määrä euroiksi
                const amountNumber = parseFloat(bill.amount.replace(/[^\d.]/g, ''));
                const euroAmount = isNaN(amountNumber) ? bill.amount : (amountNumber * 0.25).toFixed(2) + ' €';
                // Muunna tila suomeksi
                let statusFi = bill.status;
                if (bill.status === 'maksettu') statusFi = 'Maksettu';
                else if (bill.status === 'ei maksettu') statusFi = 'Ei maksettu';
                return (
                  <tr key={bill.id}>
                    <td>{bill.id}</td>
                    <td>{euroAmount}</td>
                    <td>{bill.date}</td>
                    <td>{statusFi}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    );
  } else if (activePage === 'Sopimukset') {
    pageContent = (
      <section className="contract-info">
        <h3>Sopimukset</h3>
        <div>Tulossa pian...</div>
      </section>
    );
  } else if (activePage === 'Tuki') {
    pageContent = (
      <section className="contract-info">
        <h3>Tuki</h3>
        <div>Ota yhteyttä tukeen: karim@energia.com</div>
      </section>
    );
  }

  return (
    <div className="dashboard-container" style={{display: 'flex', minHeight: '100vh', background: '#f7f8fa'}}>
      <aside className="sidebar custom-sidebar" style={{width: 80, background: '#222e3a', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0', gap: 0}}>
        <div style={{marginBottom: 32}}>
          <img src={`https://ui-avatars.com/api/?name=${username || 'User'}&background=43e97b&color=fff&rounded=true&size=48`} alt="avatar" style={{width: 48, height: 48, borderRadius: '50%', border: '2px solid #fff', boxShadow: '0 2px 8px #43e97b44'}} />
        </div>
        <div className="sidebar-list" style={{display: 'flex', flexDirection: 'column', gap: 8, width: '100%'}}>
          <div className={`sidebar-item${activePage === 'Energia analyytikat' ? ' active' : ''}`} onClick={() => setActivePage('Energia analyytikat')} title="Energia analyytikat" style={{justifyContent: 'center'}}>
            <span className="sidebar-icon">📊</span>
          </div>
          <div className={`sidebar-item${activePage === 'Etusivu' ? ' active' : ''}`} onClick={() => setActivePage('Etusivu')} title="Etusivu" style={{justifyContent: 'center'}}>
            <span className="sidebar-icon">🏠</span>
          </div>
          <div className={`sidebar-item${activePage === 'Sähkö' ? ' active' : ''}`} onClick={() => setActivePage('Sähkö')} title="Sähkö" style={{justifyContent: 'center'}}>
            <span className="sidebar-icon">💡</span>
          </div>
          <div className={`sidebar-item${activePage === 'Laskut' ? ' active' : ''}`} onClick={() => setActivePage('Laskut')} title="Laskut" style={{justifyContent: 'center'}}>
            <span className="sidebar-icon">🧾</span>
          </div>
          <div className={`sidebar-item${activePage === 'Sopimukset' ? ' active' : ''}`} onClick={() => setActivePage('Sopimukset')} title="Sopimukset" style={{justifyContent: 'center'}}>
            <span className="sidebar-icon">📄</span>
          </div>
          <div className={`sidebar-item${activePage === 'Tuki' ? ' active' : ''}`} onClick={() => setActivePage('Tuki')} title="Tuki" style={{justifyContent: 'center'}}>
            <span className="sidebar-icon">💬</span>
          </div>
        </div>
        <div style={{flex: 1}} />
        {onLogout && (
          <button className="sidebar-logout-btn" onClick={onLogout} style={{marginBottom: 8, background: '#fff', color: '#43e97b', fontWeight: 700, border: 'none', borderRadius: 8, padding: '10px 0', fontSize: 16, cursor: 'pointer', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #43e97b22', transition: 'background 0.2s'}} title="تسجيل الخروج">🚪</button>
        )}
      </aside>
      {/* المحتوى الرئيسي */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        {/* شريط علوي صغير */}
        <header style={{
          width: '100%',
          background: '#fff',
          color: '#222e3a',
          padding: '14px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 12px #43e97b11',
          minHeight: 48
        }}>
          <span style={{fontWeight: 700, fontSize: 22, letterSpacing: 1}}>Energia App</span>
          <span style={{fontSize: 16, fontWeight: 500}}>Tervetuloa, {username}</span>
        </header>
        {/* Tervetuloviesti */}
        {showWelcome && (
          <div style={{
            position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', background: '#43e97b', color: '#fff', padding: '16px 36px', borderRadius: 12, fontSize: 20, fontWeight: 600, boxShadow: '0 2px 16px #43e97b44', zIndex: 2000, transition: 'opacity 0.3s'
          }}>
            👋 Tervetuloa, {username}!

          </div>
        )}
        <main className="dashboard-main" style={{flex: 1, padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 32}}>
          {pageContent}
        </main>
      </div>
      {/* تحسين الاستجابة للجوال */}
      <style>{`
        @media (max-width: 900px) {
          .dashboard-container { flex-direction: column; }
          .sidebar { flex-direction: row !important; width: 100vw !important; height: 64px !important; min-width: 0 !important; padding: 0 8px !important; }
          .sidebar-list { flex-direction: row !important; gap: 0 !important; }
          .sidebar-item { margin-bottom: 0 !important; margin-right: 8px !important; font-size: 1.2em !important; padding: 10px 10px !important; }
        }
        @media (max-width: 600px) {
          .dashboard-main { padding: 12px 2vw !important; }
          header { flex-direction: column !important; gap: 10px !important; padding: 10px 2vw !important; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
