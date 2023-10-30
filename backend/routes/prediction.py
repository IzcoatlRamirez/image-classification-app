from fastapi import APIRouter, HTTPException, Request
from models.image import Image
from models.item import Item
from fastapi.responses import JSONResponse
from modelo.modelo import Model
import os

predict = APIRouter()

model = Model()


@predict.post('/api/predict')
async def get_prediction(img: Image):

    img_filename = img.path  # Nombre de la imagen
    img_path = os.path.join(os.path.abspath(
        os.path.dirname(__file__)), img_filename)

    data = await model.get_predict(img_path=img_path)

    if data:
        print(data)
        return JSONResponse(content=data)

    raise HTTPException(400, 'Something went wrong')


@predict.post('/api/ejemplo')
async def example(item: Item):
    return {
        item.title,
        item.id,
        item.description}
