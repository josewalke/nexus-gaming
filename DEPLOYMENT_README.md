# 🚀 Guía de Deployment - Nexus Gaming

Esta guía te ayudará a desplegar Nexus Gaming en diferentes plataformas y entornos.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Configuración de Entornos](#configuración-de-entornos)
- [Opciones de Deployment](#opciones-de-deployment)
- [CI/CD](#cicd)
- [Monitoreo y Performance](#monitoreo-y-performance)
- [Troubleshooting](#troubleshooting)

## 🔧 Requisitos Previos

### Software Necesario
- Node.js 18+ o 20+
- npm 8+
- Git
- Docker (opcional)
- Docker Compose (opcional)

### Variables de Entorno
```bash
# Desarrollo
NODE_ENV=development
REACT_APP_ENV=development
REACT_APP_API_URL=http://localhost:3001

# Staging
NODE_ENV=production
REACT_APP_ENV=staging
REACT_APP_API_URL=https://staging-api.nexusgaming.es

# Producción
NODE_ENV=production
REACT_APP_ENV=production
REACT_APP_API_URL=https://api.nexusgaming.es
GENERATE_SOURCEMAP=false
```

## 🌍 Configuración de Entornos

### Desarrollo Local
```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Ejecutar en modo desarrollo
npm start

# Ejecutar tests
npm run test:coverage

# Ejecutar E2E tests
npm run test:e2e
```

### Staging
```bash
# Build para staging
npm run build

# Tests de staging
npm run deploy:staging
```

### Producción
```bash
# Build optimizado para producción
npm run build:prod

# Tests completos
npm run deploy:production
```

## 🚀 Opciones de Deployment

### 1. Netlify (Recomendado)

#### Configuración Automática
1. Conecta tu repositorio de GitHub a Netlify
2. Configura las variables de entorno en Netlify
3. El deployment se ejecutará automáticamente en cada push

#### Configuración Manual
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=build
```

### 2. Vercel

#### Configuración Automática
1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente que es una app React
3. Configura las variables de entorno

#### Configuración Manual
```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### 3. Docker

#### Desarrollo con Docker
```bash
# Construir imagen de desarrollo
docker-compose --profile dev up --build

# Ejecutar tests
docker-compose --profile test up --build

# Ejecutar E2E tests
docker-compose --profile e2e up --build
```

#### Producción con Docker
```bash
# Construir imagen de producción
docker-compose --profile prod up --build -d

# Con nginx reverse proxy
docker-compose --profile prod --profile nginx up --build -d
```

#### Comandos Docker Útiles
```bash
# Ver logs
docker-compose logs -f app-prod

# Reiniciar servicios
docker-compose restart app-prod

# Escalar servicios
docker-compose up --scale app-prod=3
```

### 4. Servidor Tradicional

#### Build y Deploy Manual
```bash
# Build para producción
npm run build:prod

# Copiar archivos al servidor
scp -r build/* usuario@servidor:/var/www/nexus-gaming/

# Configurar nginx (ver nginx.conf)
sudo cp nginx.conf /etc/nginx/sites-available/nexus-gaming
sudo ln -s /etc/nginx/sites-available/nexus-gaming /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔄 CI/CD

### GitHub Actions
El proyecto incluye un workflow automático en `.github/workflows/deploy.yml` que:

1. **Ejecuta tests** en múltiples versiones de Node.js
2. **Analiza el bundle** para optimización
3. **Ejecuta Lighthouse CI** para métricas de performance
4. **Deploy automático** a staging y producción

### Configuración de Secrets
Configura estos secrets en tu repositorio de GitHub:

```bash
NETLIFY_AUTH_TOKEN=tu_token_de_netlify
NETLIFY_SITE_ID=tu_site_id_de_netlify
VERCEL_TOKEN=tu_token_de_vercel
VERCEL_PROJECT_ID=tu_project_id_de_vercel
```

### Triggers de Deployment
- **Push a `main`**: Deploy a producción
- **Push a `develop`**: Deploy a staging
- **Pull Request**: Ejecuta tests y análisis

## 📊 Monitoreo y Performance

### Métricas de Performance
```bash
# Análisis de bundle
npm run analyze-bundle

# Lighthouse CI
npm run lighthouse:ci

# Performance audit completo
npm run performance:audit
```

### Monitoreo en Producción
- **Core Web Vitals**: Monitoreo automático con web-vitals
- **Error Tracking**: Configurar Sentry o similar
- **Analytics**: Google Analytics 4 configurado
- **Uptime**: Monitoreo con UptimeRobot o similar

### Alertas Configuradas
- Performance score < 90
- LCP > 2.5s
- FID > 100ms
- CLS > 0.1
- Errores 4xx/5xx > 1%

## 🔍 Troubleshooting

### Problemas Comunes

#### Error de Source Maps
```bash
# Solución: Deshabilitar source maps en producción
GENERATE_SOURCEMAP=false npm run build
```

#### Error de Dependencias
```bash
# Solución: Usar legacy peer deps
npm install --legacy-peer-deps
```

#### Error de Service Worker
```bash
# Solución: Limpiar cache
npm run clear-cache
```

#### Error de Build
```bash
# Solución: Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Logs Útiles
```bash
# Logs de build
npm run build 2>&1 | tee build.log

# Logs de tests
npm run test:coverage 2>&1 | tee test.log

# Logs de Docker
docker-compose logs app-prod
```

### Comandos de Debug
```bash
# Verificar configuración
npm run check-all

# Análisis de seguridad
npm run security:audit

# Verificar tipos (si usas TypeScript)
npm run type-check
```

## 📈 Optimizaciones de Producción

### Performance
- ✅ Code splitting automático
- ✅ Lazy loading de componentes
- ✅ Optimización de imágenes
- ✅ Service Worker para cache
- ✅ Compresión gzip/brotli
- ✅ CDN para assets estáticos

### SEO
- ✅ Meta tags dinámicos
- ✅ Sitemap automático
- ✅ Robots.txt optimizado
- ✅ Structured data (JSON-LD)
- ✅ Open Graph tags

### Seguridad
- ✅ Headers de seguridad configurados
- ✅ CSP (Content Security Policy)
- ✅ HTTPS forzado
- ✅ Rate limiting
- ✅ Sanitización de inputs

## 🎯 Próximos Pasos

1. **Configurar dominio personalizado**
2. **Implementar CDN global**
3. **Configurar monitoreo de errores**
4. **Implementar A/B testing**
5. **Configurar backup automático**

## 📞 Soporte

Para problemas específicos de deployment:
- Revisa los logs de build
- Verifica las variables de entorno
- Consulta la documentación de la plataforma
- Abre un issue en el repositorio

---

**¡Nexus Gaming está listo para el mundo! 🎮✨** 