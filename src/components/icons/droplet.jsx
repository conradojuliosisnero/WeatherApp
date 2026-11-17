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
    drop: {
      initial: { scaleY: 1, scaleX: 1, transformOrigin: "50% 100%" },
      animate: {
        scaleY: [1, 0.85, 1.04, 1],
        scaleX: [1, 1.08, 0.97, 1],
        transformOrigin: "50% 100%",
        transition: { duration: 0.6, ease: "easeInOut" }
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
    d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"
    variants={variants.drop}
    initial="initial"
    animate={controls}
  />
    </motion.svg>;
}
function Droplet(props) {
  return <IconWrapper icon={IconComponent} {...props} />;
}
export {
  Droplet,
  Droplet as DropletIcon,
  animations
};
