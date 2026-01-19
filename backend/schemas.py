from pydantic import BaseModel

class ConversionRequest(BaseModel):
    equation: str

class ConversionResponse(BaseModel):
    sympy: str
    numpy: str
    explanation: str
