# 🌤️ Clima App - Aplicación del Clima Moderna

<div align="center">
  <img src="https://github.com/conradojuliosisnero/WeatherApp/assets/111514635/68a8f91c-8c94-43bd-a1f3-48cbbcbd7cb6" alt="Weather App Preview" width="600"/>
  
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.1.5-green.svg)](https://vitejs.dev/)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
</div>

## 📋 Descripción

Una aplicación de pronóstico del clima moderna y elegante desarrollada con **React**, **Vite**, y siguiendo principios **SOLID**. La aplicación proporciona información meteorológica en tiempo real con una interfaz de usuario intuitiva y responsive, implementando las mejores prácticas de desarrollo frontend.

## ✨ Características Principales

### 🎯 Funcionalidades

- **🔍 Búsqueda Inteligente**: Busca el clima de cualquier ciudad del mundo
- **🌡️ Conversión de Temperatura**: Cambio entre Celsius, Fahrenheit y Kelvin
- **📱 Diseño Responsive**: Optimizado para dispositivos móviles y desktop
- **🎨 Interfaz Moderna**: Glassmorphism y animaciones suaves
- **⚡ Rendimiento Optimizado**: Carga rápida con Vite
- **🔔 Notificaciones**: Feedback visual con React Hot Toast
- **♿ Accesibilidad**: Cumple con estándares WCAG

### 🏗️ Arquitectura y Patrones

- **SOLID Principles**: Código mantenible y escalable
- **Custom Hooks**: Lógica reutilizable y separación de responsabilidades
- **Component Architecture**: Componentes modulares y reutilizables
- **Service Layer**: Capa de servicios para manejo de APIs
- **Error Handling**: Manejo robusto de errores
- **Clean Code**: Código limpio y bien documentado

## 🚀 Tecnologías Utilizadas

### Frontend

- ⚛️ **React 18.2.0** - Biblioteca de JavaScript para UI
- ⚡ **Vite 7.1.5** - Herramienta de construcción rápida
- 🎨 **CSS3** - Estilos modernos con Glassmorphism
- 🔧 **Custom Hooks** - Lógica reutilizable

### Librerías y Herramientas

- 🎯 **Lucide React** - Iconos modernos y elegantes
- 🍞 **React Hot Toast** - Notificaciones atractivas
- 🌐 **OpenWeatherMap API** - Datos meteorológicos precisos
- 📦 **ESLint** - Linting de código
- 🔄 **Git** - Control de versiones

### Principios de Desarrollo

- 🏛️ **SOLID Principles**
- 🧹 **Clean Architecture**
- 📦 **Component-Based Design**
- ♿ **Accessibility First**
- 📱 **Mobile First Design**

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- API Key de OpenWeatherMap

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/conradojuliosisnero/WeatherApp.git
cd WeatherApp
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**

```bash
# Crear archivo .env en la raíz del proyecto
cp .env.example .env
```

4. **Configurar la API Key**

```env
VITE_API_KEY=tu_api_key_de_openweathermap
VITE_API_URL=https://api.openweathermap.org/data/2.5/weather
```

5. **Ejecutar en modo desarrollo**

```bash
npm run dev
# o
yarn dev
```

6. **Abrir en el navegador**

```
http://localhost:5173
```

## 📂 Estructura del Proyecto

```
WeatherApp/
├── public/                   # Archivos públicos
├── src/
│   ├── components/          # Componentes React
│   │   ├── UI/             # Componentes UI reutilizables
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── LoadingSpinner/
│   │   │   └── ErrorMessage/
│   │   ├── CardWeather/    # Tarjeta del clima
│   │   ├── Search/         # Barra de búsqueda
│   │   ├── Weather/        # Componente principal
│   │   ├── TittleApp/      # Título de la app
│   │   └── FooterApp/      # Pie de página
│   ├── hooks/              # Custom Hooks
│   │   ├── useWeather.js
│   │   └── useTemperatureConverter.js
│   ├── services/           # Servicios de API
│   │   └── weatherService.js
│   ├── utils/              # Utilidades y helpers
│   │   └── index.js
│   ├── App.jsx             # Componente principal
│   ├── App.css            # Estilos globales
│   └── main.jsx           # Punto de entrada
├── .env.example            # Ejemplo de variables de entorno
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Guía de Estilos

### Paleta de Colores

- **Primario**: `#667eea` - `#764ba2` (Gradiente)
- **Superficie**: `rgba(255, 255, 255, 0.95)` (Glassmorphism)
- **Texto**: `#374151` (Gris oscuro)
- **Acento**: `#3b82f6` (Azul)
- **Error**: `#ef4444` (Rojo)
- **Éxito**: `#10b981` (Verde)

### Tipografía

- **Fuente Principal**: Inter
- **Títulos**: 700-800 weight
- **Texto**: 400-500 weight
- **Escala**: 0.875rem - 3.5rem

## 📱 Responsive Design

La aplicación está optimizada para diferentes tamaños de pantalla:

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🧪 Testing y Calidad

### Linting

```bash
npm run lint
```

### Build de Producción

```bash
npm run build
```

### Preview del Build

```bash
npm run preview
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución

- Sigue los principios SOLID
- Mantén la consistencia en el código
- Añade tests para nuevas funcionalidades
- Actualiza la documentación cuando sea necesario

## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

## 👨‍💻 Autor

**Conrado Julio Sisnero**

- GitHub: [@conradojuliosisnero](https://github.com/conradojuliosisnero)
- LinkedIn: [Conrado Julio Sisnero](https://linkedin.com/in/conradojuliosisnero)

## 🙏 Agradecimientos

- [OpenWeatherMap](https://openweathermap.org/) por la API del clima
- [Lucide](https://lucide.dev/) por los iconos
- [React Hot Toast](https://react-hot-toast.com/) por las notificaciones
- [Vite](https://vitejs.dev/) por la herramienta de construcción

## 📊 Estadísticas del Proyecto

- **Líneas de Código**: ~2,000+
- **Componentes**: 15+
- **Hooks Personalizados**: 2
- **Servicios**: 1
- **Cobertura de Tests**: En desarrollo

---

<div align="center">
  <p>⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!</p>
  <p>🚀 ¡Hecho con ❤️ y mucho ☕!</p>
</div>
