import unittest
from unittest.mock import patch, MagicMock
import os

# Inject dummy key so agent imports
os.environ["OPENROUTER_API_KEY"] = "dummy"
from agent import process_equation
from schemas import ConversionResponse

class TestAgentLogic(unittest.TestCase):

    @patch("agent.client.chat.completions.create")
    def test_process_valid_equation(self, mock_create):
        # Mock the OpenRouter API response
        mock_response = MagicMock()
        mock_response.choices[0].message.content = """
        {
            "sympy": "x**2 + 2*x",
            "numpy": "def objective(x): return x**2 + 2*x",
            "explanation": "Simple quadratic."
        }
        """
        mock_create.return_value = mock_response

        # Run the function
        result = process_equation("x^2 + 2x")

        # Verify assertions
        self.assertIsInstance(result, ConversionResponse)
        self.assertEqual(result.sympy, "x**2 + 2*x")
        self.assertEqual(result.numpy, "def objective(x): return x**2 + 2*x")
        self.assertEqual(result.explanation, "Simple quadratic.")
        print("\n✅ Logic Test: Valid JSON parsing passed.")

    @patch("agent.client.chat.completions.create")
    def test_process_error_handling(self, mock_create):
        # Mock an exception from the API
        mock_create.side_effect = Exception("API Error")

        # Run the function
        result = process_equation("bad input")

        # Should return fallback response, not crash
        self.assertIn("# Error", result.sympy)
        self.assertIn("API Error", result.explanation)
        print("✅ Logic Test: Error handling passed.")

if __name__ == "__main__":
    unittest.main()
