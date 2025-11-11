// storage.js
const Storage = {
    key: 'notifications_list',
    get() {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : this.sampleData();
    },
    set(data) {
      localStorage.setItem(this.key, JSON.stringify(data));
    },
    sampleData() {
      return [
        {
          id: 1,
          title: "Xác nhận đăng ký",
          type: "event",
          event: "Lập kế hoạch kinh doanh trên 1 trang giấy",
          receiver: "LE HOANG ANH THU",
          content: "Cảm ơn bạn đã đăng ký tham gia sự kiện \"Lập kế hoạch kinh doanh trên 1 trang giấy\"...",
          time: "04/11/2025, 10:30"
        },
        {
          id: 2,
          title: "Thư cảm ơn",
          type: "event",
          event: "Lập kế hoạch kinh doanh trên 1 trang giấy",
          receiver: "LE HOANG ANH THU",
          content: "Cảm ơn bạn đã tham gia sự kiện...",
          time: "04/11/2025, 09:15"
        },
        {
          id: 3,
          title: "Thông báo cập nhật thời gian",
          type: "update",
          event: "Lập kế hoạch kinh doanh trên 1 trang giấy",
          receiver: "LE HOANG ANH THU",
          content: "Vì lý do thời tiết nên BTC xin thông báo...",
          time: "03/11/2025, 18:45"
        }
      ];
    }
  };
  