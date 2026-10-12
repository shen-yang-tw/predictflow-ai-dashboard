from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 允許前端 Next.js 跨網域存取
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "FastAPI is running!"}


@app.get("/api/health")
def read_root():
    return {"status": "ok", "message": "Hello from FastAPI!"}
