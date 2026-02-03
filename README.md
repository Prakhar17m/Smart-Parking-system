# 🚗 ProTrack SPS – Smart Parking System

ProTrack SPS is a modern **Smart Parking Management System** built using **React** and **SCSS**, designed to efficiently manage parking slots with real-time status updates. The application provides a clean admin dashboard to **add parking slots**, **assign vehicles intelligently**, and **remove vehicles seamlessly**.

---

## ✨ Features

* 📊 **Live Inventory Dashboard**
  View real-time parking slot status (Available / Occupied)

* ➕ **Add Parking Slots**
  Create parking slots with features like:

  * EV Charging support
  * Covered / Indoor facility

* 🚘 **Smart Slot Assignment**
  Automatically assigns the best available slot based on:

  * EV charging requirement
  * Covered parking requirement

* 🗑 **Remove Vehicle (Exit Clearance)**
  Free up occupied slots using Slot ID

* 💾 **Persistent Data**
  Parking data is saved using **LocalStorage**

* 🎨 **Modern UI / UX**
  Glassmorphism UI, badges, stats cards, and responsive layout

---

## 🛠 Tech Stack

* **Frontend:** React.js
* **Styling:** SCSS / Tailwind CSS
* **Icons:** Lucide React
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Storage:** Browser LocalStorage
* **Deployment:** Vercel

---

## 📂 Project Structure

```bash
src/
├── components/
│   ├── AddSlot.jsx
│   ├── ParkRemove.jsx
│   ├── SlotList.jsx
│   ├── OutputPanel.jsx
├── App.jsx
├── index.css
├── main.jsx
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/protrack-sps.git
cd protrack-sps
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Application

```bash
npm start
```

App will run on:

```
http://localhost:3000
```

---

## 🌐 Deployment on Vercel

1. Push your project to **GitHub**
2. Go to 👉 [https://vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Select framework:

   * **Create React App** or **Vite** (based on your setup)
5. Build Command:

   ```bash
   npm run build
   ```
6. Output Directory:

   * CRA → `build`
   * Vite → `dist`
7. Click **Deploy** 🚀

---



## 🔮 Future Enhancements

* 🔐 Authentication (Admin / Staff roles)
* ☁ Backend Integration (Node.js + MongoDB)
* 📱 Mobile-first PWA version
* 📊 Analytics & reports
* 🔔 Notifications for slot availability

---


> Built with ❤️ using React & modern UI principles
