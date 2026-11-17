# Guía de Contribución

## 🤝 Cómo Contribuir

¡Gracias por tu interés en contribuir a Clima App! Estas son las pautas para contribuir al proyecto.

## 📋 Código de Conducta

Este proyecto sigue un código de conducta. Al participar, se espera que respetes este código.

## 🚀 Cómo Empezar

1. **Fork el proyecto**
2. **Clona tu fork**
   ```bash
   git clone https://github.com/tu-usuario/WeatherApp.git
   ```
3. **Crea una rama para tu feature**
   ```bash
   git checkout -b feature/mi-nueva-funcionalidad
   ```

## 📝 Estándares de Código

### Principios SOLID

- **S**ingle Responsibility: Cada componente/función debe tener una sola responsabilidad
- **O**pen/Closed: Abierto para extensión, cerrado para modificación
- **L**iskov Substitution: Los objetos deben ser reemplazables por instancias de sus subtipos
- **I**nterface Segregation: Muchas interfaces específicas son mejores que una general
- **D**ependency Inversion: Depende de abstracciones, no de concreciones

### Convenciones de Nomenclatura

- **Componentes**: PascalCase (`WeatherCard.jsx`)
- **Hooks**: camelCase con prefijo "use" (`useWeather.js`)
- **Servicios**: camelCase (`weatherService.js`)
- **Constantes**: UPPER_SNAKE_CASE (`API_ENDPOINTS`)
- **CSS Classes**: kebab-case con BEM (`weather-card__title`)

### Estructura de Archivos

```
src/
├── components/
├── hooks/               # Custom hooks
├── services/            # Llamadas a la función de Netlify
└── utils/               # Utilidades puras (clima, arco, escalas)
netlify/functions/       # Proxy a OpenWeatherMap (guarda la API key)
```

## 🧪 Testing

- Añade tests para nuevas funcionalidades
- Ejecuta `pnpm test` y `pnpm lint` antes de hacer commit

## 📦 Commits

Usa [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: añadir búsqueda por coordenadas
fix: corregir conversión de temperatura
docs: actualizar README
style: mejorar estilos del header
refactor: extraer lógica de API a servicio
test: añadir tests para useWeather hook
```

## 🔍 Pull Requests

1. **Descripción clara** del cambio
2. **Screenshots** si hay cambios visuales
3. **Tests** que validen el cambio
4. **Documentación** actualizada si es necesario
5. **Código liteado** sin errores

### Template de PR

```markdown
## 📋 Descripción

Breve descripción del cambio

## 🔄 Tipo de Cambio

- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## ✅ Checklist

- [ ] Tests pasando
- [ ] Código liteado
- [ ] Documentación actualizada
- [ ] Sin breaking changes
```

## 🎨 Estilos y UI

- Sigue el sistema de diseño existente
- Mantén la consistencia visual
- Usa las variables CSS existentes
- Implementa responsive design
- Considera la accesibilidad

## 🔧 Desarrollo Local

```bash
# Instalar dependencias
pnpm install

# App + función de Netlify (necesita OWM_API_KEY en .env)
npx netlify-cli dev

# Tests, lint y build
pnpm test
pnpm lint
pnpm build
```

## 📚 Recursos

- [React Documentation](https://reactjs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Clean Code Guidelines](https://github.com/ryanmcdermott/clean-code-javascript)

## ❓ ¿Necesitas Ayuda?

- 🐛 **Bugs**: Abre un issue con el template de bug
- 💡 **Features**: Abre un issue con el template de feature request
- ❓ **Preguntas**: Usa las Discussions de GitHub

## 🙏 Reconocimientos

Todos los contribuidores serán añadidos al README. ¡Gracias por hacer este proyecto mejor!
