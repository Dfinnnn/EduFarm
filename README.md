# 🌱 EduFarm – Smart Agriculture Web Platform

EduFarm is a web-based smart agriculture platform built using **Next.js (App Router), TypeScript, and Firebase**.

This project serves as the frontend system for a smart farming solution (Blue Sky Farm concept), designed to modernize agricultural management through digital monitoring and scalable cloud infrastructure.

This repository is maintained for academic continuation and future batch development.

---

# 📌 Project Objective

EduFarm was developed to:

* Provide a scalable smart farming web interface
* Demonstrate full-stack integration using Firebase
* Serve as a foundation for IoT-based agricultural systems
* Enable future integration of real-time farm monitoring

This project can be extended into:

* Smart irrigation systems
* Crop monitoring dashboards
* Zone-based farm automation
* Farm economic simulation tools
* AI-powered agricultural analytics

---

# 🛠 Tech Stack

| Layer           | Technology                 |
| --------------- | -------------------------- |
| Frontend        | Next.js (App Router)       |
| Language        | TypeScript                 |
| Database        | Firebase Firestore         |
| Authentication  | Firebase Auth (if enabled) |
| Hosting         | Vercel / Firebase Hosting  |
| Package Manager | npm                        |

---

# 🔥 Firebase Integration

This project uses **Firebase** for:

* 🔐 Authentication (Optional)
* 📂 Firestore Database
* ☁️ Cloud Storage (Optional)
* 🌐 Hosting (Optional)

---

# ⚙️ Firebase Setup Guide (IMPORTANT FOR NEXT BATCH)

## 1️⃣ Create Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **Create Project**
3. Enable:

   * Firestore Database
   * Authentication (if needed)
   * Storage (if needed)

---

## 2️⃣ Get Firebase Config

Inside Firebase Console:

Project Settings → General → Your Apps → Web App

Copy the configuration:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};
```

---

## 3️⃣ Create `.env.local`

Inside root directory:

```
.env.local
```

Add:

```
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

⚠️ DO NOT push `.env.local` to GitHub.

---

# 📂 Project Structure

```
EduFarm/
│
├── public/                 # Static files
├── src/
│   ├── app/                # Next.js App Router
│   ├── components/         # Reusable UI components
│   ├── utils/              # Helper functions
│   ├── firebase/           # Firebase configuration
│
├── .env.local              # Environment variables (not committed)
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🚀 Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Danishhariss/EduFarm.git
cd EduFarm
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Run Development Server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 📦 Build for Production

```bash
npm run build
npm run start
```

---

# 🗄 Firebase Firestore Structure (Suggested)

Future batches may use a structure like:

```
farms (collection)
  └── farmId
        ├── name
        ├── location
        ├── zones

zones (subcollection)
  └── zoneId
        ├── soilMoisture
        ├── temperature
        ├── humidity
        ├── pumpStatus
```

This structure supports:

* Multi-zone irrigation
* Sensor-based monitoring
* Farm analytics

---

# 📈 Suggested Future Improvements

### 1️⃣ Real-Time Monitoring

* Use Firestore real-time listeners
* Display live sensor updates

### 2️⃣ Authentication System

* Role-based access
* Farmer dashboard vs Admin dashboard

### 3️⃣ Farm Automation Logic

* Zone-based pump control
* Automated pesticide scheduling
* Cost simulation per acre

### 4️⃣ Data Visualization

* Chart.js / Recharts
* Farm productivity graphs

### 5️⃣ IoT Integration

* Connect physical sensors
* Use Firebase Cloud Functions
* Trigger automation events

---

# 🏗 System Architecture

Frontend:

* Next.js + TypeScript
* Firebase SDK

Backend (Serverless):

* Firebase Firestore
* Firebase Authentication
* Optional Cloud Functions

Deployment:

* Vercel or Firebase Hosting

Architecture Type:

* Serverless Full Stack

---

# 📜 Contribution Guidelines

1. Create a new branch:

   ```bash
   git checkout -b feature/feature-name
   ```

2. Test locally

3. Commit properly:

   ```bash
   git commit -m "Add: feature description"
   ```

4. Push and create Pull Request

---

# ⚠️ Important Notes for Future Teams

* Do NOT expose Firebase keys publicly.
* Keep `.env.local` private.
* Follow modular component structure.
* Update README if major changes occur.
* Avoid unnecessary package installation.

---

# 👨‍💻 Author

**Muhammad Danish Aiman Hariss**
EduFarm – Smart Agriculture Platform
Academic Smart Farming Initiative and also a webpage for Blue Sky Farm

---

# 📄 License

This project is intended for educational and research purposes.

You may apply MIT License if needed.

---

# 🌟 Message to Next Batch

This is not the final product.

It is a foundation for a scalable smart farming system.

You are encouraged to:

* Improve the UI
* Strengthen Firebase structure
* Implement automation logic
* Integrate real IoT hardware

Build something better than the previous batch.

Good luck !

```

