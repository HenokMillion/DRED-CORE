# from keras.applications.resnet_v2 import ResNet50
from tensorflow import keras
# model = ResNet50(include_top=True, weights='imagenet')
# model.save("model.h5")
model = keras.models.load_model('Data')
model.save('model.h5')

