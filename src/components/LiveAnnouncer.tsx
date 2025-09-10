"use client";
import { useEffect, useRef } from "react";

export function LiveAnnouncer({ message }: { message: string | null }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && message) {
      ref.current.textContent = message;
    }
  }, [message]);
  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only" ref={ref} />
  );
}



