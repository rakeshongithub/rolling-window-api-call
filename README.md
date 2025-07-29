## 🚀 Rolling Window Fetch Demo

This repository showcases the Rolling Window approach for handling multiple API calls efficiently.

## 🔍 How the Rolling Window Logic Works (Step-by-Step)

Here's what happens in fetchItemsWithRollingWindow:

1. Chunk the IDs into arrays of 4.
2. Create a pool of 5 "workers" (runNext() functions).
3. Each worker:
   Picks the next available chunk,
   Awaits the result,
   Triggers another call as soon as it finishes.

4. This continues until all chunks are processed, but never more than 5 calls are active at a time.

🔁 This creates a rolling effect, where one completes → another starts.

---

## 🛠️ Getting Started

### Backend (Express.js)

```
cd rolling-fetch-backend
npm install
node server.js

```

---

➡️ Server will start at: http://localhost:4000

---

### Frontend (React + Vite)

```
cd rolling-fetch-client
npm install
npm run dev

```

---

➡️ Visit http://localhost:5173, click "Fetch 100 Items", and watch the requests flow—5 at a time!

---

## 📖 Want to Learn More?

Check out the full article that explains the concept in detail:

- [Tame the API Stampede: How Rolling Window Fetching Keeps Your Frontend Fast and Responsive](https://medium.com/@rakeshkumar-42819/tame-the-api-stampede-how-rolling-window-fetching-keeps-your-frontend-fast-and-responsive-b107a6055c0c)
