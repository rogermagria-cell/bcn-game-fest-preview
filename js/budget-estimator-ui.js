/* =========================================================
  BUDGET ESTIMATOR UI — GUIDED WEBSITE EXPERIENCE
  UI only. estimator.js remains the source of truth.
========================================================== */

(() => {
  const engine = window.GameAudioBudgetEstimator;

  const app = document.getElementById("budgetEstimatorApp");
  const form = document.getElementById("budgetEstimatorForm");
  const stepCard = document.getElementById("budgetStepCard");
  const stepContent = document.getElementById("budgetStepContent");
  const progress = document.getElementById("budgetProgress");
  const progressTrack = document.getElementById("budgetProgressTrack");
  const progressSteps = document.getElementById("budgetProgressSteps");
  const progressMobile = document.getElementById("budgetProgressMobile");
  const resultEl = document.getElementById("budgetResult");

  if (!engine || !app || !form || !stepCard || !stepContent || !progress || !progressTrack || !progressSteps || !progressMobile || !resultEl) {
    return;
  }

  const STORAGE_KEY = "roger_budget_estimator_guided_state_v1";
  const CONTACT_HREF = "index.html#contact";

  const arrayFields = new Set([
    "musicStates",
    "adaptiveFeatures",
    "sfxFamilies",
    "availableMaterials"
  ]);

  const defaults = {
    projectStage: "vertical_slice",
    gameGenre: "action",
    audioNeed: "music_sfx",
    gameplayComplexity: "moderate",
    projectGoal: "steam_demo",
    targetPlatforms: "pc",

    musicAmountBand: "10_15_min",
    musicBehavior: "seamless_loop_variations",
    musicProductionLevel: "premium_indie",
    musicReferencesAvailable: "general_references",
    musicStates: ["menu", "exploration", "combat"],
    adaptiveFeatures: [],

    sfxQuantityBand: "50_100",
    sfxDepth: "polished",
    combatComplexity: "moderate",
    uiComplexity: "full_hud",
    ambienceScope: "few_biomes",
    cinematicScope: "none",
    sfxFamilies: [
      "ui",
      "movement",
      "jump_dash",
      "impacts_damage",
      "enemies",
      "pickups_rewards",
      "ambience"
    ],

    trailerType: "none",
    trailerAudioScope: "none",
    trailerCutStatus: "none",

    deliveryDepth: "production_ready",
    engine: "unity",
    middleware: "none",
    whoImplements: "roger_supports",
    qaSupport: "light",

    rightsModel: "standard_license",
    soundtrackUsage: "none",
    marketingUsage: "none",
    revisionRounds: "two",
    approvalStructure: "small_team",
    timelinePressure: "normal",

    scopeClarity: "partially_clear",
    availableMaterials: ["gameplay_video", "moodboard", "general_references"]
  };

let state = loadState();
let currentIndex = 0;
let lastDirection = "next";
let lastResult = null;
let activeDropdown = null;

  const projectStep = {
    id: "project",
    title: "Project Context",
    intro: "Start with the essentials. This controls which questions appear next.",
    groups: [
      {
        title: "Service Type",
        fields: [
          {
            name: "audioNeed",
            label: "What kind of audio support do you need?",
            required: true,
            type: "service",
            wide: true,
            options: [
              { value: "music_only", label: "Music Only" },
              { value: "sfx_only", label: "Sound Design Only" },
              { value: "music_sfx", label: "Music + Sound Design" },
              { value: "trailer_audio", label: "Game Trailer Audio" },
              { value: "full_audio_package", label: "Full Audio Package" },
              { value: "not_sure", label: "Not Sure Yet" }
            ]
          }
        ]
      },
      {
        title: "Project Basics",
        fields: [
          {
            name: "projectStage",
            label: "Project stage",
            required: true,
            type: "pills",
            options: [
              ["prototype", "Prototype"],
              ["vertical_slice", "Vertical Slice"],
              ["demo", "Demo"],
              ["trailer", "Trailer / Marketing"],
              ["small_indie", "Small Indie"],
              ["medium_indie", "Medium Indie"],
              ["full_release", "Full Release"]
            ]
          },
          {
            name: "gameGenre",
            label: "Game genre",
            required: true,
            type: "select",
            options: [
              ["platformer", "Platformer"],
              ["rpg", "RPG"],
              ["roguelike", "Roguelike / Roguelite"],
              ["simulation_management", "Simulation / Management"],
              ["puzzle", "Puzzle"],
              ["horror", "Horror"],
              ["narrative_adventure", "Narrative / Adventure"],
              ["action", "Action"],
              ["strategy", "Strategy"],
              ["survival", "Survival"],
              ["cozy", "Cozy"],
              ["racing", "Racing"],
              ["shooter", "Shooter"],
              ["metroidvania", "Metroidvania"],
              ["visual_novel", "Visual Novel"],
              ["other", "Other"]
            ]
          },
          {
            name: "gameplayComplexity",
            label: "Gameplay complexity",
            type: "select",
            tip: "A broad sense of how many interacting gameplay systems the audio has to support.",
            options: [
              ["simple", "Simple"],
              ["moderate", "Moderate"],
              ["systemic", "Systemic"],
              ["combat_heavy", "Combat-heavy"],
              ["content_heavy", "Content-heavy"]
            ]
          },
          {
            name: "projectGoal",
            label: "Project goal",
            type: "select",
            options: [
              ["internal_prototype", "Internal prototype"],
              ["publisher_pitch", "Publisher pitch"],
              ["steam_demo", "Steam demo"],
              ["festival_submission", "Festival submission"],
              ["next_fest", "Steam Next Fest"],
              ["release", "Release"],
              ["marketing_campaign", "Marketing campaign"]
            ]
          },
          {
            name: "targetPlatforms",
            label: "Target platforms",
            type: "select",
            options: [
              ["pc", "PC"],
              ["console", "Console"],
              ["mobile", "Mobile"],
              ["web", "Web"],
              ["multi_platform", "Multi-platform"],
              ["unknown", "Not sure yet"]
            ]
          }
        ]
      }
    ]
  };

  const musicStep = {
    id: "music",
    title: "Music Scope",
    intro: "Original music amount, behavior and where it appears in the game.",
    groups: [
      {
        title: "Music Scope",
        fields: [
          {
            name: "musicAmountBand",
            label: "Amount of original music",
            type: "pills",
            tip: "A rough duration range is enough for a preliminary estimate.",
            options: [
              ["unknown", "Not sure yet"],
              ["0_5_min", "0–5 min"],
              ["5_10_min", "5–10 min"],
              ["10_15_min", "10–15 min"],
              ["15_20_min", "15–20 min"],
              ["20_30_min", "20–30 min"],
              ["30_45_min", "30–45 min"],
              ["45_60_min", "45–60 min"],
              ["60_plus_min", "60+ min"]
            ]
          },
          {
            name: "musicBehavior",
            label: "Music behavior",
            type: "select",
            tip: "Dynamic or adaptive music changes with gameplay instead of behaving like one fixed audio file.",
            options: [
              ["linear", "Linear cue"],
              ["simple_loop", "Simple loop"],
              ["seamless_loop_variations", "Loop with variations"],
              ["layered_stems", "Stems / layers"],
              ["adaptive_system", "Adaptive music"]
            ]
          },
          {
            name: "musicProductionLevel",
            label: "Music production level",
            type: "select",
            options: [
              ["simple_indie", "Simple indie"],
              ["premium_indie", "Premium indie"],
              ["cinematic_orchestral", "Cinematic / orchestral"],
              ["hybrid_epic", "Hybrid / epic"],
              ["highly_stylized", "Highly stylized"]
            ]
          },
          {
            name: "musicReferencesAvailable",
            label: "References available",
            type: "select",
            options: [
              ["none", "None yet"],
              ["general_references", "General references"],
              ["commented_references", "Commented references"],
              ["temp_track", "Temp track"],
              ["locked_direction", "Locked direction"]
            ]
          }
        ]
      },
      {
        title: "Where Music Appears",
        fields: [
          {
            name: "musicStates",
            type: "checks",
            options: [
              ["menu", "Menu / title"],
              ["exploration", "Exploration"],
              ["hub", "Hub / safe area"],
              ["combat", "Combat"],
              ["boss", "Boss"],
              ["stealth_tension", "Stealth / tension"],
              ["puzzle", "Puzzle"],
              ["cutscenes", "Cutscenes"],
              ["victory_defeat", "Victory / defeat"],
              ["credits", "Credits"]
            ]
          }
        ]
      },
      {
        title: "Dynamic Features",
        tip: "Only select these when music needs to react to gameplay with extra musical assets or logic.",
        fields: [
          {
            name: "adaptiveFeatures",
            type: "checks",
            options: [
              ["stingers", "Stingers"],
              ["transitions", "Transitions"],
              ["intensity_layers", "Intensity layers"],
              ["combat_states", "Combat states"],
              ["health_or_risk_layers", "Health / risk layers"],
              ["vertical_remixing", "Vertical remixing"]
            ]
          }
        ]
      }
    ]
  };

  const sfxStep = {
    id: "sfx",
    title: "Sound Design Scope",
    intro: "Quantity, systems and detail level.",
    groups: [
      {
        title: "Scope",
        fields: [
          {
            name: "sfxQuantityBand",
            label: "Approximate SFX quantity",
            type: "pills",
            wide: true,
            tip: "Unique sound deliverables. Variations of one sound still belong to the same sound idea.",
            options: [
              ["unknown", "I'm not sure"],
              ["1_25", "1–25 SFX"],
              ["25_50", "25–50 SFX"],
              ["50_100", "50–100 SFX"],
              ["100_175", "100–175 SFX"],
              ["175_300", "175–300 SFX"],
              ["300_plus", "300+ SFX"]
            ]
          },
          {
            name: "sfxDepth",
            label: "Sound design depth",
            type: "select",
            tip: "How much variation, detail and system coverage the game's sound effects need.",
            options: [
              ["essential", "Essential"],
              ["polished", "Polished"],
              ["detailed_variations", "Detailed with variations"],
              ["systemic", "Systemic"],
              ["hero", "Hero sounds / highly designed"]
            ]
          }
        ]
      },
      {
        title: "Game Systems",
        fields: [
          {
            name: "combatComplexity",
            label: "Combat complexity",
            type: "select",
            options: [
              ["none", "No combat"],
              ["light", "Light"],
              ["moderate", "Moderate"],
              ["heavy", "Heavy"],
              ["systemic", "Systemic"]
            ]
          },
          {
            name: "uiComplexity",
            label: "UI complexity",
            type: "select",
            options: [
              ["none", "None"],
              ["basic_menu", "Basic menu"],
              ["full_hud", "Full HUD"],
              ["inventory_economy", "Inventory / economy"],
              ["systems_heavy", "Systems-heavy"]
            ]
          },
          {
            name: "ambienceScope",
            label: "Ambience scope",
            type: "select",
            options: [
              ["none", "None"],
              ["one_area", "One area"],
              ["few_biomes", "Few areas / biomes"],
              ["many_biomes", "Many biomes"],
              ["dynamic_world", "Dynamic world ambience"]
            ]
          },
          {
            name: "cinematicScope",
            label: "Cinematic scope",
            type: "select",
            options: [
              ["none", "None"],
              ["few_moments", "Few moments"],
              ["several_scenes", "Several scenes"],
              ["trailer_like", "Trailer-like moments"],
              ["narrative_heavy", "Narrative-heavy"]
            ]
          }
        ]
      },
      {
        title: "Custom Sound Systems",
        fields: [
          {
            name: "sfxFamilies",
            type: "checks",
            options: [
              ["ui", "UI / menus / buttons"],
              ["movement", "Player movement"],
              ["jump_dash", "Jump / dash / traversal"],
              ["weapons", "Weapons"],
              ["impacts_damage", "Impacts / damage"],
              ["enemies", "Enemies"],
              ["abilities_magic", "Abilities / magic"],
              ["pickups_rewards", "Pickups / rewards"],
              ["inventory_crafting", "Inventory / crafting"],
              ["ambience", "Ambience"],
              ["cinematics", "Cinematics"],
              ["notifications", "Notifications / feedback"],
              ["environment_interactions", "Environment interactions"]
            ]
          }
        ]
      }
    ]
  };

  const trailerStep = {
    id: "trailer",
    title: "Trailer Audio",
    intro: "Trailer audio is calculated separately from full-game music and sound design.",
    groups: [
      {
        title: "Trailer Scope",
        fields: [
          {
            name: "trailerType",
            label: "Trailer type",
            type: "select",
            options: [
              ["none", "No trailer-specific scope"],
              ["teaser", "Teaser"],
              ["announcement", "Announcement trailer"],
              ["steam_page", "Steam page trailer"],
              ["launch", "Launch trailer"],
              ["social_cutdowns", "Social cutdowns"],
              ["campaign_bundle", "Campaign bundle"]
            ]
          },
          {
            name: "trailerAudioScope",
            label: "Trailer audio scope",
            type: "select",
            options: [
              ["none", "No trailer-specific scope"],
              ["sound_design_only", "Trailer SFX only"],
              ["music_edit_sync", "Music edit / sync"],
              ["sound_design_mix", "Trailer SFX + final mix"],
              ["full_audio_post", "Full trailer audio post"],
              ["original_music_full_audio", "Custom music + trailer SFX + mix"],
              ["campaign_package", "Campaign package / multiple versions"]
            ]
          },
          {
            name: "trailerCutStatus",
            label: "Trailer cut status",
            type: "select",
            options: [
              ["none", "No trailer cut"],
              ["no_cut", "No cut yet"],
              ["rough_cut", "Rough cut"],
              ["locked_cut", "Locked cut"],
              ["multiple_versions", "Multiple versions"]
            ]
          }
        ]
      }
    ]
  };

  const technicalStep = {
    id: "technical",
    title: "Technical Delivery",
    intro: "Delivery, engine workflow and support level.",
    groups: [
      {
        title: "Delivery",
        fields: [
          {
            name: "deliveryDepth",
            label: "Delivery depth",
            type: "select",
            tip: "How far the audio should be prepared beyond final exports.",
            options: [
              ["audio_files", "Audio files — organized final exports"],
              ["production_ready", "Production ready — assets, variations, naming and notes"],
              ["technical_support", "Technical support — extra help for your game's workflow"]
            ]
          }
        ]
      },
      {
        title: "Engine / Middleware",
        fields: [
          {
            name: "engine",
            label: "Engine",
            type: "select",
            options: [
              ["unity", "Unity"],
              ["unreal", "Unreal"],
              ["godot", "Godot"],
              ["custom", "Custom engine"],
              ["unknown", "Not sure yet"]
            ]
          },
          {
            name: "middleware",
            label: "Middleware",
            type: "select",
            tip: "FMOD and Wwise are tools used to create interactive audio systems.",
            options: [
              ["none", "None / not needed"],
              ["fmod", "FMOD"],
              ["wwise", "Wwise"],
              ["unknown", "Not sure yet"]
            ]
          }
        ]
      },
      {
        title: "Implementation / QA",
        fields: [
          {
            name: "whoImplements",
            label: "Implementation support",
            type: "select",
            tip: "Implementation support means helping prepare, connect or test audio inside the game workflow.",
            options: [
              ["client_team", "My team handles implementation"],
              ["roger_supports", "Roger provides support / notes"],
              ["roger_implements", "Roger helps implement directly"],
              ["unknown", "Not sure yet"]
            ]
          },
          {
            name: "qaSupport",
            label: "QA / polish support",
            type: "select",
            options: [
              ["none", "None"],
              ["light", "Light check"],
              ["standard", "Standard support"],
              ["launch_polish", "Launch polish"]
            ]
          }
        ]
      }
    ]
  };

  const commercialStep = {
    id: "commercial",
    title: "Commercial Factors",
    intro: "Usage, feedback process and timeline.",
    groups: [
      {
        title: "Usage",
        fields: [
          {
            name: "rightsModel",
            label: "Rights / licensing",
            type: "select",
            tip: "A license defines how the music or audio can be used.",
            options: [
              ["standard_license", "Standard project license"],
              ["exclusive_license", "Exclusive license"],
              ["work_for_hire_buyout", "Full buyout / work-for-hire"],
              ["unknown", "Not sure yet"]
            ]
          },
          {
            name: "soundtrackUsage",
            label: "Soundtrack usage",
            type: "select",
            tip: "Choose this if music may be released separately as a soundtrack.",
            options: [
              ["none", "No separate soundtrack use"],
              ["included_promo_only", "Promo use only"],
              ["commercial_soundtrack", "Commercial soundtrack"],
              ["unknown", "Not sure yet"]
            ]
          },
          {
            name: "marketingUsage",
            label: "Marketing usage",
            type: "select",
            options: [
              ["none", "No extra marketing use"],
              ["trailer_only", "Trailer only"],
              ["full_campaign", "Full campaign"],
              ["ads_paid_media", "Paid ads / broad campaign"],
              ["unknown", "Not sure yet"]
            ]
          }
        ]
      },
      {
        title: "Process",
        fields: [
          {
            name: "revisionRounds",
            label: "Feedback rounds",
            type: "select",
            tip: "A feedback round is one structured pass of notes after a delivery or milestone.",
            options: [
              ["one", "One round"],
              ["two", "Two rounds"],
              ["three", "Three rounds"],
              ["four_plus", "Four or more"],
              ["unknown", "Not sure yet"]
            ]
          },
          {
            name: "approvalStructure",
            label: "Approval process",
            type: "select",
            tip: "More approval layers can mean more alignment and revision time.",
            options: [
              ["solo_founder", "One decision maker"],
              ["small_team", "Small team"],
              ["multiple_stakeholders", "Several stakeholders"],
              ["publisher_client", "Publisher / external approval"],
              ["unknown", "Not sure yet"]
            ]
          },
          {
            name: "timelinePressure",
            label: "Timeline",
            type: "select",
            options: [
              ["flexible", "Flexible"],
              ["normal", "Normal production timeline"],
              ["fixed_milestone", "Fixed milestone"],
              ["rush", "Rush"],
              ["extreme_rush", "Extreme rush"],
              ["unknown", "Not sure yet"]
            ]
          }
        ]
      }
    ]
  };

  const materialsStep = {
    id: "materials",
    title: "Available Materials",
    intro: "What do you already have?",
    groups: [
      {
        title: "Scope Clarity",
        fields: [
          {
            name: "scopeClarity",
            label: "Scope clarity",
            type: "pills",
            options: [
              ["clear", "Clear"],
              ["partially_clear", "Partially clear"],
              ["rough", "Rough"],
              ["unknown", "Not sure yet"]
            ]
          }
        ]
      },
      {
        title: "Materials",
        fields: [
          {
            name: "availableMaterials",
            type: "checks",
            options: [
              ["playable_build", "Playable build"],
              ["gameplay_video", "Gameplay video"],
              ["locked_trailer_cut", "Locked trailer cut"],
              ["rough_trailer_cut", "Rough trailer cut"],
              ["asset_list", "Asset list"],
              ["moodboard", "Moodboard / concept art"],
              ["commented_music_references", "Commented music references"],
              ["general_references", "General references"],
              ["no_clear_materials", "No clear materials yet"]
            ]
          }
        ]
      }
    ]
  };

  const resultStep = {
    id: "result",
    title: "Generate Estimate",
    intro: "Generate a preliminary range using the approved estimator engine.",
    groups: []
  };

  function loadState() {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (!stored) return clone(defaults);

      const parsed = JSON.parse(stored);

      return {
        ...clone(defaults),
        ...parsed,
        musicStates: Array.isArray(parsed.musicStates) ? parsed.musicStates : defaults.musicStates,
        adaptiveFeatures: Array.isArray(parsed.adaptiveFeatures) ? parsed.adaptiveFeatures : defaults.adaptiveFeatures,
        sfxFamilies: Array.isArray(parsed.sfxFamilies) ? parsed.sfxFamilies : defaults.sfxFamilies,
        availableMaterials: Array.isArray(parsed.availableMaterials) ? parsed.availableMaterials : defaults.availableMaterials
      };
    } catch {
      return clone(defaults);
    }
  }

  function saveState() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Session storage is only a UX enhancement.
    }
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function getRouting() {
    if (engine._private && typeof engine._private.getServiceRouting === "function") {
      return engine._private.getServiceRouting(state.audioNeed);
    }

    return {
      musicActive: ["music_only", "music_sfx", "full_audio_package", "not_sure"].includes(state.audioNeed),
      sfxActive: ["sfx_only", "music_sfx", "full_audio_package", "not_sure"].includes(state.audioNeed),
      trailerActive: state.audioNeed === "trailer_audio",
      scopeLessDefined: state.audioNeed === "not_sure"
    };
  }

  function getSteps() {
    const routing = getRouting();
    const steps = [projectStep];

    if (routing.musicActive) steps.push(musicStep);
    if (routing.sfxActive) steps.push(sfxStep);
    if (routing.trailerActive) steps.push(trailerStep);

    steps.push(technicalStep, commercialStep, materialsStep, resultStep);

    return steps;
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalizeOption(option) {
    if (Array.isArray(option)) {
      return {
        value: option[0],
        label: option[1]
      };
    }

    return option;
  }

  function render() {
    const steps = getSteps();

    if (currentIndex > steps.length - 1) {
      currentIndex = steps.length - 1;
    }

    renderProgress(steps);
    renderStep(steps[currentIndex], steps);
  }

  function renderProgress(steps) {
    const total = steps.length;
    const current = currentIndex + 1;
    const percent = total > 1 ? ((current - 1) / (total - 1)) * 100 : 0;

    progressTrack.style.setProperty("--budget-progress", `${percent}%`);
    progressMobile.textContent = `Step ${current} of ${total}`;

    progressSteps.innerHTML = steps.map((step, index) => {
      const status = index === currentIndex
        ? "is-active"
        : index < currentIndex
          ? "is-complete"
          : "";

      return `
        <div class="budget-progress-step ${status}">
          <span>${String(index + 1).padStart(2, "0")}</span>
          ${escapeHTML(shortStepTitle(step.title))}
        </div>
      `;
    }).join("");
  }

  function shortStepTitle(title) {
    return title
      .replace("Project Context", "Project")
      .replace("Technical Delivery", "Technical")
      .replace("Commercial Factors", "Commercial")
      .replace("Available Materials", "Materials")
      .replace("Generate Estimate", "Result");
  }

  function renderStep(step, steps) {
    const stepNumber = String(currentIndex + 1).padStart(2, "0");
    const total = String(steps.length).padStart(2, "0");
    const isResultStep = step.id === "result";

    stepContent.className = `budget-step-content is-entering-${lastDirection}`;

    stepContent.innerHTML = `
      <div class="budget-step-kicker">
        STEP ${stepNumber}
        <span>/</span>
        ${total}
      </div>

      <h2 class="budget-step-title">${escapeHTML(step.title)}</h2>

      <p class="budget-step-intro">${escapeHTML(step.intro)}</p>

      ${
        isResultStep
          ? renderGenerateStep()
          : step.groups.map(renderGroup).join("")
      }

      <div class="budget-error" id="budgetStepError" hidden></div>

      ${renderActions(isResultStep)}
    `;

    bindControls();
    initCustomSelects();
    bindActions();

    requestAnimationFrame(() => {
      stepContent.classList.remove(`is-entering-${lastDirection}`);
    });
  }

  function renderGroup(group) {
    return `
      <section class="budget-group">
        <span class="budget-group-title">
          ${escapeHTML(group.title)}
          ${group.tip ? renderTip(group.tip) : ""}
        </span>

        <div class="budget-fields two">
          ${group.fields.map(renderField).join("")}
          ${group.fields.some((field) => field.name === "sfxQuantityBand") ? renderSfxHelper() : ""}
        </div>
      </section>
    `;
  }

  function renderField(field) {
    if (field.type === "service") return renderServiceField(field);
    if (field.type === "pills") return renderPillField(field);
    if (field.type === "checks") return renderCheckField(field);
    return renderSelectField(field);
  }

  function renderFieldLabel(field) {
    if (!field.label) return "";

    return `
      <label for="budget-${escapeHTML(field.name)}">
        ${escapeHTML(field.label)}
        ${field.required ? `<span class="budget-required">*</span>` : ""}
        ${field.tip ? renderTip(field.tip) : ""}
      </label>
    `;
  }

  function renderTip(tip) {
    return `
      <button class="budget-tip" type="button" aria-label="More information" data-tip="${escapeHTML(tip)}">
        i
      </button>
    `;
  }

  function renderSelectField(field) {
    const value = state[field.name];

    return `
      <div class="budget-field ${field.wide ? "is-wide" : ""}">
        ${renderFieldLabel(field)}
        <div class="budget-select-wrap">
          <select
            id="budget-${escapeHTML(field.name)}"
            name="${escapeHTML(field.name)}"
            class="budget-native-select"
            data-budget-field="${escapeHTML(field.name)}"
          >
            ${field.options.map((option) => {
              const item = normalizeOption(option);

              return `
                <option value="${escapeHTML(item.value)}" ${item.value === value ? "selected" : ""}>
                  ${escapeHTML(item.label)}
                </option>
              `;
            }).join("")}
          </select>
        </div>
      </div>
    `;
  }

  function renderServiceField(field) {
    const value = state[field.name];

    return `
      <div class="budget-field is-wide">
        ${renderFieldLabel(field)}

        <div class="budget-service-grid">
          ${field.options.map((option) => {
            const item = normalizeOption(option);

            return `
              <label class="budget-service-card">
                <input
                  type="radio"
                  name="${escapeHTML(field.name)}"
                  value="${escapeHTML(item.value)}"
                  data-budget-field="${escapeHTML(field.name)}"
                  ${item.value === value ? "checked" : ""}
                >
                <strong>${escapeHTML(item.label)}</strong>
              </label>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  function renderPillField(field) {
    const value = state[field.name];

    return `
      <div class="budget-field ${field.wide ? "is-wide" : ""}">
        ${renderFieldLabel(field)}

        <div class="budget-pill-group">
          ${field.options.map((option) => {
            const item = normalizeOption(option);

            return `
              <label class="budget-pill">
                <input
                  type="radio"
                  name="${escapeHTML(field.name)}"
                  value="${escapeHTML(item.value)}"
                  data-budget-field="${escapeHTML(field.name)}"
                  ${item.value === value ? "checked" : ""}
                >
                <span>${escapeHTML(item.label)}</span>
              </label>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  function renderCheckField(field) {
    const values = Array.isArray(state[field.name]) ? state[field.name] : [];

    return `
      <div class="budget-field is-wide">
        <div class="budget-check-grid">
          ${field.options.map((option) => {
            const item = normalizeOption(option);

            return `
              <label class="budget-check">
                <input
                  type="checkbox"
                  name="${escapeHTML(field.name)}"
                  value="${escapeHTML(item.value)}"
                  data-budget-field="${escapeHTML(field.name)}"
                  ${values.includes(item.value) ? "checked" : ""}
                >
                <span>${escapeHTML(item.label)}</span>
              </label>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  function renderSfxHelper() {
    const visible = state.sfxQuantityBand === "unknown";

    return `
      <article class="budget-sfx-helper ${visible ? "is-visible" : ""}" id="budgetSfxHelper">
        <div class="budget-sfx-helper-content">
          <small>Interactive Tool</small>
          <strong>Not sure how many SFX your game needs?</strong>
          <p>Estimate the approximate sound design scope based on your game's systems.</p>
          <a href="game-sfx-scope-estimator.html">
            Estimate My SFX Scope <i aria-hidden="true">→</i>
          </a>
        </div>
      </article>
    `;
  }

  function renderGenerateStep() {
    const routing = getRouting();
    const active = [];

    if (routing.musicActive) active.push("Music");
    if (routing.sfxActive) active.push("Sound Design");
    if (routing.trailerActive) active.push("Trailer Audio");

    return `
      <article class="budget-sfx-helper is-visible">
        <div class="budget-sfx-helper-content">
          <small>Estimate Ready</small>
          <strong>${escapeHTML(active.length ? active.join(" + ") : "Project Audio")} scope selected</strong>
          <p>Generate your preliminary project diagnosis, professional benchmark, Roger estimate, included value and confidence level.</p>
        </div>
      </article>
    `;
  }

  function renderActions(isResultStep) {
    return `
      <div class="budget-actions">
        <div class="budget-actions-left">
          ${
            currentIndex > 0
              ? `<button class="budget-button" type="button" data-budget-back>← Back</button>`
              : ""
          }
        </div>

        <div class="budget-actions-right">
          ${
            isResultStep
              ? `<button class="budget-button primary" type="button" data-budget-generate>Generate My Estimate</button>`
              : `<button class="budget-button primary" type="button" data-budget-next>Continue →</button>`
          }
        </div>
      </div>
    `;
  }

  function bindControls() {
    stepContent.querySelectorAll("[data-budget-field]").forEach((control) => {
      control.addEventListener("change", () => {
        const fieldName = control.name;

        if (control.type === "checkbox") {
          updateArrayField(fieldName, control.value, control.checked);
        } else {
          state[fieldName] = control.value;
        }

        saveState();

        if (fieldName === "audioNeed") {
          currentIndex = 0;
          animateToCurrentStep("next");
          return;
        }

        if (fieldName === "sfxQuantityBand") {
          const helper = document.getElementById("budgetSfxHelper");
          if (helper) {
            helper.classList.toggle("is-visible", state.sfxQuantityBand === "unknown");
          }
        }
      });
    });

    stepContent.querySelectorAll(".budget-tip").forEach((tip) => {
      tip.addEventListener("click", (event) => {
        event.stopPropagation();

        stepContent.querySelectorAll(".budget-tip.is-open").forEach((openTip) => {
          if (openTip !== tip) openTip.classList.remove("is-open");
        });

        tip.classList.toggle("is-open");
      });
    });
  }

function initCustomSelects() {
  stepContent.querySelectorAll("select.budget-native-select").forEach((select) => {
    const wrapper = select.closest(".budget-select-wrap");
    if (!wrapper) return;

    const custom = document.createElement("div");
    const listId = `${select.id}-listbox`;

    custom.className = "budget-custom-select";
    custom.innerHTML = `
      <button
        type="button"
        class="budget-custom-select-button"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="${escapeHTML(listId)}"
      >
        <span class="budget-custom-select-value">${escapeHTML(getSelectedOptionLabel(select))}</span>
        <span class="budget-custom-select-chevron" aria-hidden="true">⌄</span>
      </button>
    `;

    wrapper.appendChild(custom);

    const button = custom.querySelector(".budget-custom-select-button");
    const valueLabel = custom.querySelector(".budget-custom-select-value");

    button.addEventListener("click", (event) => {
      event.stopPropagation();

      if (activeDropdown && activeDropdown.select === select) {
        closeAllCustomSelects();
        return;
      }

      openCustomSelect({
        select,
        custom,
        button,
        valueLabel,
        listId,
        focusSelected: false
      });
    });

    button.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();

        openCustomSelect({
          select,
          custom,
          button,
          valueLabel,
          listId,
          focusSelected: true
        });
      }

      if (event.key === "Escape") {
        closeAllCustomSelects();
      }
    });

    select.addEventListener("change", () => {
      valueLabel.textContent = getSelectedOptionLabel(select);
    });
  });
}

function openCustomSelect({ select, custom, button, valueLabel, listId, focusSelected }) {
  closeAllCustomSelects();

  const menu = document.createElement("div");

  menu.className = "budget-custom-select-menu budget-custom-select-portal";
  menu.id = listId;
  menu.setAttribute("role", "listbox");
  menu.tabIndex = -1;

  menu.innerHTML = Array.from(select.options).map((option, index) => {
    return `
      <button
        type="button"
        class="budget-custom-option"
        role="option"
        data-value="${escapeHTML(option.value)}"
        data-index="${index}"
        aria-selected="${option.selected ? "true" : "false"}"
      >
        ${escapeHTML(option.textContent)}
      </button>
    `;
  }).join("");

  document.body.appendChild(menu);

  const options = Array.from(menu.querySelectorAll(".budget-custom-option"));
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.getAttribute("aria-selected") === "true")
  );

  activeDropdown = {
    select,
    custom,
    button,
    valueLabel,
    menu,
    options,
    focusedIndex: selectedIndex
  };

  custom.classList.add("is-open");
  button.setAttribute("aria-expanded", "true");

  bindPortalDropdownEvents();

  positionActiveDropdown();

  requestAnimationFrame(() => {
    menu.classList.add("is-open");

    if (focusSelected) {
      setFocusedOption(options, selectedIndex, true);
    }
  });

  window.addEventListener("resize", positionActiveDropdown, { passive: true });
  window.addEventListener("scroll", positionActiveDropdown, true);
}

