from flask import Flask, request, jsonify
import cv2
import numpy as np
import face_recognition

app = Flask(__name__)

def calculate_confidence(distance):
    if distance > 0.6:
        return round((1.0 - distance) * 100, 2)  # rough scaling for low confidence
    else:
        # Map closer distances more confidently
        confidence = (1.0 - distance) ** 2  # curve to boost high similarity
        return round(confidence * 100, 2)

@app.route('/match', methods=['POST'])
def match_faces():
    file1 = request.files.get('image1')
    file2 = request.files.get('image2')

    if not file1 or not file2:
        return jsonify({'error': 'Two images required'}), 400

    img1 = face_recognition.load_image_file(file1)
    img2 = face_recognition.load_image_file(file2)

    encodings1 = face_recognition.face_encodings(img1)
    encodings2 = face_recognition.face_encodings(img2)

    if not encodings1 or not encodings2:
        return jsonify({'match': False, 'confidence': 0, 'reason': 'No face found in one or both images'})

    face_dist = face_recognition.face_distance([encodings1[0]], encodings2[0])[0]
    match = face_recognition.compare_faces([encodings1[0]], encodings2[0])[0]
    confidence = calculate_confidence(face_dist)

    return jsonify({
        'match': bool(match),
        'distance': float(face_dist),
        'confidence_percent': confidence  # e.g., 87.56
    })


if __name__ == '__main__':
    app.run(port=5000, debug=True)
