# ✏️ SketchBoard - A Real-Time Collaborative Whiteboard

SketchBoard is a full-stack, open-source digital whiteboard application inspired by tools like Excalraw and Miro. Built with a modern technology stack, it provides a real-time, collaborative canvas for users to sketch ideas, create diagrams, and brainstorm visually.

 
_A polished, responsive dashboard with a "Hand-drawn Minimalism" theme and light/dark mode support._

---

## ✨ Key Features

-   **Real-Time Collaboration:** Powered by WebSockets, all drawing, shaping, and erasing actions are synced instantly across all users in a room. The backend uses an in-memory state cache for high performance and to eliminate race conditions.
-   **Complete Drawing Toolset:** Includes an intuitive freehand **Pencil**, **Rectangle** and **Circle** shapes, and a powerful **Eraser** that correctly removes entire strokes.
-   **Persistent Canvases:** All whiteboard content is saved to a PostgreSQL database, so your work is always there when you return. Shape deletions are permanent.
-   **Secure Authentication:** Full-stack user authentication system using JWTs stored in secure, `httpOnly` cookies. Includes a robust two-token strategy to secure WebSocket connections.
-   **Modern Frontend:** Built with the latest Next.js 14 App Router, React, and a config-less Tailwind CSS v4 setup. The UI is fully responsive and features a beautiful "Hand-drawn Minimalism" theme.
-   **Scalable Monorepo Architecture:** Developed using a Turborepo for a clean separation of concerns between frontend applications and shared backend/UI packages.


_A short GIF demonstrating the real-time collaboration and drawing tools._

---

## 🚀 Tech Stack

This project is a showcase of modern, full-stack web development practices.

-   **Monorepo:** **Turborepo**
-   **Frontend:**
    -   Framework: **Next.js 14+** (App Router)
    -   Language: **React**, **TypeScript**
    -   Styling: **Tailwind CSS v4** (Config-less)
    -   Animation: **Framer Motion**
-   **Backend (HTTP Server):**
    -   Framework: **Node.js**, **Express**
    -   Database: **PostgreSQL** with **Prisma ORM**
    -   Authentication: **JWT**, `cookie-parser`
-   **Backend (Real-Time Server):**
    -   Protocol: **WebSockets** (`ws` library)
    -   Architecture: In-memory state management for performance and consistency.
-   **Shared Packages:**
    -   `@repo/ui`: Shared, headless UI components (Button, Card, etc.).
    -   `@repo/common`: Shared Zod schemas for validation.
    -   `@repo/backend-common`: Shared backend configurations.

---

## ⚙️ Running Locally

To run this project on your local machine, please ensure you have Node.js (v18+) and PostgreSQL installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/KrishnaShuk/SketchBoard.git
    cd SketchBoard
    ```

2.  **Install dependencies:**
    This project uses npm workspaces. Run the install command from the root directory to install dependencies for all packages and applications.
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    You will need to create a `.env` file in the `packages/db` directory. You can copy the example file:
    ```bash
    cp packages/db/.env.example packages/db/.env
    ```
    Then, edit `packages/db/.env` and add your PostgreSQL database connection string:
    ```
    DATABASE_URL="postgresql://user:password@host:port/database"
    ```
    You will also need a `JWT_SECRET` in `.env` files within the `apps/http-server` and `apps/ws-server` directories.

4.  **Push the Database Schema:**
    This command will sync your Prisma schema with your database, creating the necessary tables.
    ```bash
    npm run db:push
    ```

5.  **Run the application:**
    This command will start all applications (`draw-fe`, `http-server`, `ws-server`) in the monorepo concurrently.
    ```bash
    npm run dev
    ```
    -   The Next.js frontend will be available at `http://localhost:3001`.
    -   The Express HTTP server will be at `http://localhost:3005`.
    -   The WebSocket server will be at `http://localhost:8080`.

---

