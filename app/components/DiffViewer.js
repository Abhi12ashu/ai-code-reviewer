// app/components/DiffViewer.js
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Eye, ChevronDown, ChevronRight } from "lucide-react";

export default function DiffViewer({ originalCode, fixedCode }) {
  const [unifiedView, setUnifiedView] = useState(true);
  const [expanded, setExpanded] = useState(true);

  const renderSideBySide = () => {
    const originalLines = originalCode.split("\n");
    const fixedLines = fixedCode.split("\n");
    const maxLines = Math.max(originalLines.length, fixedLines.length);

    return (
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="border-r">
          <div className="bg-red-50 dark:bg-red-900/20 p-2 font-mono text-xs border-b">
            Original Code
          </div>
          <div className="font-mono max-h-96 overflow-y-auto">
            {originalLines.map((line, index) => (
              <div
                key={`original-${index}`}
                className={`flex border-b ${
                  line !== fixedLines[index]
                    ? "bg-red-100 dark:bg-red-900/30"
                    : "even:bg-gray-50 dark:even:bg-gray-900/20"
                }`}
              >
                <div className="w-12 text-right pr-2 text-gray-500 border-r select-none py-1">
                  {index + 1}
                </div>
                <div className="flex-1 pl-2 whitespace-pre py-1">
                  {line || "\u00A0"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-green-50 dark:bg-green-900/20 p-2 font-mono text-xs border-b">
            Fixed Code
          </div>
          <div className="font-mono max-h-96 overflow-y-auto">
            {fixedLines.map((line, index) => (
              <div
                key={`fixed-${index}`}
                className={`flex border-b ${
                  line !== originalLines[index]
                    ? "bg-green-100 dark:bg-green-900/30"
                    : "even:bg-gray-50 dark:even:bg-gray-900/20"
                }`}
              >
                <div className="w-12 text-right pr-2 text-gray-500 border-r select-none py-1">
                  {index + 1}
                </div>
                <div className="flex-1 pl-2 whitespace-pre py-1">
                  {line || "\u00A0"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderUnified = () => {
    const originalLines = originalCode.split("\n");
    const fixedLines = fixedCode.split("\n");
    const maxLines = Math.max(originalLines.length, fixedLines.length);

    return (
      <div className="text-sm">
        <div className="bg-gray-50 dark:bg-gray-900/20 p-2 font-mono text-xs border-b">
          Changes (Green = Added, Red = Removed)
        </div>
        <div className="font-mono max-h-96 overflow-y-auto">
          {Array.from({ length: maxLines }).map((_, index) => {
            const originalLine = originalLines[index] || "";
            const fixedLine = fixedLines[index] || "";
            const hasChange = originalLine !== fixedLine;

            return (
              <div key={index} className="flex">
                {/* Line Numbers */}
                <div className="w-12 text-right pr-2 text-gray-500 border-r select-none py-1">
                  {index + 1}
                </div>

                {/* Change Indicator */}
                <div className="w-4 text-center border-r py-1">
                  {hasChange
                    ? originalLine && fixedLine
                      ? "~"
                      : originalLine
                      ? "-"
                      : "+"
                    : " "}
                </div>

                {/* Content */}
                <div
                  className={`flex-1 pl-2 whitespace-pre py-1 ${
                    hasChange
                      ? originalLine && fixedLine
                        ? "bg-yellow-100 dark:bg-yellow-900/30"
                        : originalLine
                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                        : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                      : "even:bg-gray-50 dark:even:bg-gray-900/20"
                  }`}
                >
                  {hasChange ? (
                    <>
                      {originalLine && (
                        <span className="text-red-600 dark:text-red-400 line-through">
                          {originalLine}
                        </span>
                      )}
                      {originalLine && fixedLine && <br />}
                      {fixedLine && (
                        <span className="text-green-600 dark:text-green-400">
                          {fixedLine}
                        </span>
                      )}
                    </>
                  ) : (
                    originalLine || "\u00A0"
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Code Changes Preview
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="ml-2"
            >
              {expanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUnifiedView(!unifiedView)}
          >
            {unifiedView ? "Side-by-Side" : "Unified View"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {expanded && (
          <div className="border rounded-lg overflow-hidden">
            {unifiedView ? renderUnified() : renderSideBySide()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