function bindPortalDropdownEvents() {
  if (!activeDropdown) return;

  const { select, button, valueLabel, menu, options } = activeDropdown;

  options.forEach((option) => {
    option.addEventListener("click", () => {
      chooseCustomOption(option);
    });

    option.addEventListener("mouseenter", () => {
      activeDropdown.focusedIndex = Number(option.dataset.index);
      setFocusedOption(options, activeDropdown.focusedIndex, false);
    });
  });

  menu.addEventListener("keydown", (event) => {
    if (!activeDropdown) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();

      activeDropdown.focusedIndex = Math.min(
        options.length - 1,
        activeDropdown.focusedIndex + 1
      );

      setFocusedOption(options, activeDropdown.focusedIndex, true);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      activeDropdown.focusedIndex = Math.max(
        0,
        activeDropdown.focusedIndex - 1
      );

      setFocusedOption(options, activeDropdown.focusedIndex, true);
    }

    if (event.key === "Enter") {
      event.preventDefault();
      chooseCustomOption(options[activeDropdown.focusedIndex]);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeAllCustomSelects();
      button.focus();
    }
  });

  function chooseCustomOption(option) {
    if (!option || !activeDropdown) return;

    select.value = option.dataset.value;
    valueLabel.textContent = option.textContent.trim();

    options.forEach((item) => {
      item.setAttribute("aria-selected", item === option ? "true" : "false");
      item.classList.remove("is-focused");
    });

    select.dispatchEvent(new Event("change", { bubbles: true }));

    closeAllCustomSelects();
    button.focus();
  }
}

