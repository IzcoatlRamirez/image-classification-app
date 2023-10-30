from fastapi import FastAPI
from routes.prediction import predict
app = FastAPI()


@app.get('/')
def welcome():
    return {'message': 'welcome to fastAPI'}


app.include_router(predict)
