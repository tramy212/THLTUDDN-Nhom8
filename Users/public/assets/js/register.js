// public/assets/js/register.js
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('registrationModal');
  const closeBtn = document.querySelector('.close-btn');
  const confirmBtn = document.getElementById('confirmRegister');

  // === MỞ MODAL ===
  document.querySelectorAll('#registerButton').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.getAttribute('data-registered') === 'true') {
          console.log('Bạn đã đăng ký sự kiện này rồi.');
          // Tùy chọn: Có thể hiện toast "Đã đăng ký" ở đây
          return; 
      }
      const slots = btn.getAttribute('data-slots') || '0/50';
      const [reg, total] = slots.split('/').map(n => parseInt(n));
      const left = total - reg;

      if (left <= 0) {
        alert('Sự kiện đã hết chỗ!');
        return;
      }

      modal.classList.add('active');
    });
  });

  // === ĐÓNG MODAL ===
  closeBtn?.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('active');
  });

  // === XÁC NHẬN ĐĂNG KÝ ===
  confirmBtn?.addEventListener('click', () => {
    alert('Đăng ký thành công!');
    modal.classList.remove('active');
  });

  // === HÀM XỬ LÝ DROPDOWN (TÁI SỬ DỤNG) ===
  function initDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;
    const text = dropdown.querySelector('.text-wrapper-k, .text-wrapper-27');
    const items = dropdown.querySelectorAll('.dropdown-item');

    // Click vào frame → mở/đóng
    dropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      // Đóng tất cả dropdown khác
      document.querySelectorAll('.frame-3').forEach(d => {
        if (d.id !== dropdownId) d.classList.remove('open');
      });
      dropdown.classList.toggle('open');
    });

    // Chọn mục
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const label = item.textContent.trim();
        text.textContent = label;
        dropdown.classList.remove('open');
      });
    });
  }

  // === KHỞI TẠO CẢ 2 DROPDOWN ===
  initDropdown('khoaDropdown');
  initDropdown('CNDropdown');
  initDropdown('filterKhoaDropdown');
  initDropdown('filterStatusDropdown');

  // === ĐÓNG KHI CLICK NGOÀI (1 lần duy nhất) ===
  document.addEventListener('click', () => {
    document.querySelectorAll('.frame-3').forEach(d => {
      d.classList.remove('open');
    });
  });
});