import cv2
import numpy as np
import base64
import os
import pickle

def save_images(user_name, images):
    if not os.path.exists("data/{}".format(user_name)):
        os.mkdir("data/{}".format(user_name))

    font = cv2.FONT_HERSHEY_SIMPLEX
    bottomLeftCornerOfText = (350, 50)
    fontScale = 1
    fontColor = (102, 102, 225)
    lineType = 2

    cnt = 1

    for image in images:
        # Decode base64 to bytes
        image_bytes = base64.b64decode(image)

        # Convert bytes to numpy array
        nparr = np.frombuffer(image_bytes, np.uint8)

        # Decode numpy array to OpenCV BGR format
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        msg = "Saving {}'s Face Data [{}/{}]".format(
            user_name, cnt, len(images))
        cv2.putText(frame, msg,
                    bottomLeftCornerOfText,
                    font,
                    fontScale,
                    fontColor,
                    lineType)

        # Store the captured images in `data/Jack`
        cv2.imwrite(
            "data/{}/{}{:03d}.jpg".format(user_name, user_name, cnt), gray)  # Save as grayscale
        cnt += 1

    cv2.destroyAllWindows()

def train():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    image_dir = os.path.join(BASE_DIR, "data")

    face_cascade = cv2.CascadeClassifier('haarcascade/haarcascade_frontalface_default.xml')
    recognizer = cv2.face.LBPHFaceRecognizer_create()

    current_id = 0
    label_ids = {}
    y_label = []
    x_train = []

    for root, dirs, files in os.walk(image_dir):
        for file in files:
            if file.endswith("png") or file.endswith("jpg"):
                path = os.path.join(root, file)
                label = os.path.basename(root).replace("", "").upper()
                print(label, path)

                if label in label_ids:
                    pass
                else:
                    label_ids[label] = current_id
                    current_id += 1
                id_ = label_ids[label]
                print(label_ids)

                pil_image = Image.open(path).convert("L")
                image_array = np.array(pil_image, "uint8")

                faces = face_cascade.detectMultiScale(image_array, scaleFactor=1.5, minNeighbors=5)

                for (x, y, w, h) in faces:
                    roi = image_array[y:y+h, x:x+w]
                    x_train.append(roi)
                    y_label.append(id_)

    with open("labels.pickle", "wb") as f:
        pickle.dump(label_ids, f)

    recognizer.train(x_train, np.array(y_label))
    recognizer.save("train.yml")

def recognize_face(name, image_data):
    print("Recognizing face...")

    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read("train.yml")

    labels = {"person_name": 1}
    with open("labels.pickle", "rb") as f:
        labels = pickle.load(f)
        labels = {v: k for k, v in labels.items()}
    print("Labels: %s" %labels)
    face_cascade = cv2.CascadeClassifier('haarcascade/haarcascade_frontalface_default.xml')

    nparr = np.frombuffer(base64.b64decode(image_data.split(',')[1]), np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.5, minNeighbors=5)

    print("Faces:", end=" ")
    print(faces)

    for x, y, w, h in faces:
        roi_gray = gray[y: y + h, x: x + w]
        id_, conf = recognizer.predict(roi_gray)

        print("Confidence for %s: %s" %(labels[id_], conf))
        # print(labels[id_], conf)
        if conf >= 45 and labels[id_] == name:
            return True


    return False