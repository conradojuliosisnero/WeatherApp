# Clima

El clima actual de cualquier ciudad, dibujado como un cielo: el color cambia con la condición y la hora local, y el sol (o la luna) recorre su arco entre el amanecer y el atardecer.

**Demo:** https://weaterappcon.netlify.app

## Qué muestra

- Ciudad, hora de la medición, descripción del cielo, máxima y mínima.
- Temperatura en °C, °F o K (toca la unidad para cambiarla).
- Amanecer y atardecer en la hora local de la ciudad.
- Sensación térmica, humedad, viento (km/h y dirección), nubosidad, visibilidad y presión.
- Animación de entrada con GSAP: el nombre sube letra a letra y el sol recorre su arco.
- Microinteracciones con [Animate UI](https://animate-ui.com): iconos animados (cielo, lecturas, amanecer/atardecer, buscador), números que ruedan como un cuentakilómetros al cambiar de ciudad o de escala, ondas al pulsar los botones y brillo en el texto de carga.
- Todo respeta la preferencia del sistema de reducir movimiento.

## Tecnologías

Next.js 16 (App Router), React 19, GSAP, Motion + Animate UI y react-hot-toast. Los datos vienen de la [API de OpenWeatherMap](https://openweathermap.org/current) a través de la ruta `/api/weather` de Next.js.

## Cómo funciona

```
navegador ──> /api/weather?q=Lima ──> api.openweathermap.org
                (src/app/api/weather/route.js)
```

La API key **nunca llega al navegador**. Vive solo en la variable de entorno `OWM_API_KEY` del servidor, y la ruta la agrega a cada petición.

| Archivo | Para qué |
|---|---|
| `src/app/layout.jsx`, `src/app/page.jsx` | Layout (fuente, metadatos) y la página |
| `src/components/WeatherApp.jsx` | La pantalla: cielo, temperatura y lecturas |
| `src/hooks/useWeather.js` | Pide el clima y maneja carga y errores |
| `src/hooks/useSkyIntro.js` | Animación de entrada (GSAP) |
| `src/components/icons/` | Iconos animados copiados de Animate UI |
| `src/services/weatherService.js` | Llama a `/api/weather` |
| `src/utils/sky.js` | Condición, día/noche y posición del sol |
| `src/app/api/weather/route.js` | Proxy a OpenWeatherMap con la API key |
| `next.config.mjs` | Cabeceras de seguridad (CSP y otras) |

## Desarrollo local

Requisitos: Node 20.19 o superior y una API key gratis de [OpenWeatherMap](https://home.openweathermap.org/api_keys).

```bash
pnpm install
```

```bash
cp .env.example .env.local   # y pon tu key en OWM_API_KEY
```

```bash
pnpm dev                     # http://localhost:3000
```

Otros comandos: `pnpm test`, `pnpm lint`, `pnpm build` y `pnpm start`.

## Despliegue en Netlify

1. Conecta el repo. Netlify detecta Next.js; `netlify.toml` fija el comando y la carpeta de salida.
2. En *Project configuration → Environment variables*, crea `OWM_API_KEY` con tu key.
3. Cada push a `main` publica una versión nueva.

## Licencia

MIT. Hecho por [Conrado Julio Sisnero](https://github.com/conradojuliosisnero).
