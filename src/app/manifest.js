// Next.js lo sirve en /manifest.webmanifest y lo enlaza solo en el <head>
export default function manifest() {
  return {
    name: "Clima — ConWeatherApp",
    short_name: "Clima",
    description: "El clima de tu ciudad, en tiempo real.",
    start_url: "/",
    display: "standalone",
    background_color: "#fce3cf",
    theme_color: "#bcd6f0",
    lang: "es",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      // la nube está dentro de la zona segura, así que sirve también para recortar
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
