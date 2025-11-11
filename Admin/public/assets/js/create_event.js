document.addEventListener('DOMContentLoaded', () => {
    const datePopup = document.getElementById('datePopup');
    const timePopup = document.getElementById('timePopup');
    let currentDateInput = null;
    let currentTimeInput = null;
    let selectedHour = 16;
    let selectedMinute = 15;
  
  
    // === HÀM HIỂN THỊ LỊCH ===
    function showDatePicker(input) {
      currentDateInput = input;
      const wrapper = input.parentElement;
      const rect = wrapper.getBoundingClientRect();
      const popupWidth = 280;
      const left = rect.left + (rect.width - popupWidth) / 2 + window.scrollX;
      datePopup.style.left = `${left}px`;
      datePopup.style.top = `${rect.bottom + window.scrollY + 8}px`;
      datePopup.style.display = 'block';
      renderCalendar();
    }
  
  
    // === HÀM HIỂN THỊ GIỜ ===
    function showTimePicker(input) {
      currentTimeInput = input;
      const val = input.value.trim();
      if (val && /^\d{2}:\d{2}$/.test(val)) {
        [selectedHour, selectedMinute] = val.split(':').map(Number);
      }
      updateTimeDisplay();
      const wrapper = input.parentElement;
      const rect = wrapper.getBoundingClientRect();
      const popupWidth = 140;
      const left = rect.left + (rect.width - popupWidth) / 2 + window.scrollX;
      timePopup.style.left = `${left}px`;
      timePopup.style.top = `${rect.bottom + window.scrollY + 8}px`;
      timePopup.style.display = 'block';
    }
  
  
    // === CẬP NHẬT HIỂN THỊ GIỜ ===
    function updateTimeDisplay() {
      const hourEl = timePopup.querySelector('.hour');
      const minuteEl = timePopup.querySelector('.minute');
      if (hourEl && minuteEl) {
        hourEl.textContent = selectedHour.toString().padStart(2, '0');
        minuteEl.textContent = selectedMinute.toString().padStart(2, '0');
      }
    }
  
  
    // === ĐÓNG POPUP KHI CLICK NGOÀI ===
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.date-input-wrapper') && !e.target.closest('.popup-calendar')) {
        datePopup.style.display = 'none';
      }
      if (!e.target.closest('.time-input-wrapper') && !e.target.closest('.popup-time-new')) {
        if (currentTimeInput) {
          currentTimeInput.value = `${selectedHour.toString().padStart(2,'0')}:${selectedMinute.toString().padStart(2,'0')}`;
        }
        timePopup.style.display = 'none';
      }
    });
  
  
    // === VẼ LỊCH ===
    function renderCalendar() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const today = now.getDate();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthNames = [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
      ];
  
  
      datePopup.innerHTML = `
        <div class="calendar-header">
          <button class="prev-month">Previous</button>
          <span>${monthNames[month]} ${year}</span>
          <button class="next-month">Next</button>
        </div>
        <div class="calendar-weekdays">
          <span>CN</span><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span>
        </div>
        <div class="calendar-days"></div>
      `;
  
  
      const daysContainer = datePopup.querySelector('.calendar-days');
      // Ô trống đầu tháng
      for (let i = 0; i < firstDay; i++) {
        daysContainer.innerHTML += '<button disabled></button>';
      }
      // Các ngày trong tháng
      for (let day = 1; day <= daysInMonth; day++) {
        const btn = document.createElement('button');
        btn.textContent = day;
        if (day === today) btn.classList.add('today');
        btn.onclick = () => {
          const dateStr = `${day.toString().padStart(2,'0')}/${(month+1).toString().padStart(2,'0')}/${year}`;
          currentDateInput.value = dateStr;
          datePopup.style.display = 'none';
        };
        daysContainer.appendChild(btn);
      }
    }
  
  
    // === XỬ LÝ NÚT GIỜ (UP/DOWN) ===
    timePopup.addEventListener('click', (e) => {
      const target = e.target;
      if (!target.classList.contains('arrow')) return;
      const isHour = target.closest('.time-unit').querySelector('.hour');
      if (target.classList.contains('up')) {
        if (isHour) selectedHour = (selectedHour + 1) % 24;
        else selectedMinute = (selectedMinute + 1) % 60;
      } else {
        if (isHour) selectedHour = (selectedHour - 1 + 24) % 24;
        else selectedMinute = (selectedMinute - 1 + 60) % 60;
      }
      updateTimeDisplay();
    });
  
  
    // === GẮN SỰ KIỆN CHO NÚT NGÀY ===
    document.querySelectorAll('.date-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        showDatePicker(btn.previousElementSibling);
      });
    });
  
  
    // === GẮN SỰ KIỆN CHO NÚT GIỜ ===
    document.querySelectorAll('.time-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        showTimePicker(btn.previousElementSibling);
      });
    });
  
  
    // === THÊM NGƯỜI THAM GIA ===
    document.getElementById('addParticipant').addEventListener('click', () => {
      const template = document.querySelector('.participant-row.template');
      const clone = template.cloneNode(true);
      clone.classList.remove('template');
      clone.style.display = 'flex';
      clone.querySelectorAll('input').forEach(input => input.value = '');
      clone.querySelector('.remove-row').onclick = () => clone.remove();
      document.getElementById('participantsContainer').appendChild(clone);
    });
  
  
    // === UPLOAD ẢNH ===
    document.getElementById('imageUpload').addEventListener('change', (e) => {
      const file = e.target.files[0];
      const fileInfo = document.getElementById('fileInfo');
      if (file) {
        if (file.size > 10 * 1024 * 1024) {
          alert('File quá lớn! Tối đa 10MB.');
          e.target.value = '';
          fileInfo.textContent = 'Không có tệp nào được chọn';
          return;
        }
        fileInfo.textContent = file.name;
      } else {
        fileInfo.textContent = 'Không có tệp nào được chọn';
      }
    });
  
  
    // === SUBMIT FORM ===
    document.getElementById('eventForm').addEventListener('submit', (e) => {
      e.preventDefault();
      // Kiểm tra bắt buộc
      const requiredFields = document.querySelectorAll('[required]');
      let valid = true;
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });
      if (!valid) {
        alert('Vui lòng điền đầy đủ các trường bắt buộc!');
        return;
      }
      alert('Tạo sự kiện thành công!');
      // Gửi dữ liệu ở đây nếu cần
    });
  
  
    // === HỦY BỎ ===
    document.querySelector('.btn-cancel').addEventListener('click', () => {
      if (confirm('Bạn có chắc muốn hủy?')) {
        window.location.href = 'event_list.html';
      }
    });
  });
  