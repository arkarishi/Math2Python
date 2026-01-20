from pydantic import BaseModel

class ConversionRequest(BaseModel):
    equation: str
    image_data: str | None = None # Base64 encoded image
    framework: str = "numpy" # "numpy" or "pytorch"

class ConversionResponse(BaseModel):
    sympy: str
    numpy: str
    explanation: str
    complexity: str = "Complexity analysis unavailable"
