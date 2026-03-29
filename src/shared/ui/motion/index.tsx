"use client";

import { motion, HTMLMotionProps } from "framer-motion";

export function Motion(props: HTMLMotionProps<"div">) {
  return <motion.div {...props} />
}
