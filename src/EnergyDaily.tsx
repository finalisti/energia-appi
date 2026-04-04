import { useEffect, useState } from 'react';

export default function EnergyDaily() {
  const [data, setData] = useState<{ day: number; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/energy')
      .then(res => res.json())
      .then(json => {
        setData(json.daily);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 24 }}>
      <h3 style={{ textAlign: 'center', marginBottom: 18 }}>استهلاك الكهرباء باليوم (kWh)</h3>
      {loading ? (
        <div>...جاري التحميل</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#e0f7fa' }}>
              <th>اليوم</th>
              <th>الاستهلاك</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.day}>
                <td style={{ textAlign: 'center' }}>{row.day}</td>
                <td style={{ textAlign: 'center' }}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
