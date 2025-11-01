// app/components/CodeReviewer.js
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAI } from "@/lib/ai-hook";
import CodeEditor from "./CodeEditor";
import DiffViewer from "./DiffViewer";
import ReviewIssues from "./ReviewIssues";
import FileDropZone from "./FileDropZone";
import ReviewHistory from "./ReviewHistory";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Wand2, RefreshCw, Download, Shield } from "lucide-react";

export default function CodeReviewer() {
  const [code, setCode] = useState("");
  const [reviewTone, setReviewTone] = useState("senior");
  const { review, isLoading, generateReview, applyFix } = useAI();

  const handleCodeSubmit = useCallback(() => {
    generateReview(code, reviewTone);
  }, [code, reviewTone, generateReview]);

  const handleFileDrop = useCallback((fileContent) => {
    setCode(fileContent);
  }, []);

  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-500";
    if (score >= 6) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Code Reviewer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional code analysis powered by local AI. Get instant
            feedback, automated fixes, and detailed reviews.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                Code Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileDropZone onFileDrop={handleFileDrop} />
              <CodeEditor value={code} onChange={setCode} />

              <div className="flex flex-wrap gap-3 mt-4">
                <Button
                  onClick={handleCodeSubmit}
                  disabled={isLoading || !code.trim()}
                  className="flex items-center gap-2"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Shield className="w-4 h-4" />
                  )}
                  {isLoading ? "Analyzing..." : "Review Code"}
                </Button>

                <select
                  value={reviewTone}
                  onChange={(e) => setReviewTone(e.target.value)}
                  className="px-3 py-2 border rounded-lg bg-background"
                >
                  <option value="strict">Strict Review</option>
                  <option value="friendly">Friendly Feedback</option>
                  <option value="senior">Senior Engineer</option>
                </select>

                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          <AnimatePresence>
            {review && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Review Summary
                      <Badge
                        className={`text-lg ${getScoreColor(
                          review.score
                        )} bg-transparent border-0`}
                      >
                        {review.score}/10
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.summary}</p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {review.suggestions?.map((suggestion, index) => (
                        <Badge key={index} variant="secondary">
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <ReviewIssues
                  issues={review.issues}
                  onApplyFix={applyFix}
                  currentCode={code}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-6">
            <AnimatePresence>
              {review && review.issues.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <DiffViewer
                    originalCode={code}
                    fixedCode={review.issues.reduce(
                      (acc, issue) => applyFix(acc, issue),
                      code
                    )}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <ReviewHistory />
          </div>
        </div>
      </div>
    </div>
  );
}
