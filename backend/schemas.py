from pydantic import BaseModel

class ConversionRequest(BaseModel):
    equation: str
    image_data: str | None = None # Base64 encoded image

class ConversionResponse(BaseModel):
    sympy: str
    numpy: str
    explanation: str
