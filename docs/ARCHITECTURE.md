# Arquitectura técnica actual

## Resumen

MyWeb es actualmente una web estática sin framework, package manager, proceso de build, backend ni suite de pruebas automatizadas.

La arquitectura vigente es válida para el tamaño actual, pero varios archivos globales ya son grandes. Cualquier evolución debe partir de una necesidad concreta, no de una migración preventiva.

## Árbol principal

```text
MyWeb/
├── index.html
├── projects.html
├── projects_2.html
├── case-study.html
├── process.html
├── budget.html
├── resources.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── estimator.js
│   └── budget-estimator-ui.js
├── images/
│   └── featured-projects/
├── music/
├── audio/
└── videos/
```

No hay todavía README, configuración de hosting, CI, API, base de datos ni manifiesto de dependencias.

## Responsabilidades de páginas

- `index.html`: Home, Selected Work, modales, showreel, prueba social, FAQ y contacto.
- `projects.html`: dirección actual del portfolio de proyectos reales.
- `projects_2.html`: versión anterior conservada para reutilizar ideas; no es la página enlazada por navegación.
- `case-study.html`: prototipo de página individual de proyecto, actualmente centrado en Hammerfall y con placeholders.
- `process.html`: demo de la futura explicación del proceso.
- `budget.html`: shell del estimador.
- `resources.html`: demo del futuro centro de recursos.

El propósito y madurez de cada área están documentados en `PROJECT.md` y `CONTENT.md`.

## CSS

`css/styles.css` contiene el sistema visual completo y los estilos de todas las páginas, incluido el estimador.

Características actuales:

- Variables globales para colores, radios, sombras, anchura y tipografías.
- Cormorant Garamond y Outfit como tipografías principales.
- Neue Machina importada para usos específicos.
- Fondo oscuro, paneles translúcidos y acento dorado.
- Componentes y secciones añadidos progresivamente en un único archivo.
- Media queries y tratamiento de `prefers-reduced-motion` en distintas áreas.

Mientras siga siendo un CSS global, los cambios deben usar selectores suficientemente acotados y comprobar regresiones en otras páginas.

## JavaScript general

`js/main.js` concentra interacciones de Home y páginas de negocio:

- Reveal con IntersectionObserver.
- Slider de proyectos.
- FAQ.
- Modal de proyectos y reproductores de audio.
- Visualizador de audio con canvas y Web Audio API.
- Showreel y vídeo contextual.
- Marquesinas, contadores y animaciones.
- Mapa de proceso.
- Chat visual de testimonios.
- About expandible.
- CTA y controles visuales del formulario de contacto.

El archivo se carga también en páginas secundarias, por lo que cualquier acceso directo a elementos exclusivos de Home debe estar protegido contra `null`.

## Arquitectura del estimador

### Motor

`js/estimator.js`:

- Define configuración, tarifas, bandas y multiplicadores.
- Recoge y normaliza inputs.
- Enruta módulos activos.
- Calcula contribuciones y scores.
- Genera el objeto final.
- Conserva un render legacy y exporta `GameAudioBudgetEstimator` para navegador y CommonJS.

### Interfaz

`js/budget-estimator-ui.js`:

- Define preguntas y opciones.
- Decide pasos según el servicio.
- Mantiene el estado de sesión.
- Renderiza controles personalizados.
- Construye un formulario oculto compatible con el motor.
- Genera y presenta el resultado.

La interfaz debe consumir el motor; no debe replicar sus fórmulas.

### Flujo de datos actual

```text
Respuestas UI
  → estado en sessionStorage
  → formulario temporal oculto
  → estimator.collectInputs()
  → estimator.generateFinalEstimate()
  → objeto de resultado
  → renderResult()
```

No existe envío de red ni persistencia de servidor.

## Assets

El repositorio contiene imágenes grandes, doce WAV, dos MP3 y un showreel MP4. Es un repositorio pesado para una web estática.

Reglas prácticas:

- No duplicar medios sin necesidad.
- No convertir formatos ni eliminar originales sin una tarea expresa.
- Evitar precargas innecesarias.
- Comprobar rutas con coincidencia exacta de mayúsculas.
- Considerar optimización, streaming o almacenamiento externo como una tarea futura separada.

## Riesgos y problemas conocidos

Estos puntos describen el estado actual; no autorizan su corrección automática:

1. El formulario de contacto visible no tiene envío funcional.
2. El estimador no envía respuestas ni datos de contacto.
3. Confidence, price drivers y missing information se calculan pero no se muestran en la UI guiada.
4. El enlace `game-sfx-scope-estimator.html` apunta a una página inexistente.
5. Resources presenta el estimador como Coming soon.
6. Todas las tarjetas actuales de Projects enlazan al mismo `case-study.html`.
7. `projects_2.html` referencia `images/placeholder.jpg`, que no existe.
8. `main.js` obtiene el contexto de `modalVisualizerCanvas` sin verificar que el canvas exista en páginas secundarias.
9. Existen diferencias de casing entre algunas rutas y archivos, como `SHOWREEL SD.MP4` frente a `.mp4` y `16_Bit_Journey.wav` frente a `16_bit_Journey.wav`.
10. No hay pruebas automatizadas, CI ni configuración de despliegue.

## Comprobaciones disponibles

Para JavaScript:

```text
node --check js/main.js
node --check js/estimator.js
node --check js/budget-estimator-ui.js
```

Además:

- Revisar consola del navegador.
- Recorrer enlaces internos.
- Probar reproducción de audio y vídeo.
- Probar páginas secundarias, no solo Home.
- Probar rutas dinámicas del estimador.
- Revisar escritorio, tablet y móvil en las áreas modificadas.

## Evolución futura

Si se añade backend, debe mantenerse una frontera clara:

- El navegador calcula o prepara el payload.
- Un endpoint seguro valida entradas y aplica límites.
- El servidor gestiona secretos y proveedores externos.
- El frontend no contiene claves privadas.
- El envío debe incluir versión o estructura estable del resultado para evitar emails incomprensibles cuando evolucione el motor.

El proveedor y la arquitectura exacta siguen abiertos.

