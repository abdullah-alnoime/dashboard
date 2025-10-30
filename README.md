# Full-Stack Dashboard with Better Auth

A complete full-stack application with authentication, authorization, and admin dashboard featuring CRUD operations for projects, universities, courses, and messages.

## Tech Stack

### Frontend (Client)

- **Next.js 15** - React framework
- **Better Auth** - Authentication
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

### Backend

- **Auth Server** - Better Auth with Express
- **API Server** - Express.js REST API
- **MongoDB** - Database (via Mongoose)
- **JWT** - Token-based authentication

## Features

### Authentication

- ✅ Email/Password Sign Up & Sign In
- ✅ Email Verification
- ✅ Forgot Password / Reset Password
- ✅ Protected Routes
- ✅ Role-Based Access Control (Admin/User)

### Admin Features

- 👥 **User Management** - List, search, ban/unban users, change roles
- 📁 **Project Management** - Full CRUD for portfolio projects
- 🎓 **University Management** - Full CRUD for university education
- 📚 **Course Management** - Full CRUD for online courses
- ✉️ **Message Management** - View and delete contact messages

### User Features

- 📊 Dashboard with overview
- 👤 Profile management
- 🔒 Change password
- 📬 Contact form (public)

## Project Structure

```
├── client/                  # Next.js frontend
│   ├── app/
│   │   ├── (auth)/         # Auth pages (signin, signup, etc.)
│   │   ├── (dashboard)/    # Protected pages
│   │   │   ├── admin/      # Admin-only pages
│   │   │   ├── dashboard/  # User dashboard
│   │   │   └── profile/    # User profile
│   │   ├── contact/        # Public contact page
│   │   └── layout.js       # Root layout with providers
│   ├── components/         # React components
│   ├── lib/               # Libraries (auth-client, api-client)
│   └── package.json
├── auth/                   # Better Auth server
│   ├── lib/
│   │   └── auth.js        # Auth configuration
│   ├── utils/
│   │   └── sendEmail.js   # Email utilities
│   └── app.js             # Express server
└── api/                    # REST API server
    ├── controllers/        # Route handlers
    ├── models/            # MongoDB models
    ├── routes/            # API routes
    ├── middlewares/       # Auth & validation
    └── app.js             # Express server
```

## Installation & Setup

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- SMTP credentials for email (Gmail, SendGrid, etc.)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Setup Auth Server

```bash
cd auth
npm install
```

Create `.env` file:

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/dashboard_auth

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:5005

# Frontend URL
FRONTEND_URL=http://localhost:3000

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

Create `lib/auth.js`:

```javascript
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { admin } from "better-auth/plugins";
import { sendEmail } from "../utils/sendEmail.js";

const client = new MongoClient(process.env.MONGO_URI);

export const auth = betterAuth({
  database: mongodbAdapter(client),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail(
        user.email,
        "Reset Your Password",
        `Click here to reset your password: ${url}`
      );
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail(
        user.email,
        "Verify Your Email",
        `Click here to verify your email: ${url}`
      );
    },
  },
  plugins: [admin()],
  trustedOrigins: [process.env.FRONTEND_URL],
});
```

Start the server:

```bash
npm run dev  # Runs on port 5005
```

### 3. Setup API Server

```bash
cd ../api
npm install
```

Create `.env` file:

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/dashboard_api

# JWT
ACCESS_TOKEN_SECRET=your-jwt-secret-key

# Frontend URL
FRONTEND_URL=http://localhost:3000

# SMTP Configuration (same as auth server)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

Start the server:

```bash
npm run dev  # Runs on port 5000
```

### 4. Setup Client (Frontend)

```bash
cd ../client
npm install
```

Create `.env.local` file:

```env
NEXT_PUBLIC_AUTH_URL=http://localhost:5005
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev  # Runs on port 3000
```

## Usage

### Creating Admin User

1. Sign up as a regular user at http://localhost:3000/signup
2. Verify your email
3. Manually update the user role in MongoDB:

```javascript
// In MongoDB shell or Compass
db.user.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });
```

