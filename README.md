awesome readme powered by claude and ammar

## Setup

- Clone the repo
- Run `npm install`
- Copy `.env.example` to `.env` and fill in `MONGO_URI` and `PORT` (REFER IN WS GROUP PINNED MESSAGE)
- Get the MongoDB Atlas connection string
- Run `npm run dev` to start the server

---

## Git Workflow by nabil (Always create specific branch for specific things we are doing)

1. Checkout main branch and get latest updates
   git checkout main
   git pull

2. Create and switch to a new feature branch
   git checkout -b feature-1

3. Do your work (code changes)

4. Stage and commit changes
   git add .
   git commit -m "Your changes"

5. Push branch to remote
   git push origin feature-1

6. Create Pull Request and merge into main (on GitHub)

7. Switch back to main and update it
   git checkout main
   git pull

8. Delete feature branch (local and remote)
   git branch -d feature-1
   git push origin --delete feature-1

---

## Project Structure (what goes where)

```
src/
├── models.js          
├── app.js             → mounts all routes
├── utils.js           → AppError and catchAsync
├── config/
│   ├── db.js          → database connection
│   └── env.js         → env variable checker
├── auth.middleware.js → demoAuth, roleGuard, validateObjectId, errorHandler
├── routes/            → URL definitions only, no logic
├── controllers/       → reads req, calls service, sends res
└── services/          → business logic only
```

Every feature follows this exact path, no exceptions:

```
route → controller → service → model
```

- **Route** — defines the URL and which middlewares + controller to call
- **Controller** — reads `req`, calls the right service function, sends `res`
- **Service** — does the actual work (DB queries, calculations, logic)
- **Model** — the database schema in `models.js`

If you are writing a DB query inside a route or controller, move it to the service.

---

## Adding a New Endpoint (step by step)

1. Open the correct route file (`buyer.routes.js` or `handler.routes.js`)
2. Add the route and point it to a controller function
3. Open the matching controller file and write the controller function
4. Open the matching service file and write the actual logic
5. Go to `app.js` and make sure the route file is uncommented
6. Test with Postman

---

## Response Format

Always return this shape:

```js
// success
res.status(200).json({ success: true, data: result });

// created
res.status(201).json({ success: true, data: newDoc });

// error (let AppError handle it, do not manually write this)
{ success: false, error: "message here" }
```

---

## Listing Status Flow

```
active → closed → shipped → settled
              ↘ cancelled
```

- `active` — open for orders, before deadline
- `closed` — deadline passed, waiting for handler to confirm shipment
- `shipped` — handler confirmed, final price set, buyers settling remaining payment
- `settled` — all orders collected or cancelled
- `cancelled` — handler cancelled, no shipment

**Never manually set listing status in a controller.** Always go through the service so the logic stays consistent.

---

## Order Status Flow

```
active → confirmed → ready_to_collect → collected
      ↘ cancelled
```

- `active` — deposit paid, waiting for listing to ship
- `confirmed` — final price set, remaining amount calculated
- `ready_to_collect` — remaining paid (online or COD selected)
- `collected` — buyer physically picked up the item
- `cancelled` — order was cancelled before shipment

---

## Common Mistakes to Avoid

- Do not put logic inside routes
- Do not query the DB inside controllers
- Do not forget `catchAsync` when writing an async controller — unhandled promise rejections will crash the server
- Do not hardcode user IDs — always use `req.user.id` from the auth middleware
- Do not change `models.js` without telling the team — a schema change breaks everyone
- Do not push `.env` to GitHub