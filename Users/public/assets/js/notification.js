let notificationCount = 0;
const countElement = document.querySelector('.notification-count');
const SERVICE_ID = 'service_a9yqw5o';  // Dán từ dashboard
const TEMPLATE_ID = 'template_c3wxkcd';  // Dán từ template

document.addEventListener('DOMContentLoaded', function () {
  const frame = document.querySelector('.frame');
  if (!frame) return;
  emailjs.init('xauvMvSAdtqMYQGw7');
  // Khởi tạo EmailJS (dán Service ID, Template ID)

  frame.addEventListener('click', function (e) {
    e.stopPropagation();
    this.classList.toggle('active');
  });

  document.addEventListener('click', function (e) {
    if (!frame.contains(e.target)) {
      frame.classList.remove('active');
    }
  });

  frame.querySelector('.notifications-dropdown')?.addEventListener('click', function (e) {
    e.stopPropagation();
  });
});

function addNotification() {
  notificationCount++;
  countElement.textContent = notificationCount;

  if (notificationCount === 1) {
    countElement.style.display = 'flex';
  }

  // === TẠO THÔNG BÁO ===
  const noticeHTML = `
    <article class="notice notice--new">
      <header class="notice__head">
        <span class="notice__badge">Thông báo</span>
        <time class="notice__time">Vừa xong</time>
      </header>
      <h3 class="notice__title">
        Xác nhận đăng ký <span class="notice__event">Lập kế hoạch kinh doanh trên 1 trang giấy</span>
      </h3>
      <div class="notice__meta">
        <div class="meta">
          <i class="fa-regular fa-clock meta__icon"></i>
          <span>18/10/2025 • 10:00–12:30</span>
        </div>
        <div class="meta">
          <i class="fa-solid fa-location-dot meta__icon"></i>
          <span>Hội trường A</span>
        </div>
      </div>
    </article>
  `;

  const container = document.querySelector('.notifications');
  container.insertAdjacentHTML('afterbegin', noticeHTML);


  // === RUNG CHUÔNG ===
  const bell = document.querySelector('.clarity-notification i');
  if (bell) {
    bell.classList.remove('ringing');
    void bell.offsetWidth; // Force reflow
    bell.classList.add('ringing');
    setTimeout(() => bell.classList.remove('ringing'), 1000000);
  }

  // === PHÁT ÂM THANH ===
  const audio = document.getElementById('notification-sound');
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {
      console.log('Âm thanh bị chặn do chưa tương tác');
    });
  }

  // XÓA HIỆU ỨNG MỚI SAU 3S
  setTimeout(() => {
    const newNotice = container.querySelector('.notice--new');
    if (newNotice) newNotice.classList.remove('notice--new');
  }, 100000);
}


function confirmRegisterAndSendEmail() {
  const registerButton = document.getElementById('registerButton'); 

  emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    user_name: 'LE HOANG ANH THU',
    user_email: 'leanhthu0773@gmail.com',
    event_name: 'Lập kế hoạch kinh doanh trên 1 trang giấy',
    event_time: '18/10/2025 • 10:00–12:30',
    event_location: 'Hội trường A',
    register_date: new Date().toLocaleDateString('vi-VN')
  }).then(() => {
    const modal = document.getElementById('registrationModal');
    if (modal) modal.classList.remove('active');

    const toast = document.getElementById('successToast');
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    }

    addNotification();
    
    // === CẬP NHẬT NÚT ĐĂNG KÝ SAU KHI GỬI EMAIL THÀNH CÔNG ===
    if (registerButton) {
      // 1. Lấy phần tử chứa văn bản bên trong nút
      const buttonTextElement = registerButton.querySelector('.text-wrapper-13');
      
      // 2. Đổi văn bản và màu sắc
      if (buttonTextElement) {
          buttonTextElement.textContent = 'ĐÃ ĐĂNG KÝ'; 
      }
      
      // 3. Đổi màu nút (thêm class vào thẻ DIV cha)
      registerButton.classList.remove('frame-7'); // Xóa class màu cũ nếu cần
      registerButton.classList.add('btn-registered'); // Thêm class màu vàng mới
      
      // 4. ĐÁNH DẤU LÀ ĐÃ ĐĂNG KÝ để JS biết
      registerButton.setAttribute('data-registered', 'true');
    }

  }).catch(err => {
    console.error('Lỗi:', err);
    alert('Gửi thất bại! Vui lòng thử lại.');
  });
}