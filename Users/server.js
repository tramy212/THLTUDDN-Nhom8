const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Cho phép truy cập file tĩnh
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Hàm render: gộp header + nội dung + footer
function renderPage(pageName) {
  const header = fs.readFileSync(path.join(__dirname, "views", "header1.html"), "utf8");
  const footer = fs.readFileSync(path.join(__dirname, "views", "footer1.html"), "utf8");
  const main = fs.readFileSync(path.join(__dirname, "views", pageName), "utf8");

  // Gộp 3 phần lại liền nhau, không bị khoảng cách
  return `
  <!DOCTYPE html>
  <html lang="vi">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="/assets/css/chung.css" />
      <link rel="stylesheet" href="/assets/css/main1.css" />
      <link rel="stylesheet" href="/assets/css/header1.css" />
      <link rel="stylesheet" href="/assets/css/footer1.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { margin: 0; padding: 0; }
      </style>
    </head>
    <body>
      ${header}
      ${main}
      ${footer}
    </body>
  </html>`;
}

// Route trang chính
app.get("/", (req, res) => {
  const html = renderPage("main1.html");
  res.send(html);
});

// Chạy server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy: http://localhost:${PORT}`);
});
