import uvicorn
from fastapi import FastAPI
from src.api.v1 import api_v1_router
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
app=FastAPI()
# import sy
# insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

app.include_router(api_v1_router)

if __name__=='__main__':
    uvicorn.run('main:app', host='127.0.0.2', port=8000, reload=True)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://new.nsumt.uz",
    ],  # Разрешаем доступ с вашего фронтенда
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все HTTP методы
    allow_headers=["*"],  # Разрешаем все заголовки
)