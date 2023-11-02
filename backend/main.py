from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.prediction import predict
from routes.uploads import upload
app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],  
    allow_credentials=True,
    allow_methods=['*'],  
    allow_headers=['*']
)

@app.get('/')
def welcome():
    return {'message': 'welcome to fastAPI1'}


app.include_router(predict)
app.include_router(upload)
