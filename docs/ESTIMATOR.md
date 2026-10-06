# Game Audio Budget Estimator

## Responsabilidad dentro de MyWeb

El Game Audio Budget Estimator es una herramienta de planificación dentro de MyWeb. Ayuda a equipos indie a comprender un rango preliminar de presupuesto y a explicar mejor su scope. Su objetivo comercial es facilitar una conversación informada con Roger, no sustituir un presupuesto real ni convertir toda la web en una calculadora.

El resultado es orientativo. Un presupuesto real requiere revisar materiales, gameplay, alcance y condiciones concretas.

## Implementación actual

- `budget.html`: estructura de la página, progreso, formulario dinámico y contenedor de resultados.
- `js/estimator.js`: motor de cálculo y fuente de verdad de precios.
- `js/budget-estimator-ui.js`: pasos, controles, estado, animaciones y presentación del resultado.
- `css/styles.css`: estilos visuales del estimador junto con el resto de la web.

La interfaz guarda respuestas durante la sesión mediante `sessionStorage`. El motor también expone datos de depuración para desarrollo, pero estos no forman parte de la experiencia pública.

## Principios confirmados de experiencia

- El cuestionario debe adaptar sus pasos al servicio seleccionado.
- No debe preguntar sobre módulos irrelevantes.
- Debe explicar términos especializados con ayudas breves.
- Debe aceptar respuestas aproximadas o “Not sure yet” y reflejar esa incertidumbre en el rango.
- Debe distinguir trabajo creativo, técnico y comercial.
- Debe mostrar tanto un benchmark profesional como el rango estimado de Roger.
- Debe mostrar valor antes de pedir datos personales.
- Usar la calculadora y ver el resultado no obliga a dejar nombre o email.

### Captación posterior al resultado

La dirección de UX acordada es:

1. El visitante completa el estimador de forma anónima.
2. Ve inmediatamente el diagnóstico y los rangos principales.
3. Después puede pulsar una CTA equivalente a `Ask Roger to Review This Estimate`.
4. Para solicitar esa revisión se pedirán:
   - Nombre.
   - Email.
   - Estudio o equipo, opcional.
5. Roger recibirá los datos de contacto, todas las respuestas y el resultado calculado.
6. La interfaz confirmará que la solicitud se ha recibido.
7. Roger responderá personalmente por email, con una expectativa de 24–48 horas.
8. No se enviarán newsletters ni marketing automatizado por esta acción.
9. Quien solo calcule y no solicite revisión no debe recibir correos.

El copy debe ser honesto: no debe prometer “ningún correo” si Roger va a responder personalmente. Una dirección de copy confirmada conceptualmente es explicar que no habrá newsletters ni marketing automatizado y que los datos se usarán para revisar y responder a la estimación.

El backend, destinatario, proveedor de email, almacenamiento, retención y texto legal exacto todavía no están decididos.

## Enrutamiento de pasos

Todos los recorridos comienzan con Project Context y terminan con Technical Delivery, Commercial Factors, Available Materials y Generate Estimate.

| Selección de servicio | Music Scope | Sound Design Scope | Trailer Audio |
|---|---:|---:|---:|
| Music Only | Sí | No | No |
| Sound Design Only | No | Sí | No |
| Music + Sound Design | Sí | Sí | No |
| Game Trailer Audio | No | No | Sí |
| Full Audio Package | Sí | Sí | No |
| Not Sure Yet | Sí | Sí | No |

El comportamiento actual de Full Audio Package no incluye el módulo de trailer. Si en el futuro debe incluirlo, será una decisión explícita; no debe cambiarse por inferencia.

## Preguntas y opciones actuales

### 1. Project Context

