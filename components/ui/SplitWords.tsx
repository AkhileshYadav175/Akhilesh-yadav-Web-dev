import React from "react";

interface SplitWordsProps {
  children: string;
  className?: string;
  soft?: boolean;
}

export default function SplitWords({ children, className, soft }: SplitWordsProps) {
  const words = children.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="w">
            <span className={`wi ${soft ? "soft" : ""}`.trim()}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </span>
  );
}

