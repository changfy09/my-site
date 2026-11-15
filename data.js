// =============================================
// Sabbi 的生活點滴：網站資料都在這個檔案
// 注意：這是公開網站，不要寫地址、電話等個資
// =============================================

window.DOG = {
  name: "Sabbi",
  breed: "Dachshund",
  born: "Born June 2010",
  avatarVideo: "photos/sabbi/avatar.mp4",           // 大頭照影片（靜音循環播放）
};

// 每一年的回憶文字（可留空，留空就不顯示）
window.YEAR_NOTES = {
  2021: "",
  2022: "",
  2023: "",
  2024: "",
};

// 照片：caption 可以自己補上說明（留空就只顯示日期）
// 新照片：大圖放 photos/sabbi/，縮圖放 photos/sabbi/thumbs/（請 Claude 幫忙處理最方便）
window.PHOTOS = [
  { file: "2021-10-10-01.jpg", date: "2021-10-10", caption: "" },
  { file: "2021-10-10-02.jpg", date: "2021-10-10", caption: "" },
  { file: "2022-02-02-01.jpg", date: "2022-02-02", caption: "" },
  { file: "2022-02-03-01.jpg", date: "2022-02-03", caption: "" },
  { file: "2022-02-04-01.jpg", date: "2022-02-04", caption: "" },
  { file: "2022-02-04-02.jpg", date: "2022-02-04", caption: "" },
  { file: "2022-02-13-01.jpg", date: "2022-02-13", caption: "" },
  { file: "2022-02-13-02.jpg", date: "2022-02-13", caption: "" },
  { file: "2022-02-13-03.jpg", date: "2022-02-13", caption: "" },
  { file: "2022-07-10-01.jpg", date: "2022-07-10", caption: "" },
  { file: "2023-04-05-01.jpg", date: "2023-04-05", caption: "" },
  { file: "2023-04-16-01.jpg", date: "2023-04-16", caption: "" },
  { file: "2023-06-16-01.jpg", date: "2023-06-16", caption: "" },
  { file: "2023-06-16-02.jpg", date: "2023-06-16", caption: "" },
  { file: "2023-06-17-01.jpg", date: "2023-06-17", caption: "" },
  { file: "2023-06-17-02.jpg", date: "2023-06-17", caption: "" },
  { file: "2023-09-25-01.jpg", date: "2023-09-25", caption: "" },
  { file: "2023-10-04-01.jpg", date: "2023-10-04", caption: "" },
  { file: "2023-10-08-01.jpg", date: "2023-10-08", caption: "" },
  { file: "2023-11-06-01.jpg", date: "2023-11-06", caption: "" },
  { file: "2023-11-19-01.jpg", date: "2023-11-19", caption: "" },
  { file: "2023-11-19-02.jpg", date: "2023-11-19", caption: "" },
  { file: "2023-11-19-03.jpg", date: "2023-11-19", caption: "" },
  { file: "2024-03-12-01.jpg", date: "2024-03-12", caption: "" },
];
