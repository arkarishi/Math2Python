# Math2Python Optimization Agent 🧮 ➡️ 🐍

A full-stack GenAI agent that converts research-grade **LaTeX optimization equations** into executable **Python code** (SymPy & NumPy).

## 🚀 Live Demo
**Frontend URL**: [Insert your Vercel Link Here]
**Backend API**: [Insert your Antigravity Link Here]

## 🛠️ Tech Stack
- **Frontend**: Next.js 14, standard CSS (Glassmorphism UI).
- **Backend**: FastAPI, Pydantic AI.
- **AI Model**: Google Gemma 2 (9B) via OpenRouter (Free Tier).
- **Validation**: SymPy (Symbolic Math Library).

## ✨ Features
1.  **LaTeX Parsing**: Handles complex math like `\min_{x} \|Ax - b\|_2^2`.
2.  **Dual Code Generation**:
    - **SymPy**: For symbolic analysis.
    - **NumPy**: For numerical implementation.
3.  **Smart Fallback (Demo Mode)**: Includes a robust fallback mechanism that returns pre-computed responses if the free AI API is rate-limited (ensuring reliability during demos).
4.  **Copy-Paste Ready**: One-click copy for generated code.

## 🏃‍♂️ How to Run Locally

### 1. Backend
```bash
cd backend
# Create .env file with: OPENROUTER_API_KEY=sk-or-v1-...
pip install -r requirements.txt
uvicorn main:app --reload
```
Server runs at: `http://127.0.0.1:8000`

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs at: `http://localhost:3000`

## 🧪 Testing
Try this equation:
```latex
\min_{x} \frac{1}{2} \|Ax - b\|_2^2 + \lambda \|x\|_1
```

## 📄 License
MIT License
