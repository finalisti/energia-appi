import React from 'react';

interface TableColumn<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
}

interface EnergyTableProps<T> {
  title: string;
  loading: boolean;
  columns: TableColumn<T>[];
  data: T[];
}

export function EnergyTable<T>({ title, loading, columns, data }: EnergyTableProps<T>) {
  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', background: '#fff', borderRadius: 20, boxShadow: '0 4px 24px #43e97b22', padding: 28 }}>
      <h3 style={{ textAlign: 'center', marginBottom: 22, fontWeight: 800, fontSize: 22, color: '#223' }}>{title}</h3>
      {loading ? (
        <div>...Ladataan</div>
      ) : (
        <table style={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: 0,
          fontFamily: 'inherit',
          fontSize: 17,
          background: 'transparent',
          boxShadow: 'none',
        }}>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  style={{
                    background: 'linear-gradient(90deg, #e0f7fa 60%, #b2ebf2 100%)',
                    color: '#234',
                    fontWeight: 700,
                    fontSize: 18,
                    padding: '12px 0',
                    borderTopLeftRadius: i === 0 ? 12 : 0,
                    borderTopRightRadius: i === columns.length - 1 ? 12 : 0,
                    borderBottom: '2px solid #b2ebf2',
                    letterSpacing: 0.5,
                  }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  background: idx % 2 === 0 ? '#f7fafc' : '#e0f7fa',
                  transition: 'background 0.2s',
                  cursor: 'pointer',
                }}
                onMouseOver={e => (e.currentTarget.style.background = '#b2ebf2')}
                onMouseOut={e => (e.currentTarget.style.background = idx % 2 === 0 ? '#f7fafc' : '#e0f7fa')}
              >
                {columns.map((col, i) => (
                  <td
                    key={i}
                    style={{
                      textAlign: 'center',
                      padding: '10px 0',
                      fontWeight: 500,
                      color: '#223',
                      borderBottom: idx === data.length - 1 ? 'none' : '1px solid #e0e0e0',
                      fontSize: 16,
                    }}
                  >
                    {col.accessor(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
