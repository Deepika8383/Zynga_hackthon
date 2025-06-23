import sys
import face_recognition

def get_face_embedding(image_path):
    image = face_recognition.load_image_file(image_path)
    encodings = face_recognition.face_encodings(image)
    return encodings[0] if encodings else None

def compare_faces(id_img_path, selfie_path):
    id_encoding = get_face_embedding(id_img_path)
    selfie_encoding = get_face_embedding(selfie_path)

    if id_encoding is None or selfie_encoding is None:
        print(0.0)
        return

    distance = face_recognition.face_distance([id_encoding], selfie_encoding)[0]
    similarity = 1 - distance
    print(similarity)

if __name__ == "__main__":
    id_image_path = sys.argv[1]
    selfie_image_path = sys.argv[2]
    compare_faces(id_image_path, selfie_image_path)
