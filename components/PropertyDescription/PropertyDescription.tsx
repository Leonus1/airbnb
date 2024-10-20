"use client";

import { useState, useEffect, useRef } from "react";

export default function PropertyDescription({ description }: { description: string }) {
  const [isShowMore, setIsShowMore] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
      const fourLineHeight = lineHeight * 4;
      if (textRef.current.scrollHeight > fourLineHeight) {
        setShowButton(true);
      }
    }
  }, [description]);

  return (
    <div className="mt-2 mb-6 whitespace-pre-wrap">
      <p ref={textRef} className={`${!isShowMore && "line-clamp-4"}`}>
        {description}
      </p>
      {showButton && ( // Conditionally render button based on content height
        <button
          className="hover:underline font-semibold cursor-pointer"
          onClick={() => setIsShowMore((prev: boolean) => !prev)}
        >
          {!isShowMore ? "Show more" : "Show less"}
        </button>
      )}
    </div>
  );
}
