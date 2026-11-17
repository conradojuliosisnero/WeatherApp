// Icono de Animate UI (https://animate-ui.com), (c) 2025 Elliot Sutton.
// Licencia MIT + Commons Clause: uso dentro de esta app, no se redistribuye por separado.
"use client";
import { motion } from "motion/react";
import {
  getVariants,
  useAnimateIconContext,
  IconWrapper
} from "@animate-ui/react/icons";
const animations = {
  default: {
    wave1: {
      initial: { scaleY: 1 },
      animate: {
        scaleY: [1, 1.5, 0.8, 1],
        transition: { duration: 0.6, ease: "easeInOut" }
      }
    },
    wave2: {
      initial: { scaleY: 1 },
      animate: {
        scaleY: [1, 1.5, 0.8, 1],
        transition: { duration: 0.6, ease: "easeInOut", delay: 0.1 }
      }
    },
    wave3: {
      initial: { scaleY: 1 },
      animate: {
        scaleY: [1, 1.5, 0.8, 1],
        transition: { duration: 0.6, ease: "easeInOut", delay: 0.2 }
      }
    }
  }
};
function IconComponent({ size, ...props }) {
  const { controls } = useAnimateIconContext();
  const variants = getVariants(animations);
  return <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
      <motion.path
    d="M2 5q2.5 2 5 0t5 0 5 0 5 0"
    variants={variants.wave1}
    initial="initial"
    animate={controls}
  />
      <motion.path
    d="M2 12q2.5 2 5 0t5 0 5 0 5 0"
    variants={variants.wave2}
    initial="initial"
    animate={controls}
  />
      <motion.path
    d="M2 19q2.5 2 5 0t5 0 5 0 5 0"
    variants={variants.wave3}
    initial="initial"
    animate={controls}
  />
    </motion.svg>;
}
function Waves(props) {
  return <IconWrapper icon={IconComponent} {...props} />;
}
export {
  Waves,
  Waves as WavesIcon,
  animations
};
