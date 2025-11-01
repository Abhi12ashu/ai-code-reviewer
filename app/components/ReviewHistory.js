// app/components/ReviewIssues.js
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  AlertCircle,
  CheckCircle,
  Info,
  CheckCheck,
  MessageCircle,
} from "lucide-react";

export default function ReviewIssues({ issues, onApplyFix, currentCode }) {
  const [appliedFixes, setAppliedFixes] = useState(new Set());

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "error":
        return "text-red-700 bg-red-50 border-red-200 dark:text-red-300 dark:bg-red-900/20 dark:border-red-800";
      case "warning":
        return "text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-300 dark:bg-yellow-900/20 dark:border-yellow-800";
      default:
        return "text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-900/20 dark:border-blue-800";
    }
  };

  const handleApplyFix = (issue, index) => {
    setAppliedFixes((prev) => new Set(prev).add(index));
  };

  const handleApplyAllFixes = () => {
    const allIndices = issues.map((_, index) => index);
    setAppliedFixes(new Set(allIndices));
  };

  if (!issues || issues.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            No Issues Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Great job! Your code looks clean and follows best practices.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Code Issues ({issues.length})
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleApplyAllFixes}
            className="flex items-center gap-2"
          >
            <CheckCheck className="w-4 h-4" />
            Apply All Fixes
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {issues.map((issue, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg transition-all duration-200 ${
              appliedFixes.has(index)
                ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                : getSeverityColor(issue.severity)
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getSeverityIcon(issue.severity)}
                <Badge variant="outline" className="font-mono">
                  Line {issue.line}
                </Badge>
                <span
                  className={`text-sm font-medium capitalize ${
                    issue.severity === "error"
                      ? "text-red-700 dark:text-red-300"
                      : issue.severity === "warning"
                      ? "text-yellow-700 dark:text-yellow-300"
                      : "text-blue-700 dark:text-blue-300"
                  }`}
                >
                  {issue.severity}
                </span>
              </div>
              {!appliedFixes.has(index) && (
                <Button
                  size="sm"
                  onClick={() => handleApplyFix(issue, index)}
                  className="flex items-center gap-1"
                >
                  <CheckCircle className="w-3 h-3" />
                  Apply Fix
                </Button>
              )}
              {appliedFixes.has(index) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Applied
                </Badge>
              )}
            </div>

            <p className="text-sm mb-3">{issue.message}</p>

            <div className="bg-black/5 dark:bg-white/5 p-3 rounded border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground">
                  Suggested fix:
                </span>
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <MessageCircle className="w-3 h-3" />
                </Button>
              </div>
              <code className="text-sm font-mono bg-transparent">
                {issue.fix}
              </code>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
