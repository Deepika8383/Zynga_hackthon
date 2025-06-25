# 🔍 Age & Identity Verification System (Proof of Concept)

This web-based system simulates government ID verification by extracting age and photo from a sample Aadhar card, comparing it to a live selfie, and determining if the person is above a certain age threshold (e.g., 18+). It uses OCR and facial recognition techniques to demonstrate the concept.

---

## 📌 Problem Statement

### Title:
**Build an Age & Identity Verification System Using Simulated Government ID Cards**

### Objective:
Design a system that can:
1. Extract **Date of Birth (DOB)** and **photo** from a simulated identity document (currently Aadhar).
2. Capture a **live selfie** via the browser.
3. Determine whether:
   - The selfie and ID photo belong to the same individual.
   - The person meets a minimum age requirement (e.g., 18+).

---

## 🧱 Architecture Overview

- **OCR**: Tesseract (via Python) for extracting DOB and text from Aadhar image.
- **Face Matching**: OpenCV  used to compare ID photo and selfie.
- **Frontend**: React (located in `/frontend/zynga_frontend`) for document upload and selfie capture.
- **Backend**: Node.js & Express (`/backend`) for API handling and result serving.
- **Python Backend**: Flask app (`/python_backend`) to run OCR and facial comparison logic.

---

## 🚀 Features

- ✅ Upload simulated Aadhar card (image or PDF)
- ✅ Extract photo and DOB using OCR
- ✅ Capture selfie using webcam
- ✅ Compare ID photo with selfie using facial embeddings
- ✅ Age verification (e.g., 18+)
- ✅ Confidence score display (e.g., 87% match)
- ✅ Feedback for blurry/poor lighting images (basic)

---

## 💡 Bonus Capabilities

- 🌐 Multi-language support for OCR (future enhancement)
- 📊 Displays numerical verification score
- 💬 Alerts for poor image quality or lighting conditions

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Zynga_hackthon.git
cd Zynga_hackthon

folders:
  - backend
  - frontend/zynga_frontend
  - python_backend
  - screenshots

setup:
  frontend:
    path: frontend/zynga_frontend
    install_command: npm install
    start_command: npm run dev
    port: 5173
  backend:
    path: backend
    install_command: npm install
    start_command: npx nodemon server.js
    port: 4000
  python_backend:
    path: python_backend
    install_command: pip install -r requirements.txt
    start_command: python app.py
    port: 5000

execution:
  steps:
    - description: Clone the repository
      command: git clone https://github.com/Deepika8383/Zynga_hackthongit
    - description: Install frontend dependencies
      command: |
        cd frontend/zynga_frontend
        npm install
    - description: Install backend dependencies
      command: |
        cd backend
        npm install
    - description: Install Python backend dependencies
      command: |
        cd python_backend
        pip install -r requirements.txt
    - description: Start frontend
      command: |
        cd frontend/zynga_frontend
        npm run dev
    - description: Start backend
      command: |
        cd backend
        npx nodemon server.js
    - description: Start Python backend
      command: |
        cd python_backend
        python app.py

access:
  url: http://localhost:5173
  description: Access the app in your browser after all three servers are running.


## 🖼 Screenshots

### 🔹 Home Page
![Home Page](./screenshots/home.png)

### 🔹 Verification Page
![Verification Page](./screenshots/verify.png)

### 🔹 Result Page
![Result Page](./screenshots/result.png)

---

## 🎥 Demo Video

[Watch the Demo Video](https://your-demo-video-link.com)


troubleshooting:
  - tip: Ensure ports 5173, 5000, and 4000 are available.
  - tip: Make sure C++ build Tools is installed and in PATH.
  - tip: Use virtualenv if pip install fails:
      command: |
        python -m venv venv
        source venv/bin/activate  # Windows: venv\Scripts\activate
        pip install -r requirements.txt

notes:
  - This is a proof-of-concept. Do not use with real personal data.
  - No UIDAI or real government APIs are involved.
  - Use only simulated/fake Aadhar cards for testing.