- Tipo de servicio.
- Etapa: Prototype, Vertical Slice, Demo, Trailer / Marketing, Small Indie, Medium Indie o Full Release.
- Género: Platformer, RPG, Roguelike, Simulation / Management, Puzzle, Horror, Narrative / Adventure, Action, Strategy, Survival, Cozy, Racing, Shooter, Metroidvania, Visual Novel u Other.
- Complejidad de gameplay: Simple, Moderate, Systemic, Combat-heavy o Content-heavy.
- Objetivo: Internal prototype, Publisher pitch, Steam demo, Festival submission, Steam Next Fest, Release o Marketing campaign.
- Plataformas: PC, Console, Mobile, Web, Multi-platform o Not sure yet.

### 2. Music Scope

- Cantidad de música: Not sure, 0–5, 5–10, 10–15, 15–20, 20–30, 30–45, 45–60 o 60+ minutos.
- Comportamiento: Linear cue, Simple loop, Loop with variations, Stems / layers o Adaptive music.
- Nivel de producción: Simple indie, Premium indie, Cinematic / orchestral, Hybrid / epic o Highly stylized.
- Referencias: None, General references, Commented references, Temp track o Locked direction.
- Estados: Menu, Exploration, Hub, Combat, Boss, Stealth / tension, Puzzle, Cutscenes, Victory / defeat y Credits.
- Funciones adaptativas: Stingers, Transitions, Intensity layers, Combat states, Health / risk layers y Vertical remixing.

### 3. Sound Design Scope

- Cantidad aproximada: Not sure, 1–25, 25–50, 50–100, 100–175, 175–300 o 300+ SFX.
- Profundidad: Essential, Polished, Detailed with variations, Systemic o Hero sounds.
- Complejidad de combate.
- Complejidad de UI.
- Scope de ambientes.
- Scope cinematográfico.
- Familias: UI, Movement, Jump / dash, Weapons, Impacts / damage, Enemies, Abilities / magic, Pickups / rewards, Inventory / crafting, Ambience, Cinematics, Notifications y Environment interactions.

Cuando el usuario no conoce la cantidad, la interfaz ofrece un enlace a un futuro SFX Scope Estimator. La página de destino aún no existe.

### 4. Trailer Audio

- Tipo: Teaser, Announcement, Steam page, Launch, Social cutdowns o Campaign bundle.
- Trabajo de audio: SFX only, Music edit / sync, SFX + final mix, Full audio post, Custom music + trailer SFX + mix o Campaign package.
- Estado del montaje: No cut, Rough cut, Locked cut o Multiple versions.

### 5. Technical Delivery

- Profundidad de entrega: Audio files, Production ready o Technical support.
- Motor: Unity, Unreal, Godot, Custom o Not sure.
- Middleware: None, FMOD, Wwise o Not sure.
- Implementación: Client team, Roger supports, Roger implements o Not sure.
- QA: None, Light, Standard o Launch polish.

### 6. Commercial Factors

- Derechos: Standard license, Exclusive license, Work-for-hire / buyout o Not sure.
- Uso de soundtrack.
- Uso de marketing.
- Rondas de feedback.
- Estructura de aprobación.
- Presión de calendario: Flexible, Normal, Fixed milestone, Rush, Extreme rush o Not sure.

### 7. Available Materials

- Claridad del scope: Clear, Partially clear, Rough o Not sure.
- Materiales: Playable build, Gameplay video, Locked trailer cut, Rough trailer cut, Asset list, Moodboard, Commented music references, General references o No clear materials.

## Lógica de cálculo actual

### Dos modelos

El motor calcula el mismo scope con dos configuraciones:

- `roger`: modelo de precios de Roger orientado a producción indie.
- `market`: `Professional Market Benchmark` con importes y multiplicadores más altos.

El benchmark es una calibración interna del código. No hay documentación externa en el repositorio que demuestre que sea una medición estadística del mercado actual.

### Línea base

Parte de la etapa del proyecto y aplica factores por tipo de servicio y objetivo. Release y marketing pueden elevar el baseline; un prototipo interno pequeño puede recibir un ajuste especial.

### Música

La contribución musical considera:

