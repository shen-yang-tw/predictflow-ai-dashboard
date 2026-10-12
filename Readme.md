# Docker + Next.js + FastAPI 建置

### 步驟 A：啟動容器建立映像檔並啟動所有服務
`docker-compose up --build`

### 步驟 B：驗證服務是否成功運作

• 前端網址：在瀏覽器輸入 http://localhost:3000 即可看到 Next.js 畫面。
• 後端網址：在瀏覽器輸入 http://localhost:8000/ 即可看到 {"status": "FastAPI is running!"}。
• API 文件：http://localhost:8000/docs 可直接使用 FastAPI 自動生成的 Swagger UI。
• 驗證後端 API 是否正常運作：
    打開瀏覽器或使用 cURL 存取：http://localhost:8000/api/health，你將會看到 {"status": "ok", "message": "Hello from FastAPI!"}。
• 測試熱重載（Hot Reload）：
    隨意修改 backend/main.py 的文字或前端的程式碼，不需重啟 

### 步驟 C：測試熱重載 (Hot Reload)

您可以隨意修改 backend/main.py 中的回傳文字，或修改 frontend/ 中的任何頁面。您會發現不需要重啟 Docker，網頁與 API 就會即時自動更新。