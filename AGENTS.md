# Instrucciones permanentes para trabajar en MyWeb

Este archivo se aplica a todo el repositorio. Describe cómo debe trabajar Codex dentro de MyWeb. No autoriza por sí mismo ninguna tarea del roadmap.

## 1. Contexto que debe leerse antes de trabajar

Antes de modificar código:

1. Leer este archivo completo.
2. Leer `docs/PROJECT.md` para entender el producto.
3. Leer el documento específico de la tarea:
   - `docs/ESTIMATOR.md` para el estimador.
   - `docs/CONTENT.md` para páginas, proyectos, testimonios o copy.
   - `docs/ARCHITECTURE.md` para estructura técnica, integraciones o refactors.
   - `docs/ROADMAP.md` solo como orientación de estado y dirección.
4. Inspeccionar la implementación actual antes de proponer o aplicar cambios.

La instrucción concreta del usuario tiene prioridad sobre estos documentos. El código actual es la referencia de cómo funciona hoy; la documentación refleja intención, contexto y decisiones confirmadas. Si ambos se contradicen, no asumir silenciosamente cuál debe ganar: explicar la contradicción y resolverla dentro del alcance de la tarea.

## 2. Modelo de trabajo del proyecto

- `MyWeb` en local es la copia de trabajo.
- GitHub es el repositorio central y la versión oficial compartida.
- VS Code es el entorno principal de revisión y pruebas manuales del propietario.
- GitHub Desktop se usa normalmente para revisar cambios, hacer commit y push.
- Codex trabaja sobre los archivos locales cuando el usuario pide una implementación.
- ChatGPT y el usuario definen primero producto, UX, comportamiento y alcance cuando sea necesario.
- El desarrollo debe avanzar mediante cambios pequeños, revisables y controlables.

Antes de editar, comprobar la rama y el estado del árbol de trabajo. Cuando sea relevante, comparar el commit local con la referencia central disponible. No ejecutar `pull`, `commit`, `push`, `merge`, despliegues ni operaciones equivalentes salvo petición expresa.

## 3. Alcance y preservación

- Implementar únicamente la tarea solicitada.
- No modificar archivos o comportamientos no relacionados para “aprovechar” la tarea.
- Preservar los cambios locales existentes del usuario.
- No borrar ni reemplazar trabajo previo sin entender su finalidad.
- `projects_2.html` es una versión anterior que debe conservarse: contiene ideas que se quieren fusionar más adelante con `projects.html`.
- Evitar refactors amplios dentro de una corrección pequeña.
- Si una tarea exige cambios en muchas áreas, analizar primero dependencias, riesgos y plan de ejecución.
- El roadmap no concede permiso para implementar automáticamente sus elementos.

## 4. Principios de implementación

- Entender y reutilizar componentes, estilos, datos y funciones existentes antes de duplicarlos.
- Mantener responsabilidades claras entre HTML, estilos, interacción general, motor del estimador e interfaz del estimador.
- Mantener el código comprensible y con nombres coherentes con los patrones existentes.
- No añadir abstracciones, capas o archivos si no resuelven una necesidad real.
- No introducir dependencias nuevas sin una justificación clara y específica.
- La web es actualmente HTML, CSS y JavaScript sin framework ni proceso de build. No cambiar esta base incidentalmente.
- Si una solución requiere backend, almacenamiento, email o despliegue, no elegir proveedor ni arquitectura sin que la tarea lo defina.
- Nunca introducir secretos, credenciales, API keys, tokens o datos personales reales en archivos versionados.

## 5. Frontend, diseño y experiencia

