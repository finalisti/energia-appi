// دالة مساعدة عامة لجلب البيانات مع إدارة حالة التحميل والخطأ
import { useState, useEffect } from 'react';

export function useFetch<T>(url: string, selector: (json: any) => T): [T, boolean, string | null] {
  const [data, setData] = useState<T>([] as unknown as T);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Virhe haettaessa tietoja');
        return res.json();
      })
      .then(json => {
        setData(selector(json));
        setLoading(false);
      })
      .catch(e => {
        setError(e.message || 'Tuntematon virhe');
        setLoading(false);
      });
  }, [url]);

  return [data, loading, error];
}
