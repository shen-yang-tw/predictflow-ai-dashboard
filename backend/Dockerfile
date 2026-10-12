FROM python:3.11-slim

WORKDIR /app

# 防止 Python 產生 .pyc 檔案與啟用緩衝輸出以利即時查看日誌
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

# 開發模式下開啟 --reload
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
