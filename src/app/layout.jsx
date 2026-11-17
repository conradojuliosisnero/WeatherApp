import "@fontsource-variable/bricolage-grotesque/standard.css";
import "../index.css";

export const metadata = {
  title: "Clima — ConWeatherApp",
  description: "El clima de tu ciudad, en tiempo real.",
  icons: { icon: "/cloud.svg", apple: "/icons/apple-touch-icon.png" },
  appleWebApp: { capable: true, title: "Clima", statusBarStyle: "default" },
};

export const viewport = { themeColor: "#BCD6F0" };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
