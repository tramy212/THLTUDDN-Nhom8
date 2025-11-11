// notification.js
const NotificationApp = {
    data: [],
    currentView: 'list',
  
  
    init() {
      this.data = Storage.get();
      this.loadView('list');
      this.bindGlobalEvents();
    },
  
  
    bindGlobalEvents() {
      document.getElementById('btnCreate')?.addEventListener('click', () => {
        this.loadView('create');
      });
    },
  
  
    loadView(view) {
      this.currentView = view;
      const main = document.getElementById('notification-container');
  
  
      if (view === 'list') {
        fetch('/views/notification-list.ejs')
          .then(r => r.text())
          .then(html => {
            main.innerHTML = html;
            this.renderList();
            this.bindListEvents();
          });
      }
  
  
      if (view === 'create') {
        fetch('/views/notification-create.ejs')
          .then(r => r.text())
          .then(html => {
            main.innerHTML = html;
            this.bindCreateEvents();
          });
      }
    },
  
  
    bindListEvents() {
    // Tìm kiếm
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
      this.search(e.target.value);
    });
  
  
    // NÚT SẮP XẾP: CHỈ MỞ DROPDOWN
    const sortBtn = document.getElementById('btnSort');
    if (sortBtn) {
      sortBtn.onclick = (e) => {
        e.stopPropagation();
        document.getElementById('sortMenu').classList.toggle('show');
      };
    }
  
  
    // ITEM TRONG DROPDOWN
    document.querySelectorAll('.dropdown-item').forEach(item => {
      item.onclick = () => {
        const mode = item.getAttribute('data-sort');
        this.sortByTime(mode);
        document.getElementById('sortMenu').classList.remove('show');
      };
    });
  
  
    // ĐÓNG DROPDOWN KHI CLICK NGOÀI
    document.addEventListener('click', () => {
      document.getElementById('sortMenu')?.classList.remove('show');
    });
  
  
    // NÚT TẠO
    document.getElementById('btnCreate')?.addEventListener('click', () => {
      this.loadView('create');
    });
    },
  
  
    sortByTime(mode = 'toggle') {
    let sortedData;
  
  
    if (mode === 'newest') {
      // Mới nhất trước (id giảm dần)
      sortedData = [...this.data].sort((a, b) => b.id - a.id);
    } else if (mode === 'oldest') {
      // Cũ nhất trước (id tăng dần)
      sortedData = [...this.data].sort((a, b) => a.id - b.id);
    } else {
      // Toggle: đảo ngược hiện tại
      sortedData = [...this.data].reverse();
    }
  
  
    this.data = sortedData;
    Storage.set(this.data);
    this.renderList();
  
  
    // Cập nhật text nút
    this.updateSortButtonText();
    },
  
  
    updateSortButtonText() {
    const btn = document.getElementById('btnSort');
    if (!btn || this.data.length === 0) return;
  
  
    const isNewestFirst = this.data[0].id > this.data[this.data.length - 1].id;
    btn.innerHTML = `
      ${isNewestFirst ? 'Mới nhất trước' : 'Cũ nhất trước'}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    `;
    },
  
  
    bindCreateEvents() {
      document.getElementById('notificationForm').addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitForm();
      });
  
  
      document.getElementById('btnCancel').addEventListener('click', () => {
        this.loadView('list');
      });
    },
  
  
    submitForm() {
      const form = {
        id: Date.now(),
        title: document.getElementById('title').value,
        type: document.getElementById('type').value,
        event: document.getElementById('event').value,
        receiver: document.getElementById('receiver').value ,
        content: document.getElementById('content').value,
        time: new Date().toLocaleString('vi-VN'),
       
      };
  
  
      this.data.unshift(form);
      Storage.set(this.data);
  
  
      this.showSuccessToast(form);
      setTimeout(() => this.loadView('list'), 1800);
    },
  
  
    renderList(filtered = this.data) {
      const container = document.getElementById('notificationContainer');
      if (!container) return;
  
  
      fetch('/views/notification-item.ejs')
        .then(r => r.text())
        .then(template => {
          container.innerHTML = filtered.map(item => {
            const typeLabel = { event: 'Sự kiện', update: 'Cập nhật', reminder: 'Nhắc nhở', thanks: 'Cảm ơn' }[item.type];
            const typeClass = item.type;
            return template
              .replace(/{{title}}/g, item.title)
              .replace(/{{receiver}}/g, item.receiver)
              .replace(/{{content}}/g, item.content)
              .replace(/{{event}}/g, item.event)
              .replace(/{{time}}/g, item.time)
              .replace(/{{typeLabel}}/g, typeLabel)
              .replace(/{{typeClass}}/g, typeClass);
          }).join('');
        });
   
        this.updateSortButtonText();
    },
  
  
    search(keyword) {
      const filtered = this.data.filter(n =>
        n.title.toLowerCase().includes(keyword.toLowerCase()) ||
        n.event.toLowerCase().includes(keyword.toLowerCase())
      );
      this.renderList(filtered);
    },
  
  
    // sortByTime() {
    //   this.data.sort((a, b) => new Date(b.time) - new Date(a.time));
    //   this.renderList();
    // },
  
  
    showSuccessToast(data) {
      document.querySelector('.popup-success')?.remove();
  
  
      const popup = document.createElement('div');
      popup.className = 'popup-success';
  
  
      popup.innerHTML = `
        <div class="popup-content">
          <h3>Gửi thông báo thành công!</h3>
          <button class="btn-close-popup">Đóng</button>
        </div>
      `;
  
  
      document.body.appendChild(popup);
  
  
      // Đóng khi nhấn nút
      popup.querySelector('.btn-close-popup').onclick = () => popup.remove();
  
  
      // Đóng khi nhấn ngoài
      popup.onclick = (e) => {
        if (e.target === popup) popup.remove();
      };
  
  
      setTimeout(() => popup.classList.add('show'), 10);
    },
  };
  
  
  // Hàm hỗ trợ
  function getTypeLabel(type) {
    const map = { event: "Sự kiện", update: "Cập nhật", reminder: "Nhắc nhở", thanks: "Cảm ơn" };
    return map[type] || "Khác";
  }
  
  
  // Load chi tiết
  window.loadDetail = function(id) {
    const notif = NotificationApp.data.find(n => n.id === parseInt(id));
    if (!notif) return;
  
  
    const main = document.getElementById('notification-container');
    main.innerHTML = `
      <div class="detail-page-wrapper">
        <div class="notification-detail">
          <div class="detail-header">
            <div class="left-group">
              <button class="btn-back" onclick="NotificationApp.loadView('list')" title="Quay lại">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
            </div>
            <div class="right-group">
              <button class="btn-icon" title="Lưu trữ">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 7h14v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7z"/>
                  <path d="M5 7l7 5 7-5"/>
                </svg>
              </button>
              <button class="btn-icon" title="Báo cáo spam">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4m0 4h.01"/>
                </svg>
              </button>
              <button class="btn-icon" title="Xóa">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
          </div>
  
  
          <div class="detail-content">
            <h2>${notif.title}</h2>
            <div class="detail-sender-row">
              <img src="https://ui-avatars.com/api/?name=DUE+University&background=5a4bcf&color=fff" alt="Sender" class="sender-avatar">
              <div class="sender-info">
                <strong>DUE University</strong> &lt;kinhtedanang@due.udn.vn&gt;<br>
                <span class="detail-time">${formatTime(notif.time)}</span>
              </div>
            </div>
  
  
            <div class="detail-body">
              <p>Xin chào <strong>${notif.receiver}</strong>,</p>
              <div style="margin:1rem 0;line-height:1.7;color:#333;">
                ${notif.content.replace(/\n/g, '<br>')}
              </div>
              <p>Trân trọng,<br><strong>DUE University</strong></p>
            </div>
  
  
            <div class="detail-actions">
              <button class="btn-icon" title="Trả lời">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </button>
              <button class="btn-icon" title="Chuyển tiếp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18l6-6-6-6"/>
                  <path d="M5 12h14"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  
  
  };
  
  
  // Định dạng thời gian
  function formatTime(timeStr) {
    const [date, time] = timeStr.split(', ');
    const [d, m, y] = date.split('/');
    return `${time} ${d} thg ${m}, ${y}`;
  }
  
  
  
  
  NotificationApp.renderList = function(filtered = this.data) {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
  
  
    if (filtered.length === 0) {
      container.innerHTML = `<p style="text-align:center;color:#999;padding:2rem;">Chưa có thông báo nào.</p>`;
      return;
    }
  
  
    // Dùng template gốc + thêm onclick
    fetch('views/notification-item.ejs')
      .then(r => r.text())
      .then(template => {
        container.innerHTML = filtered.map(item => {
          const typeLabel = getTypeLabel(item.type);
          const typeClass = item.type;
          const html = template
            .replace(/{{title}}/g, item.title)
            .replace(/{{receiver}}/g, item.receiver)
            .replace(/{{content}}/g, item.content)
            .replace(/{{event}}/g, item.event)
            .replace(/{{time}}/g, item.time)
            .replace(/{{typeLabel}}/g, typeLabel)
            .replace(/{{typeClass}}/g, typeClass);
         
          // BỌC THÊM onclick
          return `<div onclick="loadDetail(${item.id})" style="cursor:pointer;">${html}</div>`;
        }).join('');
      });
  };
  