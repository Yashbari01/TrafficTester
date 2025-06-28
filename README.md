API Traffic Tester 🚀

A fullstack API load testing tool built with React (Frontend) and Express (Backend).

It allows developers to simulate concurrent API traffic, test endpoint performance, and analyze response statistics.

----------------------------------------
FEATURES
----------------------------------------
- Send concurrent HTTP requests (GET, POST, PUT, DELETE)
- Add custom headers (e.g., Authorization)
- Control total requests and concurrency level
- View live summary (success/failure count, min/max/avg time)
- Download full result JSON
- Fully responsive with dark mode support

----------------------------------------
PROJECT STRUCTURE
----------------------------------------

```
TrafficTester/
├── frontend/             --> React frontend
│   ├── public/
│   └── src/
│       └── App.js
│       └── index.js
│
├── backend/             --> Express backend
│   └── server.js
│
├── package.json        --> Root scripts
├── package-lock.json
                  
```
----------------------------------------
LIVE DEMO
----------------------------------------
https://api-traffic-tester.netlify.app

----------------------------------------
GETTING STARTED
----------------------------------------

1. Clone the repository:
```
   git clone https://github.com/Yashbari01/TrafficTester.git
   cd TrafficTester
```

2. Install dependencies:
```
   npm install
   cd backend && npm install
   cd frontend && npm install
```

3. Backend Start
```
   npm run dev 
```

4. Frontend Start
```
   npm start
```

Note:                  
```
Make sure your backend runs on http://localhost:5000                  

You can change the backend URL in the frontend if needed.                  
```

----------------------------------------
AUTHOR
----------------------------------------

Developed by Yash Bari                  
```
Portfolio: https://yashbariportfolio.netlify.app                  

Live Projects: https://yashbariportfolio.netlify.app/project                  

GitHub: https://github.com/Yashbari01                  
```

----------------------------------------
LICENSE
----------------------------------------
This project is licensed under the MIT License.
