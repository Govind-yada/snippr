# 🚀 URL Shortener — Production-Grade Backend System

A scalable and production-ready URL Shortener built with Node.js, Express, MongoDB, and Redis, optimized with batching, caching, and rate limiting strategies used in real-world systems.

🔗 Live URL:
https://url-shortener-q5n1.onrender.com

------------------------------------------------------------------------------------------------------------------------------------------------

## 🧠 System Design Overview
```
Client
   │
   ▼
Express Server
   │
   ├── MongoDB (Persistent Storage)
   └── Redis (Rate Limiting + Click Buffering)
```

Design Goals

- Minimize database write load

- Prevent abuse via distributed rate limiting

- Keep redirect path extremely fast

- Ensure production-level security

- Make system horizontally scalable

-----------------------------------------------------------------------------------------------------------------------------------------------

## ⚡ Core Features-

### 🔗 Short URL Generation

- Base62 encoding

- Collision-safe generation

- Atomic counter strategy

### 📊 Click Tracking (Optimized)

- Clicks are NOT written directly to MongoDB

- Stored temporarily in Redis

- Flushed in batches every 60 seconds

### 🚦 Sliding Window Rate Limiting

- Implemented using Redis

- Prevents API abuse

- More accurate than fixed-window limiting

### 🔐 Security Layer

- Helmet (HTTP security headers)

- CORS protection

- Compression middleware

- Trust proxy enabled (for production environments)

### 🐳 Fully Dockerized

- App container

- MongoDB container

- Redis container

- Environment-based configuration

### 🔥 Performance Optimization: Redis Click Batching
**The Problem**

- If 10,000 users click the same link:

- 10,000 MongoDB writes ❌

- Database bottleneck ❌

#### The Solution

- Increment Redis key:
clicks:<shortCode>

- Background batcher runs every 60 seconds

- Aggregates count

- Updates MongoDB using $inc

- Deletes Redis key

- Why This Matters

- Reduces write amplification

- Handles traffic spikes

- Improves scalability

- Mimics production caching strategies

- This is how real systems reduce database pressure.

### 🚦 Rate Limiting Strategy

- Implemented Sliding Window Algorithm using Redis.

- Why not fixed window?

- Because fixed window allows burst abuse at window boundaries.

- Sliding window:

- Fair

- Precise

- Distributed-friendly

- Production-ready

-------------------------------------------------------------------------------------------------------------------------------------------------

## 📡 API Endpoints
### Create Short URL
```
POST /
```
Body:
```
{
  "originalUrl": "https://google.com"
}
```
Response:
```
{
  "shortCode": "abc123",
  "shortUrl": "https://yourdomain.com/abc123"
}
```

### Redirect
```
GET /:shortCode
```
Redirects to original URL and increments click counter.

### Analytics
```
GET /analytics/:shortCode
```
Response:
```
{
  "shortCode": "abc123",
  "originalUrl": "https://google.com",
  "clicks": 42,
  "createdAt": "...",
  "expiresAt": null
}
```
-----------------------------------------------------------------------------------------------------------------------------------------------

## 🐳 Local Development (Docker)
```
docker compose up --build
```

Services started:

- Node App

- MongoDB

- Redis

## ⚙️ Environment Variables
```
PORT=
MONGO_URL=
REDIS_URL=
```
Production secrets are configured in Render environment settings (not committed).

------------------------------------------------------------------------------------------------------------------------------------------------

## 📈 Scalability Considerations

This system supports:

- Horizontal scaling (stateless API)

- Distributed rate limiting (Redis-based)

- Reduced DB load (batched writes)

- Cloud deployment

To scale further:

- Move Redis to managed service

- Add load balancer

- Add caching for redirect lookups

- Introduce read replicas for MongoDB

- Add analytics collection via message queues (Kafka/RabbitMQ)

-----------------------------------------------------------------------------------------------------------------------------------------------

## 🎯 What This Project Demonstrates

- Backend architecture understanding

- Caching strategies

- Rate limiting design

- Write optimization using batching

- Docker-based containerization

- Cloud deployment

- Environment-based configuration management

- Production debugging & monitoring readiness

-----------------------------------------------------------------------------------------------------------------------------------------------

## 🚀 Possible Future Enhancements

- User authentication

- Per-user dashboards

- Detailed analytics (IP, device, country)

- Custom domains

- QR code generation

- Link expiration handling

- Message queue based async processing

- Horizontal scaling via container orchestration

------------------------------------------------------------------------------------------------------------------------------------------------

## 👨‍💻 Author

Abhishek Yadav
Backend Developer | MERN Stack | System Design Enthusiast
