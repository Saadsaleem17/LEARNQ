# LearnQ 🎓📚

💡 **Introducing LEARNQ!**
LearnQ is a **MERN-stack** web app that transforms YouTube playlists into **AI-generated quizzes** using video transcripts (not just metadata!). To make learning more engaging, we introduced an **in-game token system**, rewarding players for correct answers and accuracy. 🏆

## 🌟 Features

### 🎥 YouTube API Integration
- Fetches videos & extracts **full transcripts** from **YouTube playlists**.
- Enables quiz creation from multiple videos for a **comprehensive learning experience**.

### 🧠 AI-Powered Quiz Generation (Gemini AI)
- Uses **Google Gemini AI** to analyze transcripts.
- Generates **context-aware, intelligent quiz questions** that enhance retention.
- Adapts question difficulty based on user performance.

### 📊 Progress Tracking & Insights
- Monitors past quiz performance & tracks improvement over time.
- Provides **detailed analytics** on strengths and areas for growth.

### 🔐 Secure Authentication
- Users can **sign up & log in** securely.
- Personalized quiz history & saved progress for each user.
- **Database integration ensures user data is stored securely** and retained across sessions.
- Users do not lose their progress or tokens when they log out.


### 📱 Responsive & Intuitive UI
- Optimized for **desktop & mobile** users.
- **Fast, smooth & interactive** interface for seamless learning.

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **APIs:** YouTube API, Gemini AI
- **Hosting & Deployment:** Vercel

---

## 🚀 Getting Started

### 🔧 Prerequisites
Ensure you have the following installed:
- Node.js (LTS version)
- MongoDB (local or cloud instance)
- Git
- Yarn or npm

### 🔽 Clone the Repository
```sh
git clone https://github.com/saadsaleem17/learnq.git
cd learnq
```

### 📦 Install Dependencies
```sh
npm install
```

### 🛠️ Setup Environment Variables
Create a `.env` file and add:
```sh
MONGO_URI=your_mongodb_connection_string
REACT_APP_YOUTUBE_API_KEY=your_api_key_here
REACT_APP_GEMINI_API_KEY=your_api_key_here
```

### ▶️ Run the Application
```sh
npm start
```
The app will be available at `http://localhost:3000`

---

## 📌 Future Enhancements
✅ Add **multiplayer quiz mode** 🏆
✅ Integrate **leaderboard rankings** 📊
✅ Support **multiple-choice & open-ended questions** ✍️
✅ Implement **AI-powered hints** for challenging questions 🤖

---

## 🤝 Contributing
We welcome contributions! 🚀 Feel free to fork the repo, create a feature branch, and submit a pull request.

```sh
git checkout -b feature-branch
# Make your changes
git commit -m "Added a new feature"
git push origin feature-branch
```

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 🔗 Useful Links
- 🎮 Live Demo: [LearnQ](https://jhaszoz6klvqxvap.vercel.app/)
- 📂 GitHub Repo: [LearnQ Repository](https://github.com/saadsaleem17/learnq)
- 💬 Contact: Reach out via [LinkedIn](https://www.linkedin.com/in/saad-salim-24b251228/) or GitHub Issues!

🚀 **Happy Learning with LearnQ!** 🎓
