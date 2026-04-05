import { EnergyTable } from './EnergyTable';
import { useFetch } from './useFetch';

export default function EnergyDaily() {
  const [data, loading] = useFetch<{ day: number; value: number }[]>('/api/energy', json => json.daily);
  return (
    <EnergyTable
      title="Sähkönkulutus päivittäin (kWh)"
      loading={loading}
      data={data}
      columns={[{ header: 'Päivä', accessor: row => row.day }, { header: 'Kulutus', accessor: row => row.value }]}
    />
  );
}
