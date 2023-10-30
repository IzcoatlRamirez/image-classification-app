import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input, decode_predictions


class Model:
    def __init__(self, model_path="clasificador_imagenes"):
        self.modelo = tf.keras.models.load_model(model_path)

    def preprocess_img(self, img_path):
        img = image.load_img(img_path, target_size=(224, 224))
        img = image.img_to_array(img)
        img = preprocess_input(img)
        img = img.reshape(1, 224, 224, 3)
        return img

    async def get_predict(self, img_path):
        img = self.preprocess_img(img_path)
        predictions = self.modelo.predict(img)
        decoded_predictions = decode_predictions(predictions, top=1)[0]

        imagenet_id, label, score = decoded_predictions[0]
        score = float(score)

        return {
            "id": imagenet_id,
            "clase": label,
            "score": score
        }
