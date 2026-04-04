// إعداد الاتصال بقاعدة بيانات MySQL
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // غيّرها إذا كان اسم المستخدم مختلفًا
  password: 'Karim88', // ضع كلمة مرور MySQL هنا
  database: 'energia',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
