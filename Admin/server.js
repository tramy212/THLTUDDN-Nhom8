const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));
app.use('/views', express.static(path.join(__dirname, 'views')));


app.get('/', (req, res) => {
  res.render('dashboard', { pageTitle: 'Dashboard' });
});

app.get('/events', (req, res) => {
    res.render('events', { pageTitle: 'Danh Sách Sự Kiện' });
});

app.get('/create_event', (req, res) => {
    res.render('create_event', { pageTitle: 'Tạo Sự Kiện' });
});

app.get('/edit_event', (req, res) => {
    res.render('edit_event', { pageTitle: 'Chỉnh Sửa Sự Kiện' });
});

app.get('/event_detail', (req, res) => {
    res.render('event_detail', { pageTitle: 'Chi Tiết Sự Kiện' });
});

app.get('/notification', (req, res) => {
    res.render('index', { pageTitle: 'Thông Báo' });
});

app.get('/attendant', (req, res) => {
    res.render('attendant', { pageTitle: 'Danh Sách Tham Gia' });
  });

app.get('/checkin', (req, res) => {
    res.render('checkin', { pageTitle: 'Checkin' });
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});