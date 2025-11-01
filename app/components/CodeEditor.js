import { useState } from "react";

export default function CodeEditor({ value, onChange }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`border-2 rounded-lg transition-all duration-200 ${
        isFocused
          ? `border-blue-500 ring-2 ring-blue-500/20`
          : "border-gray-300 dark:border-gray-600"
      }`}
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Paste your code here or drag & drop a file...
            
            Example:
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}"
        className="w-full h-64 p-4 font-mono text-sm bg-background resize-none focus:outline-none rounded-lg"
      />
    </div>
  );
}
