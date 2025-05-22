# 📡 SensoLink: IoT-Powered Motion Alert System

## 📖 Overview

**SensoLink** is an IoT-based motion detection system that uses a **PIR motion sensor** and an **ESP32 microcontroller** to detect motion, transmit event data via Wi-Fi to a **Django REST API**, and display this data in real time on both a **Flutter mobile app** and a **web dashboard** built with **Flutter Web**.

This system was designed to provide accessible, real-time monitoring of motion activity through both mobile and browser-based clients.

---

## 🛠️ System Architecture

- **PIR Motion Sensor** detects motion.
- **ESP32** sends HTTP POST requests containing motion event data.
- **Django REST API** receives the data, logs it to a **PostgreSQL database**.
- **Flutter Mobile App** and **Flutter Web Dashboard** fetch data via HTTP GET requests to display to users.

📊 *See system architecture diagram in `Written Report.pdf`*

---

## 🚀 Technologies and Tools Used

### 📟 IoT Device:
- **PIR Motion Sensor HC SR501**
- **ESP32 Microcontroller**
- **LED**
- **Breadboard & Solid Wires**
- **Arduino IDE**

### 💾 Backend:
- **Django REST Framework** — API development
- **PostgreSQL** — Database for motion event records
- **Render.com** — Cloud hosting for the backend API

### 📱 Frontend:
- **Flutter (Mobile App)** — Android APK and mobile UI
- **Flutter Web (Web Dashboard)** — Hosted via **Netlify**

### ⚙️ Development Tools:
- **Visual Studio Code**
- **Git & GitHub**

---

## 📱 Live Demo & Deployment

- **API Server:** [https://finalpitappdev.onrender.com](https://finalpitappdev.onrender.com)  
- **Web Dashboard:** [https://sensolink-appdev-finalpit.netlify.app](https://sensolink-appdev-finalpit.netlify.app)  
- **Mobile APK:** [Download APK](http://drive.google.com/file/d/1AHLIXGuRMRP9SqRzctqGZstH5P5pB2rS/view)

---

## 📌 How It Works

1. **Motion Detected:** PIR sensor triggers a HIGH signal to the ESP32.
2. **Data Transmission:** ESP32 sends a JSON POST request to the cloud-hosted Django REST API.
3. **Database Logging:** API receives the request and stores the event with a timestamp in PostgreSQL.
4. **Frontend Display:**
   - **Flutter Mobile App** fetches the event list via a GET request.
   - **Flutter Web Dashboard** fetches the same data via GET request and displays it in real time.

---

## 🔧 Future Improvements

- Implement remote motion monitoring with alert push notifications.
- Enhance frontend UI/UX for both mobile and web clients.
- Strengthen user authentication and data security.
- Add configurable detection sensitivity and custom alert settings.

---

## 👥 Team Members

- **Claire Marie Butong** — API Developer  
- **Jamaica Patac** — IoT Device Developer  
- **Rehana Nicole Ruilan** — Web Developer (Flutter Web)  
- **Dou Issa Steffi Udasco** — Database Administrator / DevOps  

---

## 📂 Project Repositories

- 📦 **[Backend API (Django)](https://github.com/claireymariey/FinalPITAppDev)**
- 📱 **[Mobile & Web Frontend (Flutter)](https://github.com/BadGalRiirii/flutter-frontend)**

---

## 📄 License

This project is for educational and demonstration purposes.
