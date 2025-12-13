# ScholarStream

**Live URL:** [https://stellular-swan-0515ad.netlify.app/login](https://stellular-swan-0515ad.netlify.app/login)

---

## Purpose

ScholarStream is a modern web application designed to help students discover and apply for scholarships. It provides a centralized platform to browse scholarships, submit applications, leave reviews, and track payments. Admins can manage scholarships, applications, and analytics easily.

---

## Key Features

### Student Features
- Browse and search scholarships by university, degree, and category.
- Paginated scholarship listings for easy navigation.
- Apply for scholarships and track application status.
- Submit reviews and ratings for scholarships.
- Secure login and authentication using JWT.

### Admin Features
- CRUD operations for scholarships (create, read, update, delete).
- View and manage student applications.
- Access analytics dashboard for scholarships and applications.
- Secure admin authentication and protected routes.

### Technical Features
- JWT-based authentication and authorization.
- MongoDB for data storage.
- RESTful API structure.
- Image uploads using ImgBB.
- Payment integration using Stripe.
- Firebase for authentication and cloud storage support.

---

## Tech Stack & npm Packages Used

### Frontend
- **React** – UI library for building interactive components
- **React Router Dom** – Routing in React
- **Axios** – API requests
- **Vite** – Frontend build tool
- **Firebase** – Authentication and storage
- **ImgBB API** – For image uploads
- **Stripe** – Payment integration

### Backend
- **Node.js** – JavaScript runtime
- **Express** – Server framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling
- **Cors** – Cross-Origin Resource Sharing
- **dotenv** – Environment variables
- **cookie-parser** – Cookie handling
- **jsonwebtoken** – JWT token management
- **Stripe** – Payment processing

---

## Deployment
- **Frontend:** Deployed on Netlify ([Live site](https://stellular-swan-0515ad.netlify.app/login))  
- **Backend:** Deployed on Render ([API URL](https://scholar-stream-backend.onrender.com/api))

---

## How to Run Locally

1. Clone the repository:

```bash
git clone <my- repo-url>
