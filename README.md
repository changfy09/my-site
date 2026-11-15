# Sabbi's World

一隻臘腸狗的長長故事，用 GitHub Pages 架設：https://changfy09.github.io/my-site/

## 檔案

| 檔案 | 用途 |
|---|---|
| `index.html` | 頁面結構與臘腸狗 SVG |
| `style.css` | 樣式 |
| `app.js` | 依年份、月份排列照片（一般不用改） |
| `data.js` | **網站資料：出生、每年回憶文字、照片說明都在這裡改** |
| `photos/sabbi/` | 網頁用照片（已縮小、已移除 EXIF/GPS）；`thumbs/` 是縮圖 |
| `photos/sabbi/avatar.mp4` | 大頭照影片（靜音循環播放） |
| `dog_photos/`、`dog_mp4/` | 原始照片和影片，只留在本機（已列入 `.gitignore`，不會上傳） |

## 寫回憶文字

- 每年的文字：改 `data.js` 的 `YEAR_NOTES`，例如 `2022: "第一次去海邊"`。
- 單張照片說明：改 `PHOTOS` 裡那張照片的 `caption`。

## 新增照片

把原始照片放進 `dog_photos/`，再請 Claude 產生網頁用版本（縮圖、移除位置資訊、依日期命名），並加進 `data.js`。

## 發布更新

```
git add .
git commit -m "更新說明"
git push
```

## 注意

- 這是公開網站，任何人都看得到。不要放地址、電話，或照片裡看得到門牌、證件的內容。
- 不要直接把手機原始照片放進 `photos/`，原始照片可能帶有 GPS 位置。
