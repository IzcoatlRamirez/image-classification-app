import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input, decode_predictions

#recargamos el modelo desde el directorio que lo contiene
model = tf.keras.models.load_model("clasificador_imagenes")

#creamos una funcion para preprocesar la imagen
def preprocess_img(img_path):
  img = image.load_img(img_path, target_size=(224, 224)) 
  img = image.img_to_array(img)
  img = preprocess_input(img)
  img = img.reshape(1, 224, 224, 3) 
  return img


async def get_predict(img_path):
  img = preprocess_img(img_path)
  predictions = model.predict(img)
  decoded_predictions = decode_predictions(predictions, top=1)[0]

  imagenet_id, label, score = decoded_predictions[0]
  score = float(score)

  return {
        "id" : imagenet_id,
        "clase": label,
        "score": score
  }
