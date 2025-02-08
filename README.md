Real-Time Chat Application

Tech Stack

Frontend: React, Tailwind CSS

Backend: Node.js, Express, socket.io

Database: MongoDB

Cloud Storage: Cloudinary

Features

Real-Time Messaging: Implemented WebSocket protocol using socket.io for a persistent connection between the client and server.

User Authentication: Secure login system with username and password authentication.

Media Support: Uploaded images are stored securely using Cloudinary.

Scalability: Optimized for real-time communication with MongoDB for efficient data storage.

Credentials for Testing

Username: testuser

Password: testpassword

Key Considerations

Initial Login Delay: Since the backend runs on a free instance, the first login attempt may be slow due to server cold start.

Feature Completeness: All functionalities have been implemented as per the project requirements.

Installation & Setup

Clone the Repository:

git clone https://github.com/your-repository.git
cd your-repository

Install Dependencies:

npm install

Run the Application:

Backend:

cd backend
npm start

Frontend:

cd frontend
npm start

Contributing

Feel free to submit issues or feature requests. Contributions are welcome!
