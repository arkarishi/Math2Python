import os
# Inject dummy key for testing import
os.environ["OPENROUTER_API_KEY"] = "dummy-key-for-testing"

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "Math2Python Optimizer Agent"}

if __name__ == "__main__":
    try:
        test_read_root()
        print("✅ Backend Root Endpoint Test Passed")
    except Exception as e:
        print(f"❌ Backend Root Endpoint Test Failed: {e}")
