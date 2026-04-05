import { useState } from 'react';
import logo from './assets/logo.png';
import loginImage from './assets/22.png';

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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0f7fa 0%, #f8bbd0 100%)' }}>
      {/* Header with logo */}
      <header style={{ width: '100%', background: '#fff', boxShadow: '0 2px 8px #0001', padding: '16px 0', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={logo} alt="logo" style={{ height: 48, marginRight: 16 }} />
          <h1 style={{ margin: 0, fontSize: 28, color: '#d81b60', letterSpacing: 1, fontWeight: 800, fontFamily: 'Cairo, Arial, sans-serif' }}>Energiaseuranta</h1>
        </div>
      </header>
      {/* Main login area */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: 20,
          width: '100%',
          flexWrap: 'wrap',
          padding: '0 3vw',
          boxSizing: 'border-box',
        }}
      >
        {/* Login form */}
        <div
          style={{
            flex: 1,
            minWidth: 420,
            maxWidth: 'none',
            padding: 40,
            background: '#fff',
            borderRadius: 24,
            boxShadow: '0 4px 32px #0002',
            marginBottom: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: 28, color: '#1976d2', fontWeight: 800, fontSize: 36, letterSpacing: 1 }}>
            {isLogin ? 'Kirjaudu sisään' : 'Luo uusi tili'}
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Käyttäjätunnus"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{ width: '100%', marginBottom: 18, padding: 16, borderRadius: 10, border: '1.5px solid #bdbdbd', fontSize: 20, background: '#f1f8e9' }}
            />
            <input
              type="password"
              placeholder="Salasana"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', marginBottom: 18, padding: 16, borderRadius: 10, border: '1.5px solid #bdbdbd', fontSize: 20, background: '#f1f8e9' }}
            />
            {error && (
              <div style={{ color: '#d32f2f', marginBottom: 10, fontWeight: 600 }}>{error}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: 18,
                borderRadius: 10,
                background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
                color: '#fff',
                fontWeight: 900,
                border: 'none',
                fontSize: 24,
                letterSpacing: 1,
                boxShadow: '0 4px 16px #43e97b44',
                marginTop: 8,
              }}
            >
              {loading ? 'Odota hetki...' : isLogin ? 'Kirjaudu sisään' : 'Luo tili'}
            </button>
          </form>
          <div style={{ marginTop: 22, textAlign: 'center' }}>
            <button
              onClick={() => setIsLogin(l => !l)}
              style={{
                background: 'none',
                border: 'none',
                color: '#1976d2',
                cursor: 'pointer',
                fontSize: 20,
                fontWeight: 800,
                textDecoration: 'underline',
              }}
            >
              {isLogin
                ? 'Eikö sinulla ole tiliä? Luo uusi tili'
                : 'Onko sinulla jo tili? Kirjaudu sisään'}
            </button>
          </div>
        </div>
        {/* Side image */}
        <div
          style={{
            flex: 1,
            minWidth: 420,
            maxWidth: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 420,
            marginBottom: 40,
          }}
        >
          <img
            src={loginImage}
            alt="Havainnollistava kuva"
            style={{
              maxHeight: 380,
              borderRadius: 24,
              boxShadow: '0 4px 32px #0002',
              width: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </div>
  );
}
