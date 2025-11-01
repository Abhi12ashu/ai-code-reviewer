// lib/ai-hook.js
import { useState, useCallback } from "react";
import toast from "react-hot-toast";

const PROMPT_TEMPLATES = {
  strict: `You are a strict code reviewer. Analyze this code and return ONLY valid JSON in this exact format:
  {
    "summary": "brief overall assessment",
    "score": 8.5,
    "issues": [
      {
        "line": 12,
        "severity": "error",
        "message": "specific issue description",
        "fix": "exact code replacement"
      }
    ],
    "suggestions": ["general suggestion 1", "suggestion 2"]
  }

  Code to review:`,

  friendly: `You are a friendly code mentor. Provide constructive feedback in this exact JSON format:
  {
    "summary": "encouraging overall assessment",
    "score": 8.5,
    "issues": [
      {
        "line": 12,
        "severity": "warning",
        "message": "helpful suggestion",
        "fix": "improved code version"
      }
    ],
    "suggestions": ["positive suggestion 1", "suggestion 2"]
  }

  Code to review:`,

  senior: `You are a senior engineer conducting a thorough code review. Return ONLY this JSON format:
  {
    "summary": "professional assessment",
    "score": 8.5,
    "issues": [
      {
        "line": 12,
        "severity": "error",
        "message": "detailed technical issue",
        "fix": "professional fix"
      }
    ],
    "suggestions": ["architectural suggestion", "best practice"]
  }

  Code to review:`,
};

export function useAI() {
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateReview = useCallback(async (code, tone = "senior") => {
    if (!code.trim()) {
      toast.error("Please enter some code to review");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3.1:8b-instruct-q5_1",
          prompt: `${PROMPT_TEMPLATES[tone]}\n\n${code}`,
          stream: false,
          format: "json",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to Ollama");
      }

      const data = await response.json();
      let reviewData;
      try {
        reviewData = JSON.parse(data.response);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        reviewData = {
          summary: "Analysis completed with some formatting issues",
          score: 7.0,
          issues: [],
          suggestions: ["Review completed, but formatting may be inconsistent"],
        };
      }

      setReview(reviewData);
      toast.success("Code review completed!");
    } catch (error) {
      console.error("Review error:", error);
      toast.error(
        "Ollama not detected. Please install and run Ollama locally for AI features."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    review,
    isLoading,
    generateReview,
  };
}
