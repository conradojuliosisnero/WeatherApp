// Icono de Animate UI (https://animate-ui.com), (c) 2025 Elliot Sutton.
// Licencia MIT + Commons Clause: uso dentro de esta app, no se redistribuye por separado.
"use client";
import { motion } from "motion/react";
import {
  getVariants,
  useAnimateIconContext,
  IconWrapper
} from "@animate-ui/react/icons";
const snowAnimation = {
  initial: { x: 0, y: 0, opacity: 1 },
  animate: (i = 0) => ({
    x: [0, 0.5, 0, -0.5, 0],
    y: [0, 1.5, -1, 0],
    opacity: [1, 0, 0, 1],
    transition: {
      duration: 2,
      times: [0, 0.5, 0.5, 1],
      ease: ["linear", "linear", "easeOut"],
      repeat: Infinity,
      delay: i * 0.3,
      x: {
        inherit: true,
        times: [0, 0.25, 0.5, 0.75, 1],
        ease: "easeInOut"
      }
    }
  })
};
const animations = {
  default: {
    group: {
      initial: {},
      animate: {}
    },
    path1: {},
    path2: snowAnimation,
    path3: snowAnimation,
    path4: snowAnimation,
    path5: snowAnimation,
    path6: snowAnimation,
    path7: snowAnimation
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
    d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
    variants={variants.path1}
    initial="initial"
    animate={controls}
  />
      <motion.g variants={variants.group} initial="initial" animate={controls}>
        <motion.path d="M8 15h.01" variants={variants.path2} custom={0} />
        <motion.path d="M12 21h.01" variants={variants.path3} custom={1} />
        <motion.path d="M16 15h.01" variants={variants.path4} custom={2} />
        <motion.path d="M12 17h.01" variants={variants.path7} custom={3} />
        <motion.path d="M16 19h.01" variants={variants.path6} custom={4} />
        <motion.path d="M8 19h.01" variants={variants.path5} custom={5} />
      </motion.g>
    </motion.svg>;
}
function CloudSnow(props) {
  return <IconWrapper icon={IconComponent} {...props} />;
}
export {
  CloudSnow,
  CloudSnow as CloudSnowIcon,
  animations
};
