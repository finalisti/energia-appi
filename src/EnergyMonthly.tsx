import { EnergyTable } from './EnergyTable';
import { useFetch } from './useFetch';

const months = ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'];

export default function EnergyMonthly() {
  const [data, loading] = useFetch<{ month: number; value: number }[]>('/api/energy', json => json.monthly);
  return (
    <EnergyTable
      title="Sähkönkulutus kuukausittain (kWh)"
      loading={loading}
      data={data}
      columns={[
        { header: 'Kuukausi', accessor: row => months[row.month - 1] },
        { header: 'Kulutus', accessor: row => row.value }
      ]}
    />
  );
}