function positionActiveDropdown() {
  if (!activeDropdown) return;

  const { button, menu } = activeDropdown;

  if (!button.isConnected || !menu.isConnected) {
    closeAllCustomSelects();
    return;
  }

  const rect = button.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const margin = 12;
  const gap = 8;

  const width = Math.min(rect.width, viewportWidth - margin * 2);
  const left = Math.min(
    Math.max(margin, rect.left),
    viewportWidth - width - margin
  );

  const availableBelow = viewportHeight - rect.bottom - gap - margin;
  const availableAbove = rect.top - gap - margin;

  const openUp = availableBelow < 220 && availableAbove > availableBelow;
  const availableSpace = openUp ? availableAbove : availableBelow;
  const maxHeight = Math.max(140, Math.min(340, availableSpace));

  menu.style.width = `${width}px`;
  menu.style.maxHeight = `${maxHeight}px`;
  menu.style.left = `${left}px`;
  menu.dataset.placement = openUp ? "top" : "bottom";

  const menuHeight = Math.min(menu.scrollHeight, maxHeight);

  if (openUp) {
    menu.style.top = `${Math.max(margin, rect.top - gap - menuHeight)}px`;
  } else {
    menu.style.top = `${Math.min(rect.bottom + gap, viewportHeight - margin - menuHeight)}px`;
  }
}

