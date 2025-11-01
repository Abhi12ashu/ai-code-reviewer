// app/components/FileDropZone.js
"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "./ui/button";

export default function FileDropZone({ onFileDrop }) {
  const [fileInfo, setFileInfo] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          setFileInfo({
            name: file.name,
            size: file.size,
            type: file.type,
          });
          onFileDrop(content);
        };
        reader.readAsText(file);
      }
    },
    [onFileDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/*": [
        ".js",
        ".jsx",
        ".ts",
        ".tsx",
        ".py",
        ".java",
        ".cpp",
        ".c",
        ".html",
        ".css",
        ".json",
        ".md",
        ".txt",
      ],
      "application/json": [".json"],
      "application/javascript": [".js", ".jsx"],
      "text/x-python": [".py"],
      "text/x-java": [".java"],
      "text/x-c++": [".cpp", ".c"],
    },
    multiple: false,
  });

  const clearFile = () => {
    setFileInfo(null);
    onFileDrop("");
  };

  return (
    <div className="space-y-4 mb-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium mb-2">
          {isDragActive
            ? "Drop your code file here"
            : "Drag & drop your code file here"}
        </p>
        <p className="text-sm text-muted-foreground">
          Supports: .js, .jsx, .ts, .tsx, .py, .java, .cpp, .c, .html, .css,
          .json
        </p>
        <Button variant="outline" className="mt-4">
          Or click to select file
        </Button>
      </div>

      {fileInfo && (
        <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-medium text-green-900 dark:text-green-100">
                {fileInfo.name}
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                {(fileInfo.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFile}
            className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
