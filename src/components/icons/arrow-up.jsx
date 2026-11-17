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
    group: {
      initial: {
        y: 0,
        transition: { ease: "easeInOut", duration: 0.3 }
      },
      animate: {
        y: "-25%",
        transition: { ease: "easeInOut", duration: 0.3 }
      }
    },
    path1: {},
    path2: {}
  },
  "default-loop": {
    group: {
      initial: {
        y: 0
      },
      animate: {
        y: [0, "-25%", 0],
        transition: { ease: "easeInOut", duration: 0.6 }
      }
    },
    path1: {},
    path2: {}
  },
  pointing: {
    group: {},
    path1: {
      initial: {
        d: "M12 19V5",
        transition: { ease: "easeInOut", duration: 0.3 }
      },
      animate: {
        d: "M12 19V10",
        transition: { ease: "easeInOut", duration: 0.3 }
      }
    },
    path2: {
      initial: {
        d: "m5 12 7-7 7 7",
        transition: { ease: "easeInOut", duration: 0.3 }
      },
      animate: {
        d: "m5 16 7-7 7 7",
        transition: { ease: "easeInOut", duration: 0.3 }
      }
    }
  },
  "pointing-loop": {
    group: {},
    path1: {
      initial: {
        d: "M12 19V5"
      },
      animate: {
        d: ["M12 19V5", "M12 19V10", "M12 19V5"],
        transition: { ease: "easeInOut", duration: 0.6 }
      }
    },
    path2: {
      initial: {
        d: "m5 12 7-7 7 7"
      },
      animate: {
        d: ["m5 12 7-7 7 7", "m5 16 7-7 7 7", "m5 12 7-7 7 7"],
        transition: { ease: "easeInOut", duration: 0.6 }
      }
    }
  },
  out: {
    group: {
      initial: {
        y: 0
      },
      animate: {
        y: [0, "-150%", "150%", 0],
        transition: {
          default: { ease: "easeInOut", duration: 0.6 },
          y: {
            ease: "easeInOut",
            duration: 0.6,
            times: [0, 0.5, 0.5, 1]
          }
        }
      }
    },
    path1: {},
    path2: {}
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
      <motion.g variants={variants.group} initial="initial" animate={controls}>
        <motion.path
    d="M12 19V5"
    variants={variants.path1}
    initial="initial"
    animate={controls}
  />
        <motion.path
    d="m5 12 7-7 7 7"
    variants={variants.path2}
    initial="initial"
    animate={controls}
  />
      </motion.g>
    </motion.svg>;
}
function ArrowUp(props) {
  return <IconWrapper icon={IconComponent} {...props} />;
}
export {
  ArrowUp,
  ArrowUp as ArrowUpIcon,
  animations
};
