"use client";

import { motion, AnimatePresence, Variants, Transition } from "framer-motion";

export const EFFECTS = {
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  slideUp: { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  slideDown: { hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  slideLeft: { hidden: { x: 20, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  slideRight: { hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  scale: {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
  rotate: {
    hidden: { rotate: -10, opacity: 0 },
    visible: { rotate: 0, opacity: 1 },
  },
} as const;

type EffectKey = keyof typeof EFFECTS;

const combineEffects = (effects: EffectKey[]): Variants => {
  const hidden = Object.assign(
    {},
    ...effects.map((e) => EFFECTS[e]?.hidden || {}),
  );
  const visible = Object.assign(
    {},
    ...effects.map((e) => EFFECTS[e]?.visible || {}),
  );
  return { hidden, visible };
};

type MotionProps = {
  isVisible: boolean;
  effects?: EffectKey[];
  transition?: Transition;
  className?: string;
  children: React.ReactNode;
};

export function Motion({
  isVisible,
  effects = ["fade"],
  transition = { duration: 0.3 },
  children,
  className,
}: MotionProps) {
  const variants = combineEffects(effects);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={transition}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
