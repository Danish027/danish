"use client";

import { useEffect, useRef, useCallback } from "react";
import { MotionValue, motion } from "motion/react";
import { useTransform } from "framer-motion";

type ArtPlumProps = {
  isLoading: boolean;
  scrollOpacity: MotionValue<number>;
};

const r180 = Math.PI;
const r90 = Math.PI / 2;
const r15 = Math.PI / 12;
const COLOR = "#ffffff15";
const MIN_BRANCH = 30;
const LEN = 6;

function polar2cart(
  x: number,
  y: number,
  r: number,
  theta: number,
): [number, number] {
  return [x + r * Math.cos(theta), y + r * Math.sin(theta)];
}

function initCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  dpiOverride?: number,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const dpr = window.devicePixelRatio || 1;
  const bsr =
    // @ts-expect-error vendor
    ctx.webkitBackingStorePixelRatio ||
    // @ts-expect-error vendor
    ctx.mozBackingStorePixelRatio ||
    // @ts-expect-error vendor
    ctx.msBackingStorePixelRatio ||
    // @ts-expect-error vendor
    ctx.oBackingStorePixelRatio ||
    // @ts-expect-error vendor
    ctx.backingStorePixelRatio ||
    1;

  const dpi = dpiOverride || dpr / bsr;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = dpi * width;
  canvas.height = dpi * height;
  ctx.scale(dpi, dpi);

  return { ctx, dpi };
}

function ArtPlum({ isLoading, scrollOpacity }: ArtPlumProps) {
  const opacity = useTransform(scrollOpacity, [0, 1], [0, 1]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stepsRef = useRef<(() => void)[]>([]);
  const prevStepsRef = useRef<(() => void)[]>([]);
  const rafIdRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const stoppedRef = useRef(true);

  const startAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const result = initCanvas(canvas, width, height);
    if (!result) return;
    const { ctx } = result;

    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = COLOR;

    const { random } = Math;

    const step = (
      x: number,
      y: number,
      rad: number,
      counter = { value: 0 },
    ) => {
      const length = random() * LEN;
      counter.value += 1;

      const [nx, ny] = polar2cart(x, y, length, rad);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      const rad1 = rad + random() * r15;
      const rad2 = rad - random() * r15;

      if (nx < -100 || nx > width + 100 || ny < -100 || ny > height + 100)
        return;

      const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5;

      if (random() < rate)
        stepsRef.current.push(() => step(nx, ny, rad1, counter));
      if (random() < rate)
        stepsRef.current.push(() => step(nx, ny, rad2, counter));
    };

    const interval = 1000 / 40;
    lastTimeRef.current = performance.now();
    stoppedRef.current = false;

    const randomMiddle = () => random() * 0.6 + 0.2;

    prevStepsRef.current = [];
    stepsRef.current = [
      () => step(randomMiddle() * width, -5, r90),
      () => step(randomMiddle() * width, height + 5, -r90),
      () => step(-5, randomMiddle() * height, 0),
      () => step(width + 5, randomMiddle() * height, r180),
    ];

    if (width < 500) {
      stepsRef.current = stepsRef.current.slice(0, 2);
    }

    const frame = () => {
      if (stoppedRef.current) return;

      if (performance.now() - lastTimeRef.current < interval) {
        rafIdRef.current = requestAnimationFrame(frame);
        return;
      }

      prevStepsRef.current = stepsRef.current;
      stepsRef.current = [];
      lastTimeRef.current = performance.now();

      if (!prevStepsRef.current.length) {
        stoppedRef.current = true;
        return;
      }

      prevStepsRef.current.forEach((fn) => {
        if (random() < 0.5) stepsRef.current.push(fn);
        else fn();
      });

      rafIdRef.current = requestAnimationFrame(frame);
    };

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // Delay so hero text animates in first, then branches grow behind
    const timeout = setTimeout(startAnimation, 1000);

    return () => {
      clearTimeout(timeout);
      stoppedRef.current = true;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isLoading, startAnimation]);

  return (
    <motion.div style={{ opacity }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: "radial-gradient(circle, transparent, black)",
          WebkitMaskImage: "radial-gradient(circle, transparent, black)",
        }}
      >
        <canvas ref={canvasRef} width="400" height="400" />
      </div>
    </motion.div>
  );
}

export { ArtPlum };
