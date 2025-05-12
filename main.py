import uvicorn
from fastapi import FastAPI
from src.api.v1 import api_v1_router
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.include_router(api_v1_router)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/upload_files", StaticFiles(directory="upload_files"), name="upload_files")
if __name__ == '__main__':
    uvicorn.run('main:app', host='127.0.0.2', port=8000)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origins=[
        "https://dashboard.nsumt.uz",
        "http://localhost:5173",
        "http://localhost:5174",


    ],
)
