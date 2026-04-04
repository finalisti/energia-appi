import { useState } from 'react';

export default function AuthForm({ onAuth }: { onAuth: (username: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Tapahtui virhe');
      onAuth(username);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Tapahtui virhe');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 340, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 18 }}>{isLogin ? 'Kirjaudu sisään' : 'Luo tili'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Käyttäjätunnus"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Salasana"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
        />
        {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10, borderRadius: 8, background: '#43e97b', color: '#fff', fontWeight: 700, border: 'none', fontSize: 16 }}>
          {loading ? '...Odota' : isLogin ? 'Kirjaudu' : 'Luo tili'}
        </button>
      </form>
      <div style={{ marginTop: 14, textAlign: 'center' }}>
        <button onClick={() => setIsLogin(l => !l)} style={{ background: 'none', border: 'none', color: '#2196f3', cursor: 'pointer', fontSize: 15 }}>
          {isLogin ? 'Eikö sinulla ole tiliä? Luo uusi tili' : 'Onko sinulla jo tili? Kirjaudu sisään'}
        </button>
      </div>
    </div>
  );
}
