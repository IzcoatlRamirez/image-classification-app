from fastapi import APIRouter,HTTPException
from fastapi.responses import JSONResponse
from modelo.modelo import get_predict
import os 

predict = APIRouter()

@predict.post('/api/predict')
async def get_prediction():
    img_filename = "gatomontes.jpg"  # Nombre de la imagen
    img_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), img_filename)
    
    data = await get_predict(img_path=img_path)
   
    if data:
        return JSONResponse(content=data)

    raise HTTPException(400,'Something went wrong')
    


