"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

const CURSOR_SIZE = 36; // Tamanho menor para o cursor de futebol

const FootballCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  // Animate cursor trailing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.18;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x - CURSOR_SIZE / 2}px, ${pos.current.y - CURSOR_SIZE / 2}px, 0)`;
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Hide the default cursor
  useEffect(() => {
    const body = document.body;
    const prevCursor = body.style.cursor;
    body.style.cursor = "none";
    return () => {
      body.style.cursor = prevCursor;
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        willChange: "transform",
        transition: "filter 0.2s",
        filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.22))",
        mixBlendMode: "multiply",
      }}
    >
      <Image
        src="/cursor.png"
        alt="Football Cursor"
        width={CURSOR_SIZE}
        height={CURSOR_SIZE}
        className="rounded-full animate-spin-slow select-none"
        draggable={false}
        priority
        style={{
          animationDuration: "3.5s",
          userSelect: "none",
        }}
      />
      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3.5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FootballCursor; 