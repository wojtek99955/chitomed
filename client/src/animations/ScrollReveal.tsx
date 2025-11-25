// src/components/animations/ScrollReveal.tsx
import { motion, useInView, type Easing, } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
  children: any;
  /** Przesunięcie startowe w pionie (domyślnie 100px od dołu) */
  fromY?: number;
  /** Czy animacja ma się odpalić tylko raz */
  once?: boolean;
  /** Kiedy zacząć animację (np. "-150px" = 150px przed widokiem) */
  margin?: any;
  /** Opóźnienie w sekundach */
  delay?: number;
  /** Czas trwania animacji */
  duration?: number;
  /** Easing */
  ease?: Easing | Easing[]; // teraz poprawny typ!  /** Dodatkowe klasy lub style */
  className?: string;
  /** Warianty (np. "left", "right", "scale") – możesz rozbudować */
  variant?: "bottom" | "top" | "left" | "right" | "scale" | "fade";
  style?: any;
}

const variants = {
  bottom: { y: 100, opacity: 0 },
  top: { y: -100, opacity: 0 },
  left: { x: -100, opacity: 0 },
  right: { x: 100, opacity: 0 },
  scale: { scale: 0.8, opacity: 0 },
  fade: { opacity: 0 },
};

export const ScrollReveal = ({
  children,
  fromY = 100,
  once = true,
  margin = "-100px",
  delay = 0,
  duration = 0.5,
  ease = "easeOut",
  className = "",
  variant = "bottom",
  style
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin });

  const initial =
    variant === "bottom" ? { y: fromY, opacity: 0 } : variants[variant];

  return (
    <motion.div
    style={style}
      ref={ref}
      initial={initial}
      animate={
        isInView ? { ...initial, y: 0, x: 0, scale: 1, opacity: 1 } : initial
      }
      transition={{
        duration,
        ease,
        delay,
      }}
      className={className}>
      {children}
    </motion.div>
  );
};
