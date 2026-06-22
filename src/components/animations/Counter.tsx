"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, animate, useReducedMotion } from "motion/react";

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  format?: boolean;
  className?: string;
}

export function Counter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  format = true,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReduced = useReducedMotion();
  const [value, setValue] = useState(prefersReduced ? target : 0);

  useEffect(() => {
    if (!isInView || prefersReduced) return;

    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });

    return controls.stop;
  }, [isInView, target, duration, prefersReduced]);

  const display = format ? value.toLocaleString() : String(value);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
