import { useEffect } from "react";
import toast from "react-hot-toast";

const DISMISSED = "clima-install-dismissed";

const dismissed = () => {
  try {
    return localStorage.getItem(DISMISSED) === "1";
  } catch {
    return false;
  }
};
const dismiss = (t) => {
  toast.dismiss(t.id);
  try {
    localStorage.setItem(DISMISSED, "1");
  } catch {
    // sin almacenamiento (modo privado): volverá a avisar la próxima vez
  }
};

/**
 * Registra el service worker y avisa de que la app se puede instalar: botón
 * "Instalar" donde el navegador lo permite (Chrome, Edge, Android) e indicaciones
 * en iPhone/iPad, que no tienen ese evento. Si se descarta, no vuelve a salir.
 */
export default function InstallPrompt() {
  useEffect(() => {
    navigator.serviceWorker?.register("/sw.js").catch(() => {});

    const installed =
      window.matchMedia("(display-mode: standalone)").matches ||
      navigator.standalone;
    if (installed || dismissed()) return;

    const show = (body) =>
      toast(
        (t) => (
          <span className="install">
            <span>{body(t)}</span>
            <button
              type="button"
              className="install__close"
              onClick={() => dismiss(t)}
              aria-label="No mostrar más"
            >
              ×
            </button>
          </span>
        ),
        { id: "install", duration: Infinity },
      );

    const onPrompt = (e) => {
      e.preventDefault(); // el aviso propio sustituye a la barra del navegador
      show((t) => (
        <>
          Instala Clima en tu dispositivo{" "}
          <button
            type="button"
            className="install__button"
            onClick={async () => {
              toast.dismiss(t.id);
              await e.prompt();
            }}
          >
            Instalar
          </button>
        </>
      ));
    };
    const onInstalled = () => toast.dismiss("install");

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    // iPhone/iPad: Safari no avisa, se explica cómo hacerlo
    if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
      show(
        () =>
          "Instala Clima: toca Compartir y luego «Añadir a pantalla de inicio»",
      );
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  return null;
}
