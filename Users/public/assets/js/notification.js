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
  // Dùng optional chaining để tránh lỗi
  const fullName = document.getElementById('fullName')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const mssv = document.getElementById('mssv')?.value.trim();
  const khoa = document.getElementById('khoaDropdown')?.querySelector('.text-wrapper-k')?.dataset.value;
  const chuyenNganh = document.getElementById('CNDropdown')?.querySelector('.text-wrapper-k')?.dataset.value;
  const lop = document.getElementById('class')?.value.trim();

  // === VALIDATE ===// 
  if (!fullName || !email || !mssv || !khoa || !chuyenNganh || !lop) {
    showErrorToast('Vui lòng điền đầy đủ các trường bắt buộc!');
    return;
  }
  if (!/^\d{12}$/.test(mssv)) {
    showErrorToast('Mã số sinh viên không hợp lệ!');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showErrorToast('Email không hợp lệ!');
    return;
  }

  // === GỬI EMAIL ===
  emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    user_name: fullName,
    user_email: email,
    event_name: 'Lập kế hoạch kinh doanh trên 1 trang giấy',
    event_time: '18/10/2025 • 10:00–12:30',
    event_location: 'Hội trường A',
    register_date: new Date().toLocaleDateString('vi-VN')
  }).then(() => {
    // Đóng modal
    const modal = document.getElementById('registrationModal');
    if (modal) modal.classList.remove('active');

    // Toast thành công
    showSuccessToast('Đăng ký thành công! Email xác nhận đã được gửi.');

    // Thêm thông báo
    addNotification();

    // Cập nhật nút
    const registerButton = document.getElementById('registerButton');
    if (registerButton) {
      const buttonTextElement = registerButton.querySelector('.text-wrapper-13');
      if (buttonTextElement) {
        buttonTextElement.textContent = 'ĐÃ ĐĂNG KÝ';
      }

      // SỬA: class đúng là frame-7 (xem HTML)
      registerButton.classList.remove('frame-7');
      registerButton.classList.add('btn-registered');
      registerButton.setAttribute('data-registered', 'true');
    }

  }).catch(err => {
    console.error('Lỗi EmailJS:', err);
    showErrorToast('Gửi thất bại! Vui lòng thử lại.');
  });
}

// === TOAST THÀNH CÔNG ===
function showSuccessToast(msg) {
  const toast = document.getElementById('successToast');
  if (toast) {
    toast.querySelector('span').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }
}

// === TOAST LỖI ===
function showErrorToast(msg) {
  const toast = document.getElementById('errorToast');
  if (toast) {
    toast.querySelector('span').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }
}