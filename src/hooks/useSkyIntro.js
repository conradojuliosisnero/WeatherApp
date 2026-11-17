import { useLayoutEffect } from "react";
import gsap from "gsap";
import { arcPoint } from "../utils/arc";

/**
 * Secuencia de entrada cada vez que llega una ciudad nueva:
 * el nombre sube letra a letra, la temperatura sube a su sitio
 * y el sol recorre su arco desde el amanecer hasta la hora actual.
 */
export const useSkyIntro = (scopeRef, key, { progress }) => {
  useLayoutEffect(() => {
    if (!scopeRef.current || key == null) return;

    const mm = gsap.matchMedia(scopeRef);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const star = scopeRef.current.querySelector(".js-star");
      const trail = scopeRef.current.querySelector(".js-trail");

      const sun = { t: 0 };

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".js-char", { yPercent: 115, duration: 1.1, stagger: 0.035 }, 0)
        .from(".js-meta", { autoAlpha: 0, y: 12, duration: 0.8, stagger: 0.08 }, 0.25)
        .to(
          sun,
          {
            t: progress,
            duration: 2.2,
            ease: "power3.inOut",
            onUpdate: () => {
              const { x, y } = arcPoint(sun.t);
              star?.setAttribute("transform", `translate(${x} ${y})`);
              trail?.setAttribute("stroke-dashoffset", String(1 - sun.t));
            },
          },
          0.1
        )
        .from(".js-temp-wrap", { yPercent: 18, duration: 1.6 }, 0.2)
        .from(".js-reading", { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.06 }, 0.9);

      return () => tl.kill();
    });

    return () => mm.revert();
    // Solo se repite al cambiar de ciudad o de medición, no al cambiar de escala
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
};
