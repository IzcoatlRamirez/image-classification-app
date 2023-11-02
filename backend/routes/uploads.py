from fastapi import APIRouter, HTTPException, UploadFile
from modelo.modelo import Model
from fastapi.responses import JSONResponse
import os

upload = APIRouter()

model = Model()

@upload.post('/api/upload')
async def upload_file(file: UploadFile):

    img_filename = "img.jpg"
    file_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), img_filename)

    with open(file_path, "wb") as f:
        f.write(file.file.read())

    data = await model.get_predict(img_path=file_path)

    if data:
        print(data)
        return JSONResponse(content=data)

    raise HTTPException(400, 'Something went wrong')


@upload.post('/api/saludo')
async def saludo():
    saludo = "hola como estas6"
    if saludo:
        return {"message": saludo}
    raise HTTPException(400, 'Something went wrong')