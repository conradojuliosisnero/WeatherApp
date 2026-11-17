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
    path1: {},
    path2: {
      initial: {
        opacity: 1,
        scale: 1
      },
      animate: {
        opacity: [1, 0.5, 1, 0.5, 1],
        scale: [1, 0.9, 1, 0.9, 1],
        transition: {
          duration: 1.8,
          ease: "easeInOut"
        }
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
    initial="initial"
    animate={controls}
    {...props}
  >
      <motion.path
    d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"
    variants={variants.path1}
    initial="initial"
    animate={controls}
  />
      <motion.path
    d="m13 12-3 5h4l-3 5"
    variants={variants.path2}
    initial="initial"
    animate={controls}
  />
    </motion.svg>;
}
function CloudLightning(props) {
  return <IconWrapper icon={IconComponent} {...props} />;
}
export {
  CloudLightning,
  CloudLightning as CloudLightningIcon,
  animations
};
