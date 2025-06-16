# 🍽️ Calorie Tracker App

A full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to:

- 🔐 Register and log in securely using tokens stored in cookies
- 🧮 Calculate their daily calorie needs using a custom form
- 📖 Track daily meals and calories
- 📆 See meals by date
- 🔄 Automatically refresh tokens
- 🧭 Navigate a responsive interface with dynamic routes

## 🚀 Features

- JWT authentication with access/refresh token rotation
- MongoDB-based user and meal tracking
- Responsive layout with custom sidebar and mobile views
- Protected routes and conditional redirects
- Validations using Joi (backend) and Yup (frontend)
- Built-in Redux with AsyncThunk for API logic

## 🧰 Tech Stack

- **Frontend**: React, Redux Toolkit, React Router, Axios, Tailwind/CSS Modules
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, Cookies
- **Validation**: Joi (API), Yup (Form)
- **Others**: body-scroll-lock, react-toastify, ESLint, dotenv
