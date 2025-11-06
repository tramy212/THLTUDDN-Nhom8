const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));


app.get('/', (req, res) => {
  res.render('index', { pageTitle: 'Cổng Sự Kiện - DUE' });
});

app.get('/my_event', (req, res) => {
  res.render('my_event', { pageTitle: 'Sự kiện của tôi' });
});

app.get('/event/:id', (req, res) => {
  const eventId = req.params.id;
  const events = {
    '1': {
      title: 'Lập kế hoạch kinh doanh trên 1 trang giấy',
      image: '/assets/images/event_1.png',
      date: 'Chủ nhật, 9 tháng 11, 2025',
      time: '10:00 - 12:30',
      location: 'Hội trường A',
      registered: '30/50',
      remaining: '20',
      speakers: 'Doanh nhân Phạm Nhật Vượng, Diễn giả Nguyễn Thanh Hiền',
      description: 'Hội thảo về xu hướng công nghệ tài chính và sự chuyển đổi số trong ngành nhằm mang đến cái nhìn tổng quan về sự thay đổi mạnh mẽ của công nghệ trong lĩnh vực tài chính – ngân hàng, đồng thời chia sẻ cơ hội, thách thức và giải pháp ứng dụng công nghệ trong quản trị, kinh doanh và khởi nghiệp. Sự kiện quy tụ các chuyên gia, giảng viên và sinh viên, cùng thảo luận về những xu hướng FinTech nổi bật như thanh toán không tiền mặt, ngân hàng số, blockchain và trí tuệ nhân tạo trong tài chính. Đây là cơ hội kết nối, học hỏi và cập nhật kiến thức thực tiễn về chuyển đổi số trong kỷ nguyên công nghệ 4.0. Hội thảo về xu hướng công nghệ tài chính và sự chuyển đổi số trong ngành nhằm mang đến cái nhìn tổng quan về sự thay đổi mạnh mẽ của công nghệ trong lĩnh vực tài chính – ngân hàng, đồng thời chia sẻ cơ hội, thách thức và giải pháp ứng dụng công nghệ trong quản trị, kinh doanh và khởi nghiệp. Sự kiện quy tụ các chuyên gia, giảng viên và sinh viên, cùng thảo luận về những xu hướng FinTech nổi bật như thanh toán không tiền mặt, ngân hàng số, blockchain và trí tuệ nhân tạo trong tài chính. Đây là cơ hội kết nối, học hỏi và cập nhật kiến thức thực tiễn về chuyển đổi số trong kỷ nguyên công nghệ 4.0.Hội thảo về xu hướng công nghệ tài chính và sự chuyển đổi số trong ngành nhằm mang đến cái nhìn tổng quan về sự thay đổi mạnh mẽ của công nghệ trong lĩnh vực tài chính – ngân hàng, đồng thời chia sẻ cơ hội, thách thức và giải pháp ứng dụng công nghệ trong quản trị, kinh doanh và khởi nghiệp. Sự kiện quy tụ các chuyên gia, giảng viên và sinh viên, cùng thảo luận về những xu hướng FinTech nổi bật. Đây là cơ hội kết nối, học hỏi và cập nhật kiến thức thực tiễn về chuyển đổi số trong kỷ nguyên công nghệ 4.0.',
      type: 'Workshop',
      organizer: 'Khoa Thống kê - Tin học'
    }
  };
  const event = events[eventId] || events['1'];

  res.render('event_detail', { 
    pageTitle: event.title,
    event: event 
  });
});

app.get('/event_review', (req, res) => {
  res.render('event_review', { pageTitle: 'Đánh giá sự kiện'});
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});