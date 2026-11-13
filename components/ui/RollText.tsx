import React from "react";

interface RollTextProps {
  text: string;
  className?: string;
}

export default function RollText({ text, className }: RollTextProps) {
  return (
    <span className={`roll ${className || ""}`.trim()}>
      <span>{text}</span>
      <span>{text}</span>
    </span>
  );
}

