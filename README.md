# Clima

El clima actual de cualquier ciudad, dibujado como un cielo: el color cambia con la condición y la hora local, y el sol (o la luna) recorre su arco entre el amanecer y el atardecer.

**Demo:** https://weaterappcon.netlify.app

## Qué muestra

- Ciudad, hora de la medición, descripción del cielo, máxima y mínima.
- Temperatura en °C, °F o K (toca la unidad para cambiarla).
- Amanecer y atardecer en la hora local de la ciudad.
- Sensación térmica, humedad, viento (km/h y dirección), nubosidad, visibilidad y presión.
- Animación de entrada con GSAP, que se desactiva si el sistema pide menos movimiento.

## Tecnologías

React 19, Vite 8, GSAP, lucide-react y react-hot-toast. Los datos vienen de la [API de OpenWeatherMap](https://openweathermap.org/current) a través de una función de Netlify.

## Cómo funciona

```
navegador ──> /.netlify/functions/weather?q=Lima ──> api.openweathermap.org
                (netlify/functions/weather.js)
```

La API key **nunca llega al navegador**. Vive solo en la variable de entorno `OWM_API_KEY` de Netlify, y la función la agrega a cada petición.

| Archivo | Para qué |
|---|---|
| `src/components/WeatherApp.jsx` | La pantalla: cielo, temperatura y lecturas |
| `src/hooks/useWeather.js` | Pide el clima y maneja carga y errores |
| `src/hooks/useSkyIntro.js` | Animación de entrada |
| `src/services/weatherService.js` | Llama a la función de Netlify |
| `src/utils/sky.js` | Condición, día/noche y posición del sol |
| `netlify/functions/weather.js` | Proxy a OpenWeatherMap con la API key |
| `public/_headers` | Cabeceras de seguridad (CSP y otras) |

## Desarrollo local

Requisitos: Node 20.19 o superior y una API key gratis de [OpenWeatherMap](https://home.openweathermap.org/api_keys).

```bash
pnpm install
```

```bash
cp .env.example .env   # y pon tu key en OWM_API_KEY
```

```bash
npx netlify-cli dev    # sirve la app y la función juntas
```

`pnpm dev` solo sirve la interfaz: sin la función de Netlify, la búsqueda del clima falla.

Otros comandos: `pnpm test`, `pnpm lint`, `pnpm build` y `pnpm preview`.

## Despliegue en Netlify

1. Conecta el repo. Netlify detecta Vite y la carpeta `netlify/functions`.
2. En *Project configuration → Environment variables*, crea `OWM_API_KEY` con tu key.
3. Cada push a `main` publica una versión nueva.

## Licencia

MIT. Hecho por [Conrado Julio Sisnero](https://github.com/conradojuliosisnero).
