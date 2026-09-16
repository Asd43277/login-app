const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

const db = new sqlite3.Database('./users.db');

db.run(CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
));

const htmlPage = 
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تسجيل الدخول</title>
    <style>
        body { background-color: #0f172a; color: #f8fafc; display: flex; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif; margin: 0; }
        .login-box { background-color: #1e293b; padding: 2rem; border-radius: 1rem; width: 90%; max-width: 350px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); text-align: center; }
        .login-box h2 { margin-bottom: 1.5rem; color: #fff; }
        .login-box input { width: 100%; padding: 12px; margin-bottom: 15px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; color: white; outline: none; box-sizing: border-box; }
        .login-box button { width: 100%; padding: 12px; background-color: #38bdf8; color: #0f172a; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px; }
    </style>
</head>
<body>
    <div class="login-box">
        <h2>تسجيل الدخول</h2>
        <form id="loginForm">
            <input type="email" id="email" placeholder="البريد الإلكتروني" required>
            <input type="password" id="password" placeholder="كلمة المرور" required>
            <button type="submit">دخول</button>
        </form>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const result = await response.json();
            alert(result.message);
        });
    </script>
</body>
</html>
;

app.get('/', (req, res) => {
    res.send(htmlPage);
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.run(INSERT INTO users (email, password) VALUES (?, ?), [email, password], function(err) {
        if (err) {
            return res.json({ message: 'تم الدخول، هذا الحساب مسجل مسبقاً.' });
        }
        res.json({ message: 'تم حفظ البيانات بنجاح!' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(السيرفر يعمل على المنفذ ${PORT});
});