function getSelectedOptionLabel(select) {
  const selected = select.options[select.selectedIndex];
  return selected ? selected.textContent.trim() : "";
}

function setFocusedOption(options, index, shouldFocus) {
  options.forEach((option, optionIndex) => {
    option.classList.toggle("is-focused", optionIndex === index);
  });

  if (shouldFocus && options[index]) {
    options[index].focus({ preventScroll: true });
  }
}

function closeAllCustomSelects() {
  if (!activeDropdown) return;

  const { custom, button, menu } = activeDropdown;

  custom.classList.remove("is-open");
  button.setAttribute("aria-expanded", "false");

  if (menu && menu.isConnected) {
    menu.classList.remove("is-open");

    window.setTimeout(() => {
      if (menu.isConnected) {
        menu.remove();
      }
    }, 180);
  }

  window.removeEventListener("resize", positionActiveDropdown);
  window.removeEventListener("scroll", positionActiveDropdown, true);

  activeDropdown = null;
}

  function bindActions() {
    const back = stepContent.querySelector("[data-budget-back]");
    const next = stepContent.querySelector("[data-budget-next]");
    const generate = stepContent.querySelector("[data-budget-generate]");

    if (back) {
      back.addEventListener("click", () => {
        goToStep(currentIndex - 1, "prev");
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        if (!validateCurrentStep()) return;
        goToStep(currentIndex + 1, "next");
      });
    }

    if (generate) {
      generate.addEventListener("click", () => {
        if (!validateCurrentStep()) return;
        generateEstimate();
      });
    }
  }

  function updateArrayField(fieldName, value, checked) {
    const current = Array.isArray(state[fieldName]) ? [...state[fieldName]] : [];

    if (checked && !current.includes(value)) {
      current.push(value);
    }

    if (!checked) {
      const index = current.indexOf(value);
      if (index >= 0) current.splice(index, 1);
    }

    state[fieldName] = current;
  }

  function validateCurrentStep() {
    const error = document.getElementById("budgetStepError");
    const steps = getSteps();
    const step = steps[currentIndex];

    if (!error || !step || step.id === "result") return true;

    const missing = [];

    step.groups.forEach((group) => {
      group.fields.forEach((field) => {
        if (!field.required) return;

        const value = state[field.name];

        if (arrayFields.has(field.name)) {
          if (!Array.isArray(value) || !value.length) missing.push(field.label || field.name);
          return;
        }

        if (!value) {
          missing.push(field.label || field.name);
        }
      });
    });

    if (!missing.length) {
      error.hidden = true;
      error.textContent = "";
      return true;
    }

    error.textContent = `Please complete: ${missing.join(", ")}.`;
    error.hidden = false;
    return false;
  }

  function goToStep(nextIndex, direction) {
    const steps = getSteps();

    if (nextIndex < 0 || nextIndex > steps.length - 1) return;

    currentIndex = nextIndex;
    animateToCurrentStep(direction);
  }

  function animateToCurrentStep(direction) {
    lastDirection = direction;

    closeAllCustomSelects();
    stepContent.classList.add(direction === "next" ? "is-exiting-next" : "is-exiting-prev");

    window.setTimeout(() => {
      render();

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      app.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
    }, 230);
  }

  function buildCalculationForm() {
    const calculationForm = document.createElement("form");
    const routing = getRouting();

    appendFields(calculationForm, [
      "projectStage",
      "gameGenre",
      "audioNeed",
      "gameplayComplexity",
      "projectGoal",
      "targetPlatforms"
    ]);

    if (routing.musicActive) {
      appendFields(calculationForm, [
        "musicAmountBand",
        "musicBehavior",
        "musicProductionLevel",
        "musicReferencesAvailable"
      ]);

      appendArrayField(calculationForm, "musicStates");
      appendArrayField(calculationForm, "adaptiveFeatures");
    }

    if (routing.sfxActive) {
      appendFields(calculationForm, [
        "sfxQuantityBand",
        "sfxDepth",
        "combatComplexity",
        "uiComplexity",
        "ambienceScope",
        "cinematicScope"
      ]);

      appendArrayField(calculationForm, "sfxFamilies");
    }

    if (routing.trailerActive) {
      appendFields(calculationForm, [
        "trailerType",
        "trailerAudioScope",
        "trailerCutStatus"
      ]);
    }

    appendFields(calculationForm, [
      "deliveryDepth",
      "engine",
      "middleware",
      "whoImplements",
      "qaSupport",
      "rightsModel",
      "soundtrackUsage",
      "marketingUsage",
      "revisionRounds",
      "approvalStructure",
      "timelinePressure",
      "scopeClarity"
    ]);

    appendArrayField(calculationForm, "availableMaterials");

    return calculationForm;
  }

  function appendFields(targetForm, names) {
    names.forEach((name) => {
      appendInput(targetForm, name, state[name] ?? defaults[name] ?? "");
    });
  }

  function appendArrayField(targetForm, name) {
    const values = Array.isArray(state[name]) ? state[name] : [];

    values.forEach((value) => {
      appendInput(targetForm, name, value);
    });
  }

  function appendInput(targetForm, name, value) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    targetForm.appendChild(input);
  }

  async function generateEstimate() {
    resultEl.hidden = true;
    resultEl.classList.remove("is-visible");

    stepContent.innerHTML = `
      <div class="budget-calculating">
        <div>
          <span></span>
          <strong id="budgetCalculatingText">Analyzing scope...</strong>
        </div>
      </div>
    `;

    await wait(260);

    const text = document.getElementById("budgetCalculatingText");
    if (text) text.textContent = "Reviewing production requirements...";

    await wait(260);

    const calculationForm = buildCalculationForm();
    const inputs = engine.collectInputs(calculationForm);
    const result = engine.generateFinalEstimate(inputs);

    lastResult = result;

    if (text) text.textContent = "Building your estimate...";

    await wait(260);

    renderResult(result);

    app.classList.add("is-result-mode");
    resultEl.hidden = false;

    requestAnimationFrame(() => {
      resultEl.classList.add("is-visible");
    });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    resultEl.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start"
    });
  }

  function wait(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function renderResult(result) {
  const included = renderIncluded(result.included);

  resultEl.innerHTML = `
    <div class="budget-result-card">

      <section class="budget-result-section">
        <span class="budget-result-label">Project Diagnosis</span>
        <h2 class="budget-result-title">${escapeHTML(result.diagnosis.label)}</h2>
        <span class="budget-service-label">${escapeHTML(result.diagnosis.serviceLabel)}</span>
        <p class="budget-result-copy">${escapeHTML(result.diagnosis.description)}</p>
      </section>

      <section class="budget-result-section">
        <div class="budget-range-flow">

          <article class="budget-market-range">
            <span class="budget-range-title">${escapeHTML(result.estimate.market.label)}</span>
            <strong>${escapeHTML(result.estimate.market.range)}</strong>
            <p class="budget-range-copy">${escapeHTML(result.estimate.market.supportingCopy)}</p>
          </article>

          <article class="budget-roger-range">
            <span class="budget-range-title">${escapeHTML(result.estimate.roger.label)}</span>
            <strong>${escapeHTML(result.estimate.roger.range)}</strong>
            <p class="budget-range-copy">${escapeHTML(result.estimate.roger.supportingCopy)}</p>
          </article>

        </div>
      </section>

      ${
        included
          ? `
            <section class="budget-result-section">
              <div class="budget-included-layout">
                <div>
                  <span class="budget-result-label">What's Included</span>
                  <h3>
                    Your project includes all of this.
                  </h3>
                </div>

                <div class="budget-included-groups">
                  ${included}
                </div>
              </div>
            </section>
          `
          : ""
      }

      <section class="budget-result-section">
        <span class="budget-result-label">Next Step</span>
        <h2 class="budget-result-title">Let's turn this into a real scope.</h2>
        <p class="budget-result-copy">Send me your project details, gameplay or build and I'll turn this estimate into a real production scope.</p>

        <div class="budget-result-actions">
          <a href="${CONTACT_HREF}" class="btn primary">Let's Talk About Your Game</a>
          <button class="budget-button" type="button" data-budget-edit>Edit My Answers</button>
        </div>
      </section>

    </div>
  `;

  bindResultEvents();
}

  function renderIncluded(included) {
    if (!included) return "";

    const groups = [
      ["Creative", included.creative],
      ["Production", included.production],
      ["Delivery", included.delivery],
      ["Technical", included.technical]
    ];

    return groups
      .filter(([, items]) => Array.isArray(items) && items.length)
      .map(([title, items]) => {
        return `
          <article class="budget-included-group">
            <h4>${escapeHTML(title)}</h4>
            <ul>
              ${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}
            </ul>
          </article>
        `;
      })
      .join("");
  }

  function renderDrivers(drivers) {
    if (!Array.isArray(drivers) || !drivers.length) {
      return `<p>No major price drivers beyond the selected scope.</p>`;
    }

    return `
      <ul>
        ${drivers.map((driver) => {
          const label = driver.label ? `<strong>${escapeHTML(driver.label)}:</strong> ` : "";
          const message = typeof driver === "string" ? driver : driver.message;

          return `<li>${label}${escapeHTML(message || "")}</li>`;
        }).join("")}
      </ul>
    `;
  }

  function renderMissing(missingInfo) {
    if (!Array.isArray(missingInfo) || !missingInfo.length) {
      return `<p>No major missing information for a preliminary estimate.</p>`;
    }

    return `
      <ul>
        ${missingInfo.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}
      </ul>
    `;
  }

  function bindResultEvents() {
    const detailsToggle = resultEl.querySelector(".budget-details-toggle");
    const detailsContent = resultEl.querySelector(".budget-details-content");
    const edit = resultEl.querySelector("[data-budget-edit]");

    if (detailsToggle && detailsContent) {
      detailsToggle.addEventListener("click", () => {
        const isOpen = detailsToggle.getAttribute("aria-expanded") === "true";

        detailsToggle.setAttribute("aria-expanded", String(!isOpen));
        detailsContent.hidden = isOpen;

        const icon = detailsToggle.querySelector("i");
        if (icon) icon.textContent = isOpen ? "+" : "–";
      });
    }

    if (edit) {
      edit.addEventListener("click", () => {
        app.classList.remove("is-result-mode");
        resultEl.hidden = true;
        resultEl.classList.remove("is-visible");
        render();

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        app.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start"
        });
      });
    }
  }

document.addEventListener("click", (event) => {
  if (event.target.closest(".budget-custom-select")) return;
  if (event.target.closest(".budget-custom-select-portal")) return;
  if (event.target.closest(".budget-tip")) return;

  closeAllCustomSelects();

  stepContent.querySelectorAll(".budget-tip.is-open").forEach((tip) => {
    tip.classList.remove("is-open");
  });
});

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  render();

  window.__budgetEstimatorDebug = {
    getState: () => clone(state),
    getRouting,
    getSteps,
    getLastResult: () => lastResult,
    generateInputs: () => engine.collectInputs(buildCalculationForm())
  };
})();