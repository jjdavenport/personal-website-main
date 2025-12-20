"use client";

import { useCallback, useRef, useState } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  color: string;
};

export function useVanish<T extends HTMLInputElement | HTMLTextAreaElement>(
  value: string,
  onClear: () => void,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<T>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [animating, setAnimating] = useState(false);

  /**
   * Draw text → extract colored pixels
   */
  const draw = useCallback(() => {
    if (!inputRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;

    ctx.clearRect(0, 0, 800, 800);

    const styles = getComputedStyle(inputRef.current);
    const fontSize = parseFloat(styles.fontSize);

    ctx.font = `${fontSize * 2}px ${styles.fontFamily}`;
    ctx.fillStyle = "#fff";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const data = imageData.data;

    const particles: Particle[] = [];

    for (let y = 0; y < 800; y++) {
      for (let x = 0; x < 800; x++) {
        const i = (y * 800 + x) * 4;
        if (data[i] !== 0 || data[i + 1] !== 0 || data[i + 2] !== 0) {
          particles.push({
            x,
            y,
            r: 1,
            color: `rgba(${data[i]}, ${data[i + 1]}, ${data[i + 2]}, ${data[i + 3]})`,
          });
        }
      }
    }

    particlesRef.current = particles;
  }, [value]);

  /**
   * Animate pixels left → right vanish
   */
  const animate = (startX: number) => {
    const frame = (pos: number) => {
      requestAnimationFrame(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        const next: Particle[] = [];

        for (const p of particlesRef.current) {
          if (p.x < pos) {
            next.push(p);
            continue;
          }

          if (p.r <= 0) continue;

          p.x += Math.random() > 0.5 ? 1 : -1;
          p.y += Math.random() > 0.5 ? 1 : -1;
          p.r -= 0.05 * Math.random();

          next.push(p);
        }

        particlesRef.current = next;

        ctx.clearRect(pos, 0, 800, 800);

        for (const p of particlesRef.current) {
          if (p.x > pos) {
            ctx.beginPath();
            ctx.rect(p.x, p.y, p.r, p.r);
            ctx.fillStyle = p.color;
            ctx.strokeStyle = p.color;
            ctx.stroke();
          }
        }

        if (particlesRef.current.length > 0) {
          frame(pos - 8);
        } else {
          setAnimating(false);
          onClear();
        }
      });
    };

    frame(startX);
  };

  /**
   * Public API
   */
  const vanish = () => {
    if (!value || animating) return;

    setAnimating(true);
    draw();

    const maxX = particlesRef.current.reduce(
      (max, p) => (p.x > max ? p.x : max),
      0,
    );

    animate(maxX);
  };

  return {
    canvasRef,
    inputRef,
    animating,
    vanish,
  };
}
