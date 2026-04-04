// Simple Express backend for authentication and energy data
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// إنشاء جدول المستخدمين إذا لم يكن موجودًا
pool.query(`CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
)`, (err) => {
  if (err) console.error('DB error:', err);
});

// تسجيل مستخدم جديد
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  pool.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (results.length > 0) return res.status(400).json({ message: 'User already exists' });
    pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err2) => {
      if (err2) return res.status(500).json({ message: 'DB error' });
      res.json({ message: 'Registration successful' });
    });
  });
});

// تسجيل الدخول
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ message: 'Login successful', username });
  });
});

// بيانات استهلاك الطاقة (تجريبية)
app.get('/api/energy', (req, res) => {
  res.json({
    hourly: Array.from({ length: 24 }, (_, i) => ({ hour: i, value: Math.floor(Math.random() * 5) + 1 })),
    daily: Array.from({ length: 30 }, (_, i) => ({ day: i + 1, value: Math.floor(Math.random() * 100) + 50 })),
    monthly: Array.from({ length: 12 }, (_, i) => ({ month: i + 1, value: Math.floor(Math.random() * 300) + 200 })),
  });
});

// Endpoint: بيانات الفواتير (تجريبية)
app.get('/api/bills', (req, res) => {
  res.json([
    { id: 1, amount: '150 ريال', date: '2026-03-01', status: 'مدفوعة' },
    { id: 2, amount: '140 ريال', date: '2026-02-01', status: 'غير مدفوعة' },
    { id: 3, amount: '160 ريال', date: '2026-01-01', status: 'مدفوعة' },
  ]);
});

// بيانات عقد تجريبية (يمكن ربطها بقاعدة البيانات لاحقًا)
const contractSample = {
  subscription: '123456',
  power: '5 كيلوواط',
  endDate: '2026-12-31',
  billDetails: '150 ريال',
};

// Endpoint: بيانات العقد
app.get('/api/contract', (req, res) => {
  res.json(contractSample);
});

// Endpoint: تحميل العقد (ملف PDF تجريبي)
app.get('/api/contract/download', (req, res) => {
  // ضع هنا مسار ملف العقد الحقيقي أو أنشئ ملف PDF تجريبي
  const filePath = __dirname + '/sample-contract.pdf';
  res.download(filePath, 'contract.pdf');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
