# github-website

用 GitHub Pages 架設的網站。

## 檔案

- `index.html`：網站首頁

## 發布步驟

1. 在 GitHub 建立一個新的 repository。
2. 把這個資料夾推上去：
   ```
   git init
   git add .
   git commit -m "初始網站"
   git branch -M main
   git remote add origin https://github.com/<帳號>/<repo名稱>.git
   git push -u origin main
   ```
3. 到 GitHub repo →「Settings」→「Pages」，Source 選 `main` branch，資料夾選 `/ (root)`。
4. 等 1～2 分鐘，網站就會出現在 `https://<帳號>.github.io/<repo名稱>/`。

> 如果 repo 名稱取成 `<帳號>.github.io`，網址就會是 `https://<帳號>.github.io/`。

## 注意

- 上傳到 GitHub 的公開 repo 後，所有人都看得到，所以不要放個資或業務資料。