### Admin Dashboard Access

After logging in as admin, access:

- User Management: `/admin/users`
- Projects: `/admin/projects`
- Universities: `/admin/universities`
- Courses: `/admin/courses`
- Messages: `/admin/messages`

### API Endpoints

#### Authentication (via Better Auth)

- `POST /api/auth/sign-up/email` - Sign up
- `POST /api/auth/sign-in/email` - Sign in
- `POST /api/auth/sign-out` - Sign out
- `POST /api/auth/forget-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

#### Projects (Admin only for CUD)

- `GET /api/v1/project` - List all projects
- `POST /api/v1/project` - Create project (Admin)
- `GET /api/v1/project/:id` - Get single project
- `PATCH /api/v1/project/:id` - Update project (Admin)
- `DELETE /api/v1/project/:id` - Delete project (Admin)

#### Universities (Admin only for CUD)

- `GET /api/v1/education/university` - List universities
- `POST /api/v1/education/university` - Create (Admin)
- `GET /api/v1/education/university/:id` - Get single
- `PATCH /api/v1/education/university/:id` - Update (Admin)
- `DELETE /api/v1/education/university/:id` - Delete (Admin)

#### Courses (Admin only for CUD)

- `GET /api/v1/education/course` - List courses
- `POST /api/v1/education/course` - Create (Admin)
- `GET /api/v1/education/course/:id` - Get single
- `PATCH /api/v1/education/course/:id` - Update (Admin)
- `DELETE /api/v1/education/course/:id` - Delete (Admin)

#### Messages (Admin only)

- `GET /api/v1/message` - List all messages (Admin)
- `POST /api/v1/message` - Create message (Public)
- `GET /api/v1/message/:id` - Get single message (Admin)
- `DELETE /api/v1/message/:id` - Delete message (Admin)

## Environment Variables

### Auth Server

| Variable           | Description               | Example                             |
| ------------------ | ------------------------- | ----------------------------------- |
| MONGO_URI          | MongoDB connection string | `mongodb://localhost:27017/auth_db` |
| BETTER_AUTH_SECRET | Secret for Better Auth    | Random string                       |
| BETTER_AUTH_URL    | Auth server URL           | `http://localhost:5005`             |
| FRONTEND_URL       | Frontend URL for CORS     | `http://localhost:3000`             |
| SMTP_HOST          | SMTP server host          | `smtp.gmail.com`                    |
| SMTP_PORT          | SMTP server port          | `587`                               |
| SMTP_USER          | SMTP username             | Your email                          |
| SMTP_PASS          | SMTP password             | App password                        |

### API Server

| Variable            | Description               | Example                            |
| ------------------- | ------------------------- | ---------------------------------- |
| MONGO_URI           | MongoDB connection string | `mongodb://localhost:27017/api_db` |
| ACCESS_TOKEN_SECRET | JWT secret                | Random string                      |
| FRONTEND_URL        | Frontend URL for CORS     | `http://localhost:3000`            |

### Client

| Variable             | Description     | Example                 |
| -------------------- | --------------- | ----------------------- |
| NEXT_PUBLIC_AUTH_URL | Auth server URL | `http://localhost:5005` |
| NEXT_PUBLIC_API_URL  | API server URL  | `http://localhost:5000` |

## Common Issues

### SMTP Email Issues

If using Gmail:

1. Enable 2-factor authentication
2. Generate an App Password
3. Use the app password in SMTP_PASS

### CORS Issues

Ensure `FRONTEND_URL` is set correctly in both servers' `.env` files.

### MongoDB Connection

Make sure MongoDB is running:

```bash
# If using local MongoDB
mongod
```

## Production Deployment

### Environment Setup

1. Set all environment variables in your hosting platform
2. Use production MongoDB URI (MongoDB Atlas recommended)
3. Set secure BETTER_AUTH_SECRET and ACCESS_TOKEN_SECRET
4. Update CORS origins to production domains

### Build Commands

```bash
# Client
cd client && npm run build && npm start

# Auth Server
cd auth && npm start

# API Server
cd api && npm start
```

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