- Mantener la identidad visual actual: presentación oscura y premium, acentos dorados, tipografía editorial y sensación profesional orientada a estudios indie.
- Usar `css/styles.css` como fuente de verdad visual mientras siga siendo la arquitectura vigente.
- Reutilizar variables, espaciados, tarjetas, botones, animaciones y patrones existentes antes de crear variantes nuevas.
- Mantener coherencia entre Home, páginas de negocio, Projects, páginas de proyecto, Process, Budget y Resources.
- Conservar funcionamiento responsive en escritorio y móvil. Probar los breakpoints afectados.
- Respetar `prefers-reduced-motion` en interacciones y animaciones nuevas.
- Mantener navegación por teclado, foco visible, etiquetas accesibles y semántica HTML razonable.
- No sacrificar claridad, rendimiento o accesibilidad por efectos visuales.
- Tratar rutas y nombres de archivos como sensibles a mayúsculas y minúsculas, aunque el entorno local sea Windows.
- Tener en cuenta que el repositorio contiene medios pesados. Evitar duplicarlos y no cargar recursos grandes de forma innecesaria.

## 6. Contenido y veracidad

- Consultar `docs/CONTENT.md` antes de modificar portfolio, cifras, atribuciones, testimonios o casos de proyecto.
- No presentar demos de portfolio como trabajos de cliente.
- No presentar proyectos cancelados, privados o no publicados como juegos lanzados.
- Describir con precisión la contribución de Roger: música, sound design, ambos, trailer, implementación o colaboración parcial según lo confirmado.
- No inventar nombres de clientes, títulos, métricas, testimonios, permisos, resultados comerciales o créditos.
- Los proyectos con nombre o permiso pendiente deben permanecer sin publicar hasta confirmación del usuario.
- Mantener game audio para videojuegos indie como posicionamiento principal. La experiencia en apps, cortometrajes, trailers y otros formatos audiovisuales puede aparecer como experiencia secundaria real.
- La web pública utiliza actualmente inglés. No mezclar idiomas accidentalmente en una misma experiencia.

## 7. Reglas específicas del estimador

- Leer `docs/ESTIMATOR.md` antes de cambiar preguntas, rutas, precios, resultados o captación de leads.
- `js/estimator.js` es la fuente de verdad del cálculo.
- `js/budget-estimator-ui.js` es la experiencia guiada y no debe duplicar fórmulas de precios.
- Mantener separadas la lógica de cálculo, la presentación y una futura integración de backend.
- No modificar tarifas, multiplicadores, mínimos o benchmark sin una tarea explícita que defina el cambio.
- No describir el benchmark de mercado como estadísticamente validado si no se aporta una fuente o calibración externa.
- Preservar el principio de mostrar valor antes de pedir datos personales.
- No implementar almacenamiento o envío de datos personales sin definir finalidad, privacidad, seguridad y proveedor.

## 8. Comprobaciones

No existe todavía una suite automatizada ni un sistema de build. Para cambios relevantes:

- Ejecutar comprobaciones de sintaxis sobre los JavaScript afectados, por ejemplo `node --check`.
- Revisar rutas internas, nombres de archivos y recursos referenciados.
- Probar manualmente las páginas y recorridos afectados cuando el entorno lo permita.
- Comprobar al menos escritorio y móvil para cambios de interfaz.
- Verificar que las páginas no generen errores de consola nuevos.
- En el estimador, probar las rutas de Music Only, Sound Design Only, Music + Sound Design, Trailer Audio y Not Sure Yet cuando se altere el flujo.
- No afirmar que algo se ha probado si no se ha ejecutado la comprobación correspondiente.

La validación debe ser proporcional al riesgo. Si una comprobación no puede realizarse, indicarlo claramente al entregar la tarea.

## 9. Git, ramas y publicación

- `main` debe representar una versión estable.
- Los cambios pequeños y seguros pueden realizarse en `main` cuando el usuario así lo decida.
- Para funciones grandes, experimentales o con riesgo, proponer una rama independiente; usar el prefijo `codex/` salvo indicación distinta.
- No crear ramas, hacer commits, push, merge, pull requests o despliegues salvo que se solicite expresamente.
- No reescribir historial ni ejecutar operaciones destructivas de Git.

## 10. Entrega de cada tarea

Al finalizar:

- Resumir el resultado, no solo el proceso.
- Enumerar los archivos modificados.
- Explicar las comprobaciones ejecutadas y su resultado.
- Señalar riesgos, supuestos, decisiones pendientes o comportamientos no verificados.
- Informar de contradicciones importantes encontradas en código, documentación o petición.
- No ocultar trabajo adicional que siga siendo necesario.

