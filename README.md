### ✅ README.md for `WomenAPP`


## 📁 Project Structure

```
WOMEN_APP/
├── client/                  # Frontend app (not covered here)
├── server/                 
│   ├── controllers/         # All controller logic (auth, user, post, notification)
│   ├── emails/              # Email templates and handlers (Mailtrap)
│   ├── lib/                 # Utility functions (DB connection, Cloudinary, Mailtrap)
│   ├── middleware/          # Middleware (auth)
│   ├── models/              # Mongoose schemas (User, Post, Notification)
│   ├── routes/              # API route definitions
│   └── server.js            # Entry point for backend server
├── .env                     # Environment variables
├── package.json             
```

---

## 🚀 Features

- User Authentication (Register/Login with JWT)
- Role-based Access
- Create and Fetch Posts (with images via Cloudinary)
- Notification system
- Email integration using Mailtrap
- RESTful API structure

---

## ⚙️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT Auth**
- **Cloudinary API** for image hosting
- **Mailtrap** for dev email testing
- **CORS** for frontend-backend integration

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/RiyaSuthar04/DE_commonProject_WomenApp.git
cd DE_commonProject_WomenApp/server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup `.env` file

Create a `.env` file in the `server/` directory and paste the following:

```env
PORT=5000
MONGO_URL="mongodb://localhost:27017/women_app"
JWT_SECRET=mymostpowerfulsecret
NODE_ENV=development

MAILTRAP_TOKEN=d3a4a6ea8445d6488086499b99f8d59b
EMAIL=hello@demomailtrap.co
NAME=riya suthar

CLOUDINARY_API=322825183367295
CLOUDINARY_CLOUD_NAME=dop5fxlhb
CLOUDINARY_API_SECRET=vMtfSUndznaP708_MvOjGnmOpwg

CLIENT_URL=http://localhost:5173
```

### 4. Run the MongoDB server

Make sure MongoDB is running locally on your system:

```bash
mongod
```

### 5. Start the server

```bash
npm start
```

You should see:

```
Server running on http://localhost:5000
MongoDB connected...
```

---

## 📬 API Endpoints (examples)

### POST `/api/v1/posts`
Create a new post with optional image.

### GET `/api/v1/users/:username`
Get public profile of a user.

### POST `/api/v1/auth/login`
Login with username and password.

---

## 🌐 Frontend Integration

Make sure the frontend app runs at `http://localhost:5173` (update `CLIENT_URL` in `.env` if different). The backend is CORS-enabled for frontend interaction.

---

## 📸 Cloudinary Image Upload

Images sent with `base64` format in post creation will be uploaded to Cloudinary.

---

## ✉️ Mailtrap for Dev Email Testing

Emails like verification or notifications are sent using Mailtrap. Use the credentials from `.env`.

---

## 👩‍💻 Author

**Riya Suthar**  
3rd Year IT Student

---

## 📄 License

MIT License – Free to use and modify.
```

---
