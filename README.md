## This is my first FULL stack project ( using the MERN stack ) 
## link - https://prjt-manager.netlify.app
#### -> it is a project mangement platform having the key feature of sending email notification ( being  the owner of the project ) to invite members
#### Yes the UI/UX needs improvment and it could have been better, but everyone starts small ... Looking foward to build awesome projects in future!!
#### Loved the backend Architecture ( my fav part ) --> will aim for building scalable Backend Systems in upcoming projects.

#### my motive , to build this project was to understand the entire flow, of building a fullstack web app, 
#### how Frontend <-> Backend integration works, and 
#### Ofc , the Balls it takes to build a something while facing nasty , filthy errors , debugging and getting obsessed ;)

#### my focus will be on building solutions for Business problems, Hackathon PS, + integrating GEN AI ... 
#### Godspeed!

#### official readme ⬇️

## 📋 Project Manager App – Full Stack Task & Project Management System

#### A modern full-stack Project Manager Application that allows users to manage projects, assign tasks, track progress, and collaborate with team members — including real-time email invitations to onboard users seamlessly. Built with scalability, clean architecture, and real-world workflows in mind.

#### 🚀 Live Demo
#### Frontend (Netlify)
#### 👉 https://prjt-manager.netlify.app

#### ✨ Key Features
#### -> 🔐 Authentication & Authorization
#### ->Secure user registration & login
#### ->JWT-based authentication


#### 📁 Project Management
#### ->Create, update, delete projects
#### ->View all projects in a clean dashboard


#### ✅ Task Management
#### ->Create tasks under projects
#### ->Update status (pending, in-progress, completed)
#### ->Edit & delete tasks


#### 📊 Dashboard Overview
#### ->Project statistics
#### ->Task counts & progress tracking
#### ->📧 Email Invitation System (Special Feature)


#### Invite teammates directly via email using Brevo SMTP
#### ✔ Send project invitation links
#### ✔ Real-world collaboration flow
#### ✔ Secure email-based onboarding

This simulates how tools like Jira, ClickUp, or Asana onboard users.

🛠 Tech Stack
Frontend

React.js

Tailwind CSS

Axios

Deployed on Vercel

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Brevo SMTP (Email Service)

Deployed on Netlify

🏗 Project Architecture
Project-Manager/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── utils/
│
└── README.md

🔁 How It Works (Flow)

User registers/logs in

Creates a project

Adds tasks under the project

Invites team members via email

Invitee receives email → joins project

All members collaborate on tasks

📬 Email Invitation System – Under the Hood

Uses Brevo SMTP server

Secure mail transport via Nodemailer

Dynamic invite links sent to users

Production-ready email workflow

⚙️ Environment Variables

Create a .env file in backend:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_brevo_email
SMTP_PASS=your_brevo_smtp_key

🧑‍💻 Installation & Setup
Clone the repo
git clone https://github.com/harshit-technocrat11/Project-Manager.git
cd Project-Manager

Backend Setup
cd backend
npm install
npm run dev

Frontend Setup
cd frontend
npm install
npm run dev
