from keras.applications.resnet50 import ResNet50
model = ResNet50(include_top=True, weights='imagenet')
model.save("model.h5")