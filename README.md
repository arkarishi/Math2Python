# Math2Python 🧮 ➡️ 🐍

**Math2Python** is a full-stack AI agent that instantly converts research-grade LaTeX optimization equations into executable, production-ready Python code. It bridges the gap between theoretical research and engineering implementation.

## 🚀 Live Demo
*   **Web App (Frontend):** [**https://math2-python.vercel.app**](https://math2-python.vercel.app/)
*   **API (Backend):** [https://math2python-api.onrender.com](https://math2python-api.onrender.com)

---

## ✨ Key Features

### 1. 🧠 Multimodal Input
*   **Image-to-Code**: Drag & drop screenshots of equations from papers.
*   **LaTeX Support**: Paste complex LaTeX strings directly.

### 2. ⚡ Dual Code Generation
*   **SymPy (Symbolic)**: Generates exact symbolic representations for validation.
*   **NumPy / PyTorch (Numerical)**: Generates highly optimized, vectorized code ready for training loops.

### 3. 👨‍💻 "Senior Engineer" Analysis
*   **Complexity Analysis**: Automatically estimates **Time** ($O(N^3)$) and **Space** complexity.
*   **Stability Warnings**: Flags potential numerical instabilities (e.g., division by zero, unstable matrix inversions) *before* you run the code.

### 4. 📓 Jupyter Export
*   **One-Click Download**: Export the entire solution as a `.ipynb` file, ready for Google Colab or Jupyter implementations.

---

## 🛠️ Tech Stack

### Frontend
*   **React (Vite)**: High-performance SPA.
*   **Tailwind CSS**: Modern utility-first styling.
*   **Framer Motion**: Smooth, glassmorphism UI animations.

### Backend
*   **Python (FastAPI)**: Async, type-safe API.
*   **AI Engine**: **Gemini 2.0 Flash** (via OpenRouter) for multimodal reasoning.
*   **SymPy**: For symbolic math validation.

---

## 🏃‍♂️ How to Run Locally

### 1. Backend
```bash
cd backend
# Create .env file with: OPENROUTER_API_KEY=sk-or-v1-...
pip install -r requirements.txt
uvicorn main:app --reload
```
API runs at: `http://127.0.0.1:8000`

### 2. Frontend
```bash
cd "frontend 2"  # Note the space in the folder name
npm install
npm run dev
```
App runs at: `http://localhost:8080` (or similar)

---

## 📄 License
MIT License