- Minutos seleccionados o inferidos a partir de estados.
- Tarifa por nivel de producción.
- Dispersión low / mid / high.
- Comportamiento lineal, loop, variaciones, stems o sistema adaptativo.
- Funciones adaptativas adicionales.
- Trabajo técnico asociado.
- Ajuste por volumen para scopes largos.
- Comparación con minutos típicos para la etapa.

Por tanto, no es una simple multiplicación fija de minutos por una única tarifa.

### Sound design

La contribución de SFX considera:

- Cantidad elegida o inferida desde las familias de sistemas.
- Dificultad relativa de cada familia.
- Complejidad de combate, UI, ambientes, cinemáticas y gameplay.
- Profundidad y variaciones requeridas.
- Overhead de sistemas complejos o scope provisional.

Las familias no pesan igual. Armas, impactos, enemigos o habilidades suelen tener mayor dificultad que elementos sencillos de UI o recompensas.

### Trailer

Parte de un rango por tipo de trabajo y lo ajusta según el estado del montaje, número de versiones, campaña y urgencia.

### Técnica

Suma costes de entrega, QA, implementación y middleware, con ajustes por plataforma y trabajo de motor.

La mera presencia de FMOD o Wwise no debe generar coste. Solo aumenta el alcance cuando Roger participa realmente en soporte o implementación.

### Factores comerciales

- Derechos se aplican por separado a música, SFX y trailer.
- Soundtrack se aplica a música.
- Marketing se aplica a música y trailer.
- Revisiones, aprobaciones, urgencia e incertidumbre forman un multiplicador global sobre el subtotal ya ajustado.

No debe describirse este último grupo como si todos los factores estuvieran aislados por componente.

### Complejidad, confianza y rango

El motor calcula scores de música, sound design, trailer, técnica, comercial e incertidumbre. También calcula una confianza heurística según claridad, materiales y respuestas desconocidas.

La confianza puede ser Low, Medium o High. No es una probabilidad estadística.

El rango final:

- Respeta mínimos profesionales.
- Se amplía cuando hay incertidumbre, urgencia o alta complejidad.
- Controla ratios excesivos entre mínimo y máximo.
- Redondea hacia fuera y mantiene una anchura útil.

## Casos especiales

### Early Validation Prototype

Existe un ajuste para un prototipo interno pequeño, de scope reducido, implementación por el cliente, QA mínimo, calendario flexible y equipo pequeño. Solo se activa para Music Only o SFX Only bajo condiciones estrictas.

### Scope desconocido

Si faltan minutos, cantidad de SFX, materiales, derechos o calendario, el motor puede inferir parte del scope, reducir la confianza y ampliar el rango.

### Custom quote

El resultado marca internamente que puede requerirse presupuesto personalizado cuando el rango de Roger es extremadamente alto o la complejidad total supera el umbral configurado.

## Resultado generado por el motor

El objeto final contiene:

- Perfil y diagnóstico del proyecto.
- Rango de Roger.
- Benchmark profesional.
- Confianza y explicación.
- Contenido incluido, separado en Creative, Production, Delivery y Technical.
- Principales price drivers.
- Información que falta.
- Siguiente paso sugerido.
- Flags y scores.
- Desglose interno y datos de depuración.

## Resultado visible actualmente

La UI guiada muestra:

- Project Diagnosis.
- Typical Professional Range.
- Your Estimated Project Range.
- What's Included.
- Next Step y enlace a contacto.

Aunque el motor calcula confidence, price drivers y missing information, la UI actual no los muestra. Existen funciones `renderDrivers()` y `renderMissing()`, pero no están conectadas a `renderResult()`.

## Decisiones pendientes

- Backend y proveedor de envío.
- Dirección de destino para notificaciones.
- Formato exacto del email interno y de una posible confirmación transaccional.
- Política de privacidad, base legal, retención y eliminación de datos.
- Validación externa y mantenimiento futuro de las tarifas del benchmark.
- Si Full Audio Package debe incluir trailer en el futuro.
- Contenido y comportamiento del SFX Scope Estimator.
- Qué datos detallados del motor conviene mostrar públicamente además de los rangos.

