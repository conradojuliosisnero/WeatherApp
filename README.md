# Clima

El clima actual de cualquier ciudad, dibujado como un cielo: el color cambia con la condición y la hora local, y el sol (o la luna) recorre su arco entre el amanecer y el atardecer.

**Demo:** https://weaterappcon.netlify.app

## Qué muestra

- Ciudad, hora de la medición, descripción del cielo, máxima y mínima.
- Temperatura en °C, °F o K (toca la unidad para cambiarla).
- Amanecer y atardecer en la hora local de la ciudad.
- Sensación térmica, humedad, viento (km/h y dirección), nubosidad, visibilidad y presión.
- **Próximos días** (hasta 5): cielo, máxima/mínima en la escala elegida y probabilidad de lluvia.
- Animación de entrada con GSAP: el nombre sube letra a letra y el sol recorre su arco.
- Microinteracciones con [Animate UI](https://animate-ui.com): iconos animados (cielo, lecturas, amanecer/atardecer, buscador), números que ruedan como un cuentakilómetros al cambiar de ciudad o de escala, ondas al pulsar los botones y brillo en el texto de carga.
- **Cielo real** con [@takustaqu/atmosphere](https://www.npmjs.com/package/@takustaqu/atmosphere) (WebGL): sol, luna con su fase, estrellas, nubes y rayos según la hora, el lugar y el clima de la búsqueda. El texto pasa a claro u oscuro según el brillo que mide del cielo.
- **Lluvia, nieve, niebla y rayos a pantalla completa** con [react-weather-effects](https://www.npmjs.com/package/react-weather-effects).
- **Gotas en la lente** cuando llueve: se forman, resbalan dejando rastro, se juntan y se secan al parar (simulación propia en `src/utils/drops.js`, sin dependencias).
- Paletas por clima y momento del día (amanecer, día, atardecer, noche) para el suelo, el texto y como respaldo sin WebGL.
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
| `src/components/SkyBackdrop.jsx` | Cielo WebGL (atmosphere) |
| `src/components/WeatherEffects.jsx` | Capa de lluvia, nieve, niebla y rayos |
| `src/components/LensDrops.jsx` | Gotas que resbalan por la "lente" |
| `src/components/icons/` | Iconos animados copiados de Animate UI |
| `src/services/weatherService.js` | Llama a `/api/weather` |
| `src/utils/sky.js` | Condición, día/noche y posición del sol |
| `src/app/api/owm.js` | Proxy a OpenWeatherMap con la API key (lo usan `/api/weather` y `/api/forecast`) |
| `src/utils/forecast.js` | Resumen por día del pronóstico de 3 en 3 horas |
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
