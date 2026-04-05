import { EnergyTable } from './EnergyTable';
import { useFetch } from './useFetch';

export default function EnergyHourly() {
  const [data, loading] = useFetch<{ hour: number; value: number }[]>('/api/energy', json => json.hourly);
  return (
    <EnergyTable
      title="Sähkönkulutus tunneittain (kWh)"
      loading={loading}
      data={data}
      columns={[{ header: 'Tunti', accessor: row => `${row.hour}:00` }, { header: 'Kulutus', accessor: row => row.value }]}
    />
  );
}
