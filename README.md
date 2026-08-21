# Proyecto C4 — Cienciometría, Complejidad y Ciencia de la Ciencia

![Status](https://img.shields.io/badge/Estado-Desarrollo-green)
![Institución](https://img.shields.io/badge/Institución-C3%20UNAM-blue)

Repositorio del sitio web estático para el proyecto **C4 (Cienciometría, Complejidad y Ciencia de la Ciencia)**, perteneciente al **Centro de Ciencias de la Complejidad (C3) de la UNAM**.

## 📋 Descripción General
El proyecto C4 se centra en el análisis multidimensional de la ciencia mexicana, combinando enfoques de cienciometría, teoría de sistemas, redes complejas e Inteligencia Artificial. Este sitio web sirve como el directorio principal para consultar la información del proyecto, sus miembros, la producción científica (artículos, libros, reportes) y las actividades de divulgación.

Este repositorio documenta y estructura la plataforma web como parte de las actividades de servicio social en el Centro de Ciencias de la Complejidad, sentando las bases tecnológicas para su futura escalabilidad institucional.

## 🛠️ Tecnologías
Actualmente, el sitio está construido bajo una arquitectura *Vanilla Web* sin dependencias externas:
- **HTML5:** Estructura semántica moderna (`<nav>`, `<section>`, `<footer>`).
- **CSS3:** Sistema de diseño basado en CSS Variables (*Design Tokens*), CSS Grid y Multi-column Layout.

## 📁 Estructura del Proyecto
```text
/
├── index.html           # Página principal y objetivos del proyecto
├── miembros.html        # Directorio de coordinadores, colaboradores y estudiantes
├── produccion.html      # Repositorio de artículos, libros y reportes técnicos
├── difusion.html        # Presentaciones, entrevistas y divulgación
└── style/
    └── main.css         # Hoja de estilos global desacoplada
```

## 🚀 Uso y Desarrollo Local
Al ser un sitio web estático puro, no requiere de un servidor complejo para previsualizar los cambios.

1. Clona este repositorio.
2. Abre cualquier archivo `.html` directamente en tu navegador web.
3. *Opcional pero recomendado:* Utiliza extensiones como **Live Server** en tu editor de código para visualizar los cambios en tiempo real.

## 🗺️ Roadmap y Siguientes Pasos
El proyecto se encuentra en una fase de evaluación técnica para refactorizar su arquitectura. Los objetivos a corto/mediano plazo incluyen:
- [x] Desacoplamiento de CSS a una hoja de estilos externa.
- [x] Rediseño visual del sitio.
- [ ] Evaluación técnica para migrar hacia un framework dinámico (ej. **Laravel / PHP**) o un Generador de Sitios Estáticos (SSG).
- [ ] Implementación de un panel de administración o sistema de gestión para automatizar la captura de la producción científica.
- [ ] Optimización de metadatos (Open Graph) orientados a SEO académico.

---
**© Coordinación de Ciencia de Datos · C3 UNAM**
