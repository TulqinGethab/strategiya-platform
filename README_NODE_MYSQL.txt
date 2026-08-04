STRATEGIYA PLATFORMASI — NODE.JS + MYSQL BACKEND

1) Zipni oching va fayllarni loyiha papkangizga tashlang:
   D:\PROJECTS\strategy-app
   Replace / Заменить bosing.

2) .env.example faylidan nusxa oling va nomini .env qiling.

3) .env ichida MySQL parolingizni yozing:
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=MY_SQL_PAROLINGIZ
   DB_NAME=strategy_platform
   PORT=3000

4) Terminal / Git Bash / PowerShellda loyiha papkasiga kiring:
   cd D:\PROJECTS\strategy-app

5) Paketlarni o‘rnating:
   npm install

6) Serverni ishga tushiring:
   npm start

7) Browserda oching:
   http://localhost:3000

8) Tekshirish uchun:
   http://localhost:3000/health

ESLATMA:
- Frontend endi localStorage emas, Node.js API orqali MySQLga yozadi.
- Fayllar MySQL ichiga emas, uploads/projects papkaga saqlanadi.
- MySQLda esa fayl nomi, turi, hajmi va yo‘li saqlanadi.
- Server ishga tushganda kerakli ustunlar va jadvallarni o‘zi tekshiradi.

MUHIM:
.env faylni GitHub/GitLabga yuklamang. Unda MySQL paroli bo‘ladi.
