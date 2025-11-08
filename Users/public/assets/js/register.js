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

function initDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (!dropdown) return;

  // Lấy phần tử hiển thị (có thể là .text-wrapper-k hoặc .text-wrapper-27)
  const textEl = dropdown.querySelector('.text-wrapper-k, .text-wrapper-27');
  if (!textEl) return;

  // Đảm bảo có data-value mặc định
  if (!textEl.hasAttribute('data-value')) {
    textEl.dataset.value = '';
  }

  const items = dropdown.querySelectorAll('.dropdown-item');

  // === MỞ/ĐÓNG DROPDOWN KHI CLICK VÀO VÙNG CHỌN ===
  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();

    // Đóng tất cả dropdown khác (dựa trên class chung)
    document.querySelectorAll('.frame-3, .frame-15, .frame-16').forEach(d => {
      if (d.id !== dropdownId) {
        d.classList.remove('open');
      }
    });

    // Toggle dropdown hiện tại
    dropdown.classList.toggle('open');
  });

  // === KHI CHỌN MỘT MỤC ===
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();

      const label = item.textContent.trim();
      const value = item.getAttribute('data-value') || '';

      // Cập nhật text + data-value
      textEl.textContent = label;
      textEl.dataset.value = value;

      // Đóng dropdown
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