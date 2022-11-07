import React from "react";
import { useState } from "react";

function ArrowDown() {
  const [isActive, setIsActive] = useState(true);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
      style={{
        color: isActive ? "#869E35" : "currentColor",
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
      />
    </svg>
  );
}

export default ArrowDown;
