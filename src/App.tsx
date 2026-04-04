

import { useState } from 'react';
import AuthForm from './AuthForm';

import Dashboard from './Dashboard';
import './App.css';




// تطبيق الطاقة - المكون الرئيسي
function App() {
  const [user, setUser] = useState<string | null>(null);
  const handleLogout = () => setUser(null);
  return (
    <div style={{ minHeight: '100vh', background: '#f7fafc' }}>
      {/* شاشة تسجيل الدخول أو لوحة التحكم */}
      {!user ? (
        <AuthForm onAuth={setUser} />
      ) : (
        <Dashboard username={user} onLogout={handleLogout} />
      )}
    </div>
  );
}


export default App;
