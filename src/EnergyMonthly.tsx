import { useEffect, useState } from 'react';

export default function EnergyMonthly() {
  const [data, setData] = useState<{ month: number; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const months = ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'];

  useEffect(() => {
    fetch('/api/energy')
      .then(res => res.json())
      .then(json => {
        setData(json.monthly);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 24 }}>
      <h3 style={{ textAlign: 'center', marginBottom: 18 }}>Sähkönkulutus kuukausittain (kWh)</h3>
      {loading ? (
        <div>...Ladataan</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#e0f7fa' }}>
              <th>Kuukausi</th>
              <th>Kulutus</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.month}>
                <td style={{ textAlign: 'center' }}>{months[row.month - 1]}</td>
                <td style={{ textAlign: 'center' }}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
