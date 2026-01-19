from dotenv import load_dotenv
# Load env vars before importing anything that uses them
load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import ConversionRequest, ConversionResponse
from agent import process_equation
import os

app = FastAPI(title="Math2Python API")

# CORS middleware configuration
origins = [
    "http://localhost:3000",
    "https://math2python.vercel.app", # Placeholder for deployment
    "*" # Allow all for MVP ease, restrict in prod
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "service": "Math2Python Optimizer Agent"}

@app.post("/convert", response_model=ConversionResponse)
def convert_equation(request: ConversionRequest):
    if not request.equation.strip():
        raise HTTPException(status_code=400, detail="Equation cannot be empty")
    
    response = process_equation(request.equation)
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
