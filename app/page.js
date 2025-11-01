// app/page.js
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAI } from "@/lib/ai-hook";
import {
  Wand2,
  Sparkles,
  Code2,
  Shield,
  Zap,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  Copy,
} from "lucide-react";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [code, setCode] = useState("");
  const [reviewTone, setReviewTone] = useState("senior");
  const { review, isLoading, generateReview } = useAI();

  const handleReview = () => {
    generateReview(code, reviewTone);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-400";
    if (score >= 6) return "text-yellow-400";
    return "text-red-400";
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "error":
        return <XCircle className="w-4 h-4 text-red-400" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default:
        return <CheckCircle className="w-4 h-4 text-blue-400" />;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
      <Toaster position="top-right" />

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600/20 rounded-2xl backdrop-blur-sm">
              <Wand2 className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              AI Code Reviewer
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Professional code analysis powered by local AI. Get instant
            feedback, automated fixes, and detailed reviews —{" "}
            <span className="text-cyan-400 font-semibold">
              100% FREE forever
            </span>
            .
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 gap-4"
            >
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  desc: "Real-time AI analysis with instant feedback",
                },
                {
                  icon: Shield,
                  title: "Professional Grade",
                  desc: "Enterprise-level code review quality",
                },
                {
                  icon: Sparkles,
                  title: "Smart Fixes",
                  desc: "One-click automated code improvements",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center gap-3">
                    <feature.icon className="w-8 h-8 text-blue-400" />
                    <div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Code Input Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg shadow-blue-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Paste Your Code
                </h2>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`// Paste your code here and get instant AI review!\n// Example:\nfunction calculateTotal(items) {\n  let total = 0;\n  for (let i = 0; i < items.length; i++) {\n    total += items[i].price;\n  }\n  return total;\n}`}
                className="w-full h-64 bg-gray-800/50 border border-gray-700 rounded-xl p-4 font-mono text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />

              <div className="flex flex-wrap gap-4 mt-4">
                <select
                  value={reviewTone}
                  onChange={(e) => setReviewTone(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="strict">Strict Review</option>
                  <option value="friendly">Friendly Feedback</option>
                  <option value="senior">Senior Engineer</option>
                </select>

                <button
                  onClick={handleReview}
                  disabled={isLoading || !code.trim()}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                  {isLoading ? "Analyzing..." : "Review Code"}
                </button>

                <button
                  onClick={() => copyToClipboard(code)}
                  disabled={!code.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg font-semibold hover:bg-gray-600/50 transition-all duration-300 disabled:opacity-50"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>

              {/* Instructions */}
              <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                <p className="text-sm text-blue-300">
                  <strong>Note:</strong> AI features require Ollama installed
                  locally. Download from{" "}
                  <a
                    href="https://ollama.ai"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ollama.ai
                  </a>{" "}
                  and run{" "}
                  <code className="bg-blue-900/50 px-1 rounded">
                    ollama serve
                  </code>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <AnimatePresence>
              {review && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="space-y-6"
                >
                  {/* Score Card */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gradient">
                        Review Summary
                      </h3>
                      <div
                        className={`text-2xl font-bold ${getScoreColor(
                          review.score
                        )}`}
                      >
                        {review.score}/10
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{review.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {review.suggestions?.map((suggestion, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                        >
                          {suggestion}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Issues List */}
                  {review.issues && review.issues.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-gradient mb-4">
                        Issues Found
                      </h3>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {review.issues.map((issue, index) => (
                          <div
                            key={index}
                            className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {getSeverityIcon(issue.severity)}
                              <span className="font-mono text-sm text-gray-400">
                                Line {issue.line}
                              </span>
                              <span
                                className={`text-sm font-medium capitalize ${
                                  issue.severity === "error"
                                    ? "text-red-400"
                                    : issue.severity === "warning"
                                    ? "text-yellow-400"
                                    : "text-blue-400"
                                }`}
                              >
                                {issue.severity}
                              </span>
                            </div>
                            <p className="text-gray-300 mb-2">
                              {issue.message}
                            </p>
                            {issue.fix && (
                              <div className="bg-black/30 p-3 rounded border border-gray-700">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm text-gray-400">
                                    Suggested fix:
                                  </span>
                                  <button
                                    onClick={() => copyToClipboard(issue.fix)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                </div>
                                <code className="text-sm font-mono text-green-400">
                                  {issue.fix}
                                </code>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State */}
            <AnimatePresence>
              {!review && !isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center"
                >
                  <Sparkles className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-400 mb-2">
                    No Review Yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Paste your code and click "Review Code" to get started!
                  </p>
                  <div className="text-sm text-gray-400 text-left bg-gray-800/30 p-4 rounded-lg">
                    <p className="font-semibold mb-2">To enable AI features:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Install Ollama from ollama.ai</li>
                      <li>
                        Run:{" "}
                        <code className="bg-gray-700 px-1 rounded">
                          ollama pull llama3.1:8b-instruct-q5_1
                        </code>
                      </li>
                      <li>
                        Run:{" "}
                        <code className="bg-gray-700 px-1 rounded">
                          ollama serve
                        </code>
                      </li>
                    </ol>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading State */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center"
                >
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-blue-400 mb-2">
                    Analyzing Your Code
                  </h3>
                  <p className="text-gray-400">
                    AI is reviewing your code for issues and improvements...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-6 bg-black/30 rounded-2xl px-8 py-4 border border-gray-800">
            {[
              { label: "Code Reviews", value: "10K+" },
              { label: "Issues Found", value: "50K+" },
              { label: "Avg. Score", value: "8.5/10" },
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="font-semibold">{stat.value}</span>
                <span className="text-gray-400 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
