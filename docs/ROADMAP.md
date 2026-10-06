# Roadmap de MyWeb

## Cómo interpretar este documento

Este roadmap describe estado y dirección. No es un calendario, no contiene fechas comprometidas y no concede permiso a Codex para implementar nada automáticamente.

Cada cambio requiere una petición concreta, revisión del código actual, alcance definido y comprobaciones antes de considerarse terminado. El orden de los bloques siguientes es orientativo y puede cambiar.

## Ya existente

### Base del sitio

- Web estática multipágina en HTML, CSS y JavaScript.
- Identidad visual oscura, editorial y premium con acentos dorados.
- Navegación principal entre Home, Projects, Process, Budget y Resources.
- Medios locales: imágenes, logos, música, audio de interfaz y showreel.

### Home

- Hero y posicionamiento principal.
- Sección protagonista de proyectos recientes con Little Jimmy's Nightmare, Hammerfall: Fallen Kingdom y Economicon.
- Logos de herramientas y plataformas.
- Showreel.
- Slider y modal de audio para Selected Work.
- Métricas y sección Currently Working On.
- Secciones de problemas, servicios, proceso, testimonios, About y FAQ.
- CTA final y estructura de formulario de contacto.
- Enlace al Budget Estimator desde navegación y FAQ.

La estructura y el diseño del frontend están aproximadamente al 90% según el propietario.

### Budget Estimator

- Página y experiencia guiada responsive.
- Enrutamiento dinámico por servicio.
- Motor de cálculo modular.
- Modelos Roger y benchmark profesional.
- Música, SFX, trailer, técnica, comercial, incertidumbre y mínimos.
- Diagnóstico, rangos y contenido incluido.
- Estado temporal en sesión.

El frontend y el cálculo están aproximadamente al 90%. No existe todavía captación completa ni backend.

### Páginas en estado de demo o base

- Projects.
- Página individual de proyecto basada en `case-study.html`.
- Process.
- Resources.
- Versión anterior `projects_2.html`, conservada para una futura fusión de ideas.

## Actualmente incompleto o en definición

### Home

- Reemplazar vídeos o materiales provisionales.
- Seguir ampliando Selected Work cuando existan muestras adecuadas.
- Revisar que métricas, testimonios y atribuciones sean exactos.
- Corregir el flujo real del formulario de contacto.

### Projects y páginas individuales

- Definir qué proyectos reales se muestran y con qué jerarquía.
- Diseñar la combinación adecuada entre `projects.html` y `projects_2.html`.
- Evitar que todas las tarjetas lleven a la misma página.
- Convertir el prototipo Case Study en páginas individuales reales.
- Reunir nombres, permisos, créditos y materiales pendientes.

### Process

- Definir su contenido y propósito definitivos.
- Mantener la dirección visual actual solo donde siga siendo útil.

### Resources

- Definir contenido real, guías y herramientas.
- Sustituir placeholders.
- Actualizar el Budget Estimator, que todavía aparece como Coming soon.

### Budget y contacto

- Mostrar el resultado sin exigir datos personales.
- Añadir solicitud opcional de revisión personal tras el resultado.
- Enviar a Roger respuestas, resultado y datos de contacto.
- Mostrar confirmación clara y expectativa de respuesta.
- Implementar privacidad y tratamiento de datos adecuados.
- Elegir backend y proveedor de email.

### Fiabilidad técnica conocida

- Revisar errores de JavaScript en páginas que no contienen el canvas del modal.
- Corregir diferencias de mayúsculas y minúsculas en rutas de medios.
- Resolver enlaces a páginas inexistentes.
- Revisar assets inexistentes en `projects_2.html`.
- Comprobar rendimiento y estrategia de medios pesados.

## Próximos candidatos de trabajo

Este bloque no fija prioridad ni autoriza ejecución. Son candidatos razonables para tareas independientes:

1. Correcciones de fiabilidad y rutas sin cambiar diseño.
2. Captación y envío del formulario general.
3. Flujo de revisión personal del Budget Estimator.
4. Auditoría y copy veraz de Home.
5. Definición y rediseño progresivo de Projects.
6. Primera página individual de proyecto con contenido real.
7. Definición de Process.
8. Definición de Resources.

## Futuro confirmado como dirección

- Una página individual completa para cada proyecto real relevante.
- Un SFX Scope Estimator u otra herramienta que ayude a calcular cuántos SFX y cuánta música puede necesitar un proyecto.
- Publicación profesional de la web.
- Backend para formularios, resultados y notificaciones.
- Posible uso de Vercel para despliegue.
- Posible uso de Supabase, Firebase u otra solución para backend o datos.
- GitHub seguirá siendo el centro del flujo de desarrollo.

## Ideas todavía no confirmadas

- Proveedor definitivo de hosting.
- Supabase frente a Firebase u otra alternativa.
- Base de datos permanente para estimaciones.
- CMS para Projects y Resources.
- Analítica, eventos y medición de conversión.
- Newsletter o marketing por email; actualmente no forman parte del flujo acordado del estimador.
- Estructura definitiva de Resources.
- Orden final y filtros de Projects.
- Contenido definitivo de Process.
- Diseño final de todas las páginas individuales.

Estas ideas deben tratarse como abiertas hasta que el usuario tome una decisión explícita.

