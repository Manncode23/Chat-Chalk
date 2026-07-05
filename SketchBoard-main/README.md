# ✏️ Chat-Chalk - Real-Time Collaborative Whiteboard & Chat

**Chat-Chalk** is a modern full-stack collaborative platform that combines a real-time whiteboard with live chat, enabling teams to brainstorm, sketch ideas, and communicate seamlessly in shared rooms.

Built with a scalable monorepo architecture, Chat-Chalk leverages WebSockets for low-latency collaboration, PostgreSQL for persistent storage, and JWT authentication for secure access.

---

## ✨ Features

### 🎨 Real-Time Collaborative Whiteboard
- Draw simultaneously with multiple users in shared rooms.
- Instant synchronization of every drawing action using WebSockets.
- Low-latency collaboration with in-memory state management.

### 🖍️ Complete Drawing Toolkit
- Freehand Pencil tool
- Rectangle tool
- Circle tool
- Intelligent Eraser that removes complete strokes

### 💬 Live Real-Time Chat
- Built-in room-based chat system.
- Instantly send and receive messages while collaborating.
- Chat updates are synchronized across all connected users through WebSockets.
- Enables seamless communication without leaving the whiteboard.

### 👥 Shared Collaboration Rooms
- Create or join collaboration rooms.
- Multiple users can draw and chat together simultaneously.
- Shared workspace with synchronized whiteboard and messaging.

### 💾 Persistent Storage
- Whiteboard data is stored in PostgreSQL using Prisma ORM.
- Drawings remain available after reconnecting.
- Reliable backend persistence for collaborative sessions.

### 🔐 Secure Authentication
- JWT-based authentication.
- Secure `httpOnly` cookie storage.
- Protected API routes and authenticated WebSocket connections.

### ⚡ High Performance
- In-memory state management on the WebSocket server.
- Optimized synchronization for smooth real-time collaboration.
- Efficient handling of concurrent users.

### 📱 Responsive Modern UI
- Built with Next.js 14 App Router.
- Fully responsive across desktop and mobile devices.
- Light & Dark mode support.
- Clean and intuitive user interface.

### 🏗️ Scalable Monorepo Architecture
- Turborepo-powered project structure.
- Shared UI components.
- Shared validation schemas.
- Shared backend utilities.

---

# 🚀 Tech Stack

## Monorepo
- Turborepo

## Frontend
- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS v4
- Framer Motion

## Backend
- Node.js
- Express.js

## Real-Time Communication
- WebSockets (`ws`)

## Database
- PostgreSQL
- Prisma ORM

## Authentication
- JWT
- cookie-parser

## Shared Packages
- `@repo/ui`
- `@repo/common`
- `@repo/backend-common`

---

# ⚙️ Running Locally

## Prerequisites

Install the following:

- Node.js (v18+)
- PostgreSQL
- npm

---

## 1. Clone the Repository

```bash
git clone https://github.com/Manncode23/Chat-Chalk.git

cd Chat-Chalk
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create the database environment file:

```bash
cp packages/db/.env.example packages/db/.env
```

Update the database connection:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/chatchalk"
```

Create `.env` files inside:

```
apps/http-server
apps/ws-server
```

Add:

```env
JWT_SECRET=your_secret_key
```

---

## 4. Push the Database Schema

```bash
npm run db:push
```

---

## 5. Start the Development Servers

```bash
npm run dev
```

---

# 🌐 Local Development

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| HTTP Server | http://localhost:3005 |
| WebSocket Server | ws://localhost:8080 |

---

# 📂 Project Structure

```text
Chat-Chalk/
│
├── apps/
│   ├── draw-fe
│   ├── http-server
│   └── ws-server
│
├── packages/
│   ├── db
│   ├── ui
│   ├── common
│   └── backend-common
│
├── package.json
├── turbo.json
└── README.md
```

---

# 📸 Preview

Add screenshots or GIFs demonstrating:

- 🎨 Real-time collaborative drawing
- 💬 Live room chat
- 👥 Multiple users collaborating simultaneously
- 🌙 Light & Dark mode
- 🖍️ Drawing tools

---

# 🚀 Future Enhancements

- ↩️ Undo / Redo history
- 📄 Export whiteboard as PNG/PDF
- 📎 File & image sharing
- 🎙️ Voice and video collaboration
- 📌 Sticky notes
- ♾️ Infinite canvas
- 🤖 AI-powered whiteboard assistant

---

# 📄 License

This project is licensed under the MIT License.
