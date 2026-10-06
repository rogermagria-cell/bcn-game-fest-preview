/*
  Game Audio Budget Estimator — Logic Prototype
  -------------------------------------------------------
  Scope-based game audio budget estimator.
  This revision keeps the existing modular architecture but recalibrates Roger's
  model around actual work: content amount, creative/systemic complexity,
  technical work actually performed, QA, rights and timeline.
*/

const ESTIMATOR_CONFIG = {
  labels: {
    projectStage: {
      prototype: 'Prototype',
      vertical_slice: 'Vertical Slice',
      demo: 'Demo',
      trailer: 'Trailer / Marketing Asset',
      small_indie: 'Small Indie Game',
      medium_indie: 'Medium Indie Game',
      full_release: 'Full Release / Ambitious Indie'
    },
    gameGenre: {
      platformer: 'Platformer',
      rpg: 'RPG',
      roguelike: 'Roguelike / Roguelite',
      simulation_management: 'Simulation / Management',
      puzzle: 'Puzzle',
      horror: 'Horror',
      narrative_adventure: 'Narrative / Adventure',
      action: 'Action',
      strategy: 'Strategy',
      survival: 'Survival',
      cozy: 'Cozy',
      racing: 'Racing',
      shooter: 'Shooter',
      metroidvania: 'Metroidvania',
      visual_novel: 'Visual Novel',
      other: 'Other'
    },
    audioNeed: {
      music_only: 'Music Only',
      sfx_only: 'Sound Design Only',
      music_sfx: 'Music + Sound Design',
      trailer_audio: 'Game Trailer Audio',
      full_audio_package: 'Full Audio Package',
      not_sure: 'Not Sure Yet'
    }
  },

  musicAmountBands: {
    unknown: { low: 0, mid: 0, high: 0, known: false, broad: true, label: 'Not sure' },
    '0_5_min': { low: 2, mid: 3.5, high: 5, known: true, broad: false, label: '0–5 min' },
    '5_10_min': { low: 5, mid: 7.5, high: 10, known: true, broad: false, label: '5–10 min' },
    '10_15_min': { low: 10, mid: 12.5, high: 15, known: true, broad: false, label: '10–15 min' },
    '15_20_min': { low: 15, mid: 17.5, high: 20, known: true, broad: false, label: '15–20 min' },
    '20_30_min': { low: 20, mid: 25, high: 30, known: true, broad: false, label: '20–30 min' },
    // Legacy support for previously saved tests. Not shown in the revised UI.
    '15_30_min': { low: 18, mid: 24, high: 30, known: true, broad: true, label: '15–30 min' },
    '30_45_min': { low: 30, mid: 37.5, high: 45, known: true, broad: false, label: '30–45 min' },
    '45_60_min': { low: 45, mid: 52.5, high: 60, known: true, broad: false, label: '45–60 min' },
    '60_plus_min': { low: 60, mid: 75, high: 100, known: true, broad: true, label: '60+ min' }
  },

  musicStateMinutes: {
    menu: { low: 0.75, mid: 1.25, high: 2 },
    exploration: { low: 2, mid: 3.5, high: 5 },
    hub: { low: 1.5, mid: 2.75, high: 4 },
    combat: { low: 2, mid: 3.5, high: 5 },
    boss: { low: 1.5, mid: 2.75, high: 4 },
    stealth_tension: { low: 1.5, mid: 2.75, high: 4 },
    puzzle: { low: 1, mid: 2, high: 3 },
    cutscenes: { low: 2, mid: 5, high: 8 },
    victory_defeat: { low: 0.5, mid: 1.25, high: 2 },
    credits: { low: 1.5, mid: 2.75, high: 4 },
    trailer: { low: 1, mid: 2, high: 3 }
  },

  typicalMusicMinutesByStage: {
    prototype: { low: 1, high: 6 },
    vertical_slice: { low: 3, high: 12 },
    demo: { low: 5, high: 25 },
    trailer: { low: 1, high: 4 },
    small_indie: { low: 12, high: 35 },
    medium_indie: { low: 20, high: 60 },
    full_release: { low: 30, high: 100 }
  },

  sfxQuantityBands: {
    unknown: { low: 0, mid: 0, high: 0, known: false, broad: true, label: 'Not sure' },
    '1_25': { low: 8, mid: 18, high: 25, known: true, broad: false, label: '1–25 SFX' },
    '25_50': { low: 25, mid: 37, high: 50, known: true, broad: false, label: '25–50 SFX' },
    '50_100': { low: 55, mid: 75, high: 100, known: true, broad: false, label: '50–100 SFX' },
    '100_175': { low: 105, mid: 135, high: 175, known: true, broad: false, label: '100–175 SFX' },
    '175_300': { low: 180, mid: 235, high: 300, known: true, broad: false, label: '175–300 SFX' },
    '300_plus': { low: 300, mid: 420, high: 650, known: true, broad: true, label: '300+ SFX' }
  },

  sfxFamilyDifficulty: {
    ui: 0.80,
    movement: 0.85,
    jump_dash: 0.90,
    weapons: 1.25,
    impacts_damage: 1.20,
    enemies: 1.30,
    abilities_magic: 1.35,
    pickups_rewards: 0.75,
    inventory_crafting: 0.85,
    ambience: 0.85,
    cinematics: 1.25,
    notifications: 0.75,
    environment_interactions: 0.90
  },

  inferredSfxByFamily: {
    ui: { low: 8, mid: 18, high: 35 },
    movement: { low: 6, mid: 14, high: 28 },
    jump_dash: { low: 6, mid: 14, high: 30 },
    weapons: { low: 14, mid: 35, high: 80 },
    impacts_damage: { low: 12, mid: 32, high: 80 },
    enemies: { low: 14, mid: 40, high: 100 },
    abilities_magic: { low: 14, mid: 40, high: 100 },
    pickups_rewards: { low: 5, mid: 14, high: 30 },
    inventory_crafting: { low: 8, mid: 24, high: 55 },
    ambience: { low: 6, mid: 18, high: 45 },
    cinematics: { low: 12, mid: 35, high: 90 },
    notifications: { low: 5, mid: 14, high: 35 },
    environment_interactions: { low: 8, mid: 24, high: 55 }
  },

  models: {
    roger: {
      name: 'Roger Pricing Model',
      stageBaseline: {
        prototype: { low: 40, mid: 90, high: 180 },
        vertical_slice: { low: 180, mid: 380, high: 700 },
        demo: { low: 250, mid: 450, high: 800 },
        trailer: { low: 150, mid: 260, high: 450 },
        small_indie: { low: 450, mid: 850, high: 1500 },
        medium_indie: { low: 900, mid: 1700, high: 3200 },
        full_release: { low: 1600, mid: 3200, high: 6500 }
      },
      stageServiceFactor: {
        music_only: 0.70,
        sfx_only: 0.65,
        music_sfx: 0.90,
        trailer_audio: 0.60,
        full_audio_package: 1.10,
        not_sure: 0.85
      },
      musicBaseRates: {
        simple_indie: 58,
        premium_indie: 88,
        cinematic_orchestral: 135,
        hybrid_epic: 150,
        highly_stylized: 125
      },
      musicRateSpread: { low: 0.78, mid: 1.00, high: 1.22 },
      musicBehaviorMultipliers: {
        linear: 0.84,
        simple_loop: 0.92,
        seamless_loop_variations: 1.03,
        layered_stems: 1.42,
        adaptive_system: 1.72
      },
      sfxBaseRates: { low: 6.5, mid: 10.5, high: 14.5 },
      trailerBaseRanges: {
        sound_design_only: { low: 450, mid: 750, high: 1200 },
        music_edit_sync: { low: 500, mid: 900, high: 1400 },
        sound_design_mix: { low: 650, mid: 1100, high: 1700 },
        full_audio_post: { low: 900, mid: 1500, high: 2300 },
        original_music_full_audio: { low: 1300, mid: 2200, high: 3600 },
        campaign_package: { low: 2500, mid: 4200, high: 7000 }
      },
      technical: {
        delivery: {
          audio_files: { low: 0, mid: 30, high: 80 },
          production_ready: { low: 120, mid: 250, high: 450 },
          technical_support: { low: 350, mid: 800, high: 1600 }
        },
        qa: {
          none: { low: 0, mid: 0, high: 0 },
          light: { low: 20, mid: 45, high: 90 },
          standard: { low: 60, mid: 120, high: 250 },
          launch_polish: { low: 180, mid: 450, high: 900 }
        },
        implementation: {
          client_team: { low: 0, mid: 0, high: 0 },
          roger_supports: { low: 120, mid: 320, high: 700 },
          roger_implements: { low: 650, mid: 1600, high: 3600 },
          unknown: { low: 120, mid: 350, high: 800 }
        },
        middleware: {
          none: { low: 0, mid: 0, high: 0 },
          presenceOnly: { low: 0, mid: 0, high: 0 },
          lightSupport: { low: 80, mid: 200, high: 450 },
          substantialSupport: { low: 350, mid: 900, high: 2200 },
          implementation: { low: 800, mid: 2200, high: 5200 }
        }
      },
      commercial: {
        rights: {
          standard_license: { music: 1.00, sfx: 1.00, trailer: 1.00 },
          exclusive_license: { music: 1.07, sfx: 1.03, trailer: 1.04 },
          work_for_hire_buyout: { music: 1.18, sfx: 1.08, trailer: 1.10 },
          unknown: { music: 1.03, sfx: 1.02, trailer: 1.02 }
        },
        usage: {
          none: 1.00,
          included_promo_only: 1.01,
          commercial_soundtrack: 1.05,
          trailer_only: 1.03,
          full_campaign: 1.06,
          ads_paid_media: 1.08,
          unknown: 1.03
        },
        revision: { one: 1.00, two: 1.02, three: 1.05, four_plus: 1.10, unknown: 1.04 },
        approval: { solo_founder: 1.00, small_team: 1.02, multiple_stakeholders: 1.06, publisher_client: 1.09, unknown: 1.04 },
        urgency: { flexible: 0.95, normal: 1.00, fixed_milestone: 1.06, rush: 1.20, extreme_rush: 1.35, unknown: 1.04 }
      },
      professionalFloors: {
        any: 500,
        earlyPrototype: 500,
        trailer: 650,
        adaptiveMusic: 1200,
        combatHeavy: 1400,
        fullAudioWithImplementation: 3500
      }
    },

    market: {
      name: 'Professional Market Benchmark',
      stageBaseline: {
        prototype: { low: 350, mid: 700, high: 1300 },
        vertical_slice: { low: 900, mid: 1800, high: 3200 },
        demo: { low: 1300, mid: 2400, high: 4500 },
        trailer: { low: 500, mid: 900, high: 1600 },
        small_indie: { low: 2500, mid: 4500, high: 8500 },
        medium_indie: { low: 5000, mid: 9500, high: 18000 },
        full_release: { low: 10000, mid: 19000, high: 36000 }
      },
      stageServiceFactor: {
        music_only: 0.70,
        sfx_only: 0.70,
        music_sfx: 0.95,
        trailer_audio: 0.80,
        full_audio_package: 1.12,
        not_sure: 0.95
      },
      musicBaseRates: {
        simple_indie: 170,
        premium_indie: 250,
        cinematic_orchestral: 420,
        hybrid_epic: 470,
        highly_stylized: 360
      },
      musicRateSpread: { low: 0.80, mid: 1.00, high: 1.35 },
      musicBehaviorMultipliers: {
        linear: 0.92,
        simple_loop: 1.00,
        seamless_loop_variations: 1.15,
        layered_stems: 1.55,
        adaptive_system: 1.95
      },
      sfxBaseRates: { low: 18, mid: 32, high: 55 },
      trailerBaseRanges: {
        sound_design_only: { low: 700, mid: 1100, high: 1800 },
        music_edit_sync: { low: 900, mid: 1500, high: 2500 },
        sound_design_mix: { low: 1000, mid: 1800, high: 3000 },
        full_audio_post: { low: 1500, mid: 2600, high: 4200 },
        original_music_full_audio: { low: 2200, mid: 4000, high: 6500 },
        campaign_package: { low: 3500, mid: 6500, high: 11000 }
      },
      technical: {
        delivery: {
          audio_files: { low: 100, mid: 220, high: 450 },
          production_ready: { low: 400, mid: 900, high: 1800 },
          technical_support: { low: 1200, mid: 2800, high: 6000 }
        },
        qa: {
          none: { low: 0, mid: 0, high: 0 },
          light: { low: 120, mid: 250, high: 600 },
          standard: { low: 350, mid: 800, high: 1800 },
          launch_polish: { low: 900, mid: 2200, high: 5000 }
        },
        implementation: {
          client_team: { low: 0, mid: 0, high: 0 },
          roger_supports: { low: 500, mid: 1200, high: 2800 },
          roger_implements: { low: 1800, mid: 4500, high: 10000 },
          unknown: { low: 600, mid: 1400, high: 3500 }
        },
        middleware: {
          none: { low: 0, mid: 0, high: 0 },
          presenceOnly: { low: 0, mid: 0, high: 0 },
          lightSupport: { low: 350, mid: 900, high: 2200 },
          substantialSupport: { low: 1200, mid: 3200, high: 7500 },
          implementation: { low: 2500, mid: 6500, high: 15000 }
        }
      },
      commercial: {
        rights: {
          standard_license: { music: 1.00, sfx: 1.00, trailer: 1.00 },
          exclusive_license: { music: 1.14, sfx: 1.06, trailer: 1.08 },
          work_for_hire_buyout: { music: 1.35, sfx: 1.15, trailer: 1.18 },
          unknown: { music: 1.07, sfx: 1.04, trailer: 1.05 }
        },
        usage: {
          none: 1.00,
          included_promo_only: 1.03,
          commercial_soundtrack: 1.08,
          trailer_only: 1.07,
          full_campaign: 1.10,
          ads_paid_media: 1.15,
          unknown: 1.05
        },
        revision: { one: 1.00, two: 1.05, three: 1.10, four_plus: 1.18, unknown: 1.08 },
        approval: { solo_founder: 1.00, small_team: 1.04, multiple_stakeholders: 1.10, publisher_client: 1.15, unknown: 1.07 },
        urgency: { flexible: 0.97, normal: 1.00, fixed_milestone: 1.10, rush: 1.35, extreme_rush: 1.60, unknown: 1.08 }
      },
      professionalFloors: {
        any: 1000,
        earlyPrototype: 1200,
        trailer: 900,
        adaptiveMusic: 3000,
        combatHeavy: 3000,
        fullAudioWithImplementation: 9000
      }
    }
  }
};

const CHECKED_ARRAY_FIELDS = ['musicStates', 'adaptiveFeatures', 'sfxFamilies', 'availableMaterials'];
const UNKNOWN_FIELDS = [
  'musicAmountBand', 'musicReferencesAvailable', 'targetPlatforms', 'engine', 'middleware',
  'whoImplements', 'rightsModel', 'soundtrackUsage', 'marketingUsage', 'revisionRounds',
  'approvalStructure', 'timelinePressure', 'scopeClarity', 'sfxQuantityBand'
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function addRanges(a, b) {
  return { low: a.low + b.low, mid: a.mid + b.mid, high: a.high + b.high };
}

function multiplyRange(range, multiplier) {
  return { low: range.low * multiplier, mid: range.mid * multiplier, high: range.high * multiplier };
}

function formatCurrency(amount) {
  if (typeof amount === 'string') return amount;
  return `€${Math.round(amount).toLocaleString('en-US')}`;
}

function formatRange(low, high) {
  if (typeof high === 'string') return `${formatCurrency(low)} – ${high}`;
  return `${formatCurrency(low)} – ${formatCurrency(high)}`;
}

function roundDownBy(amount, increment) {
  return Math.floor(amount / increment) * increment;
}

function roundUpBy(amount, increment) {
  return Math.ceil(amount / increment) * increment;
}

function getRoundingIncrement(amount) {
  if (amount < 1000) return 100;
  if (amount < 2000) return 250;
  if (amount < 5000) return 500;
  if (amount < 15000) return 500;
  if (amount < 30000) return 1000;
  if (amount < 70000) return 2500;
  return 5000;
}

function outwardRoundRange(low, high) {
  return {
    min: Math.max(0, roundDownBy(low, getRoundingIncrement(low))),
    max: roundUpBy(high, getRoundingIncrement(high))
  };
}

function applyMinimumUsefulWidth(range, confidenceLevel) {
  const width = range.max - range.min;
  let minimumWidth;
  if (range.max <= 1000) minimumWidth = confidenceLevel === 'High' ? 250 : 400;
  else if (range.max <= 2500) minimumWidth = confidenceLevel === 'High' ? 400 : 700;
  else if (range.max <= 5000) minimumWidth = confidenceLevel === 'High' ? 800 : 1200;
  else if (range.max <= 15000) minimumWidth = confidenceLevel === 'High' ? 1500 : 2500;
  else if (range.max <= 50000) minimumWidth = confidenceLevel === 'High' ? 5000 : 8000;
  else minimumWidth = confidenceLevel === 'High' ? 10000 : 15000;

  if (width >= minimumWidth) return range;
  return { min: range.min, max: range.min + minimumWidth };
}

function getServiceRouting(audioNeed) {
  const routing = {
    musicActive: false,
    sfxActive: false,
    trailerActive: false,
    scopeLessDefined: false
  };

  if (audioNeed === 'music_only') routing.musicActive = true;
  if (audioNeed === 'sfx_only') routing.sfxActive = true;
  if (audioNeed === 'music_sfx' || audioNeed === 'full_audio_package') {
    routing.musicActive = true;
    routing.sfxActive = true;
  }
  if (audioNeed === 'trailer_audio') routing.trailerActive = true;
  if (audioNeed === 'not_sure') {
    routing.musicActive = true;
    routing.sfxActive = true;
    routing.scopeLessDefined = true;
  }

  return routing;
}

function collectInputs(form) {
  const formData = new FormData(form);
  const inputs = Object.fromEntries(formData.entries());

  CHECKED_ARRAY_FIELDS.forEach((field) => {
    inputs[field] = formData.getAll(field);
  });

  const routing = getServiceRouting(inputs.audioNeed);
  inputs.routing = routing;
  inputs.musicNeeded = routing.musicActive;
  inputs.sfxNeeded = routing.sfxActive;
  inputs.trailerNeeded = routing.trailerActive;

  if (!inputs.musicNeeded) {
    inputs.musicStates = [];
    inputs.adaptiveFeatures = [];
  }
  if (!inputs.sfxNeeded) {
    inputs.sfxFamilies = [];
  }
  if (!inputs.trailerNeeded) {
    inputs.trailerType = 'none';
    inputs.trailerAudioScope = 'none';
    inputs.trailerCutStatus = 'none';
  }

  inputs.unknownAnswerCount = UNKNOWN_FIELDS.reduce((count, field) => {
    return count + (inputs[field] === 'unknown' ? 1 : 0);
  }, 0);

  return inputs;
}

function calculateBaseRange(inputs) {
  const roger = calculateProjectBaseline(inputs, 'roger');
  const market = calculateProjectBaseline(inputs, 'market');
  return { roger, market };
}

function isEarlyValidationPrototype(inputs) {
  const lowQuantity = ['1_25', '25_50'].includes(inputs.sfxQuantityBand) || (!inputs.sfxNeeded && inputs.musicNeeded && ['0_5_min', '5_10_min'].includes(inputs.musicAmountBand));
  const simpleAudio = inputs.audioNeed === 'sfx_only' || inputs.audioNeed === 'music_only';
  return inputs.projectStage === 'prototype'
    && inputs.projectGoal === 'internal_prototype'
    && ['simple', 'moderate'].includes(inputs.gameplayComplexity)
    && lowQuantity
    && ['none', 'light'].includes(inputs.combatComplexity)
    && ['audio_files', 'production_ready'].includes(inputs.deliveryDepth)
    && inputs.whoImplements === 'client_team'
    && ['none', 'light'].includes(inputs.qaSupport)
    && inputs.timelinePressure === 'flexible'
    && ['solo_founder', 'small_team'].includes(inputs.approvalStructure)
    && simpleAudio;
}

function calculateProjectBaseline(inputs, modelKey) {
  const model = ESTIMATOR_CONFIG.models[modelKey];
  const base = model.stageBaseline[inputs.projectStage] || model.stageBaseline.demo;
  const serviceFactor = model.stageServiceFactor[inputs.audioNeed] || 0.85;
  let goalFactor = 1;
  if (inputs.projectGoal === 'internal_prototype') goalFactor = 0.70;
  if (['publisher_pitch', 'steam_demo', 'next_fest', 'festival_submission'].includes(inputs.projectGoal)) goalFactor = 1.00;
  if (['release', 'marketing_campaign'].includes(inputs.projectGoal)) goalFactor = 1.12;

  let baseline = multiplyRange(base, serviceFactor * goalFactor);

  if (modelKey === 'roger' && isEarlyValidationPrototype(inputs)) {
    baseline = multiplyRange(baseline, 0.55);
  }

  return baseline;
}

function calculateMusicMinutes(inputs) {
  if (!inputs.musicNeeded) return { low: 0, mid: 0, high: 0, known: true, broad: false, inferredFromStates: false, label: 'None' };

  const selected = ESTIMATOR_CONFIG.musicAmountBands[inputs.musicAmountBand];
  if (selected && selected.known) {
    return { ...selected, inferredFromStates: false };
  }

  const selectedStates = normalizeArray(inputs.musicStates);
  const inferred = selectedStates.reduce((acc, state) => {
    const minutes = ESTIMATOR_CONFIG.musicStateMinutes[state];
    if (!minutes) return acc;
    acc.low += minutes.low;
    acc.mid += minutes.mid;
    acc.high += minutes.high;
    return acc;
  }, { low: 0, mid: 0, high: 0 });

  if (!selectedStates.length) {
    return { low: 2, mid: 4, high: 7, known: false, broad: true, inferredFromStates: true, label: 'Inferred' };
  }

  return { ...inferred, known: false, broad: true, inferredFromStates: true, label: 'Inferred from states' };
}

function calculateAdaptiveAdjustment(inputs, modelKey) {
  const addons = {
    stingers: modelKey === 'roger' ? 0.06 : 0.08,
    transitions: modelKey === 'roger' ? 0.08 : 0.10,
    intensity_layers: modelKey === 'roger' ? 0.10 : 0.12,
    combat_states: modelKey === 'roger' ? 0.12 : 0.15,
    health_or_risk_layers: modelKey === 'roger' ? 0.08 : 0.10,
    vertical_remixing: modelKey === 'roger' ? 0.14 : 0.18
  };

  return normalizeArray(inputs.adaptiveFeatures).reduce((total, feature) => total + (addons[feature] || 0), 0);
}

function calculateMusicAmountAdjustment(minutes) {
  const mid = minutes.mid || 0;
  if (mid >= 60) return 0.76;
  if (mid >= 45) return 0.82;
  if (mid >= 30) return 0.88;
  if (mid >= 20) return 0.94;
  return 1.00;
}

function calculateTechnicalMusicAdjustment(inputs) {
  if (!inputs.musicNeeded) return 0;
  const adaptive = ['layered_stems', 'adaptive_system'].includes(inputs.musicBehavior) || inputs.adaptiveFeatures.length > 0;
  const rogerDoingImplementation = ['roger_supports', 'roger_implements'].includes(inputs.whoImplements)
    && inputs.deliveryDepth === 'technical_support';
  if (adaptive && rogerDoingImplementation) return 0.12;
  if (adaptive) return 0.05;
  return 0;
}

function calculateMusicContribution(inputs, modelKey) {
  if (!inputs.musicNeeded) {
    return {
      low: 0, mid: 0, high: 0,
      minutes: { low: 0, mid: 0, high: 0, known: true, broad: false, label: 'None' },
      rogerRateLogic: modelKey === 'roger' ? 'Inactive: music is not part of this service route.' : undefined,
      baseLinearMusicRate: 0,
      musicComplexityAdjustment: 0,
      musicAmountAdjustment: 0,
      adaptiveAdjustment: 0,
      technicalMusicAdjustment: 0,
      behaviorMultiplier: 0,
      scopeExceedsTypicalStage: false
    };
  }

  const model = ESTIMATOR_CONFIG.models[modelKey];
  const minutes = calculateMusicMinutes(inputs);
  const baseRate = model.musicBaseRates[inputs.musicProductionLevel] || model.musicBaseRates.premium_indie;
  const behaviorBase = model.musicBehaviorMultipliers[inputs.musicBehavior] || 1;
  const adaptiveAdjustment = calculateAdaptiveAdjustment(inputs, modelKey);
  const technicalMusicAdjustment = calculateTechnicalMusicAdjustment(inputs);
  const behaviorMultiplier = behaviorBase + adaptiveAdjustment + technicalMusicAdjustment;
  const amountAdjustment = calculateMusicAmountAdjustment(minutes);

  const low = minutes.low * baseRate * model.musicRateSpread.low * behaviorMultiplier * amountAdjustment;
  const mid = minutes.mid * baseRate * model.musicRateSpread.mid * behaviorMultiplier * amountAdjustment;
  const high = minutes.high * baseRate * model.musicRateSpread.high * behaviorMultiplier * amountAdjustment;

  const typical = ESTIMATOR_CONFIG.typicalMusicMinutesByStage[inputs.projectStage] || { high: Infinity };
  const scopeExceedsTypicalStage = minutes.high > typical.high * 1.35;

  return {
    low,
    mid,
    high,
    minutes,
    rogerRateLogic: modelKey === 'roger'
      ? 'Roger music rates are calibrated for efficient indie production; linear music stays accessible, while adaptive/stem-based systems scale up.'
      : undefined,
    baseLinearMusicRate: baseRate,
    musicComplexityAdjustment: behaviorBase,
    musicAmountAdjustment: amountAdjustment,
    adaptiveAdjustment,
    technicalMusicAdjustment,
    behaviorMultiplier,
    scopeExceedsTypicalStage
  };
}

function inferSfxQuantityFromSystems(inputs) {
  const families = normalizeArray(inputs.sfxFamilies);
  const inferred = families.reduce((acc, family) => {
    const quantity = ESTIMATOR_CONFIG.inferredSfxByFamily[family];
    if (!quantity) return acc;
    acc.low += quantity.low;
    acc.mid += quantity.mid;
    acc.high += quantity.high;
    return acc;
  }, { low: 0, mid: 0, high: 0 });

  if (!families.length) return { low: 12, mid: 30, high: 70, known: false, broad: true, inferred: true, label: 'Inferred provisional scope' };
  return { ...inferred, known: false, broad: true, inferred: true, label: 'Inferred from selected systems' };
}

function getSfxQuantity(inputs) {
  if (!inputs.sfxNeeded) return { low: 0, mid: 0, high: 0, known: true, broad: false, inferred: false, label: 'None' };
  const selected = ESTIMATOR_CONFIG.sfxQuantityBands[inputs.sfxQuantityBand];
  if (selected && selected.known) return { ...selected, inferred: false };
  return inferSfxQuantityFromSystems(inputs);
}

function calculateSfxDifficulty(inputs) {
  const families = normalizeArray(inputs.sfxFamilies);
  if (!families.length) return 1;
  const averageDifficulty = families.reduce((total, family) => total + (ESTIMATOR_CONFIG.sfxFamilyDifficulty[family] || 1), 0) / families.length;

  let adjustment = 0;
  if (['weapons', 'impacts_damage', 'enemies', 'abilities_magic'].some((f) => families.includes(f))) adjustment += 0.08;
  if (inputs.combatComplexity === 'light') adjustment += 0.04;
  if (inputs.combatComplexity === 'moderate') adjustment += 0.14;
  if (inputs.combatComplexity === 'heavy') adjustment += 0.30;
  if (inputs.combatComplexity === 'systemic') adjustment += 0.48;
  if (inputs.uiComplexity === 'full_hud') adjustment += 0.04;
  if (inputs.uiComplexity === 'inventory_economy') adjustment += 0.08;
  if (inputs.uiComplexity === 'systems_heavy') adjustment += 0.16;
  if (inputs.ambienceScope === 'few_biomes') adjustment += 0.04;
  if (inputs.ambienceScope === 'many_biomes') adjustment += 0.12;
  if (inputs.ambienceScope === 'dynamic_world') adjustment += 0.22;
  if (inputs.cinematicScope === 'few_moments') adjustment += 0.04;
  if (inputs.cinematicScope === 'several_scenes') adjustment += 0.12;
  if (inputs.cinematicScope === 'trailer_like') adjustment += 0.18;
  if (inputs.cinematicScope === 'narrative_heavy') adjustment += 0.25;
  if (inputs.gameplayComplexity === 'systemic') adjustment += 0.10;
  if (inputs.gameplayComplexity === 'combat_heavy') adjustment += 0.18;
  if (inputs.gameplayComplexity === 'content_heavy') adjustment += 0.12;
  if (inputs.gameplayComplexity === 'simple') adjustment -= 0.06;

  return clamp(averageDifficulty + adjustment, 0.70, 1.85);
}

function getSfxDepthAdjustment(inputs) {
  const map = {
    essential: 0.82,
    polished: 0.96,
    detailed_variations: 1.14,
    systemic: 1.34,
    hero: 1.58
  };
  return map[inputs.sfxDepth] || 1;
}

function calculateSfxSystemOverhead(inputs, modelKey, quantity, difficulty, depthAdjustment) {
  if (!inputs.sfxNeeded) return { low: 0, mid: 0, high: 0, notes: [] };
  const notes = [];
  let low = 0;
  let mid = 0;
  let high = 0;
  const factor = modelKey === 'roger' ? 1 : 2.3;

  if (['heavy', 'systemic'].includes(inputs.combatComplexity)) {
    low += 120 * factor;
    mid += 350 * factor;
    high += 900 * factor;
    notes.push('combat-system overhead');
  } else if (inputs.combatComplexity === 'moderate') {
    low += 60 * factor;
    mid += 160 * factor;
    high += 420 * factor;
    notes.push('moderate combat overhead');
  }

  if (['systemic', 'hero'].includes(inputs.sfxDepth)) {
    low += 100 * factor;
    mid += 260 * factor;
    high += 700 * factor;
    notes.push('systemic/hero sound overhead');
  }

  if (inputs.ambienceScope === 'dynamic_world') {
    low += 100 * factor;
    mid += 260 * factor;
    high += 650 * factor;
    notes.push('dynamic ambience overhead');
  } else if (inputs.ambienceScope === 'many_biomes') {
    low += 60 * factor;
    mid += 160 * factor;
    high += 380 * factor;
    notes.push('multi-biome ambience overhead');
  }

  if (inputs.cinematicScope === 'narrative_heavy') {
    low += 120 * factor;
    mid += 350 * factor;
    high += 900 * factor;
    notes.push('narrative/cinematic overhead');
  }

  if (!quantity.known) {
    low += 50 * factor;
    mid += 150 * factor;
    high += 500 * factor;
    notes.push('provisional SFX quantity overhead');
  }

  // Keep overhead proportional to actual volume so many simple categories do not behave like a complex combat system.
  const maxOverhead = quantity.mid * (modelKey === 'roger' ? 5 : 16) * difficulty * depthAdjustment;
  return {
    low: Math.min(low, maxOverhead * 0.55),
    mid: Math.min(mid, maxOverhead),
    high: Math.min(high, maxOverhead * 1.6),
    notes
  };
}

function calculateSfxContribution(inputs, modelKey) {
  if (!inputs.sfxNeeded) {
    return {
      low: 0, mid: 0, high: 0,
      sfxQuantity: { low: 0, mid: 0, high: 0, known: true, inferred: false, label: 'None' },
      rogerSfxBaseRate: 0,
      quantityAdjustment: 0,
      complexityAdjustment: 0,
      variationAdjustment: 0,
      systemAdjustment: { low: 0, mid: 0, high: 0, notes: [] }
    };
  }

  const model = ESTIMATOR_CONFIG.models[modelKey];
  const quantity = getSfxQuantity(inputs);
  const difficulty = calculateSfxDifficulty(inputs);
  const depthAdjustment = getSfxDepthAdjustment(inputs);
  const overhead = calculateSfxSystemOverhead(inputs, modelKey, quantity, difficulty, depthAdjustment);

  const low = quantity.low * model.sfxBaseRates.low * difficulty * depthAdjustment + overhead.low;
  const mid = quantity.mid * model.sfxBaseRates.mid * difficulty * depthAdjustment + overhead.mid;
  const high = quantity.high * model.sfxBaseRates.high * difficulty * depthAdjustment + overhead.high;

  return {
    low,
    mid,
    high,
    sfxQuantity: quantity,
    rogerSfxBaseRate: modelKey === 'roger' ? model.sfxBaseRates.mid : undefined,
    quantityAdjustment: quantity.known ? 1 : 1.18,
    complexityAdjustment: difficulty,
    variationAdjustment: depthAdjustment,
    systemAdjustment: overhead
  };
}

function calculateTrailerContribution(inputs, modelKey) {
  if (!inputs.trailerNeeded) return { low: 0, mid: 0, high: 0, multiplier: 0 };
  const model = ESTIMATOR_CONFIG.models[modelKey];
  let base = model.trailerBaseRanges[inputs.trailerAudioScope] || model.trailerBaseRanges.full_audio_post;

  let multiplier = 1;
  if (inputs.trailerCutStatus === 'rough_cut') multiplier *= 1.10;
  if (inputs.trailerCutStatus === 'no_cut') multiplier *= 1.20;
  if (inputs.trailerCutStatus === 'multiple_versions') multiplier *= 1.30;
  if (['campaign_bundle', 'social_cutdowns'].includes(inputs.trailerType)) multiplier *= 1.18;
  if (inputs.timelinePressure === 'rush') multiplier *= modelKey === 'roger' ? 1.18 : 1.30;
  if (inputs.timelinePressure === 'extreme_rush') multiplier *= modelKey === 'roger' ? 1.30 : 1.50;

  return multiplyRange(base, multiplier);
}

function isMiddlewareWorkRequired(inputs) {
  const middlewarePresent = ['fmod', 'wwise'].includes(inputs.middleware);
  if (!middlewarePresent) return false;
  if (inputs.whoImplements === 'roger_implements') return true;
  if (inputs.deliveryDepth === 'technical_support' && inputs.whoImplements !== 'client_team') return true;
  const adaptiveMusic = ['layered_stems', 'adaptive_system'].includes(inputs.musicBehavior) || inputs.adaptiveFeatures.length > 0;
  if (adaptiveMusic && inputs.whoImplements === 'roger_supports' && inputs.deliveryDepth !== 'audio_files') return true;
  return false;
}

function getMiddlewareWorkLevel(inputs) {
  if (!['fmod', 'wwise'].includes(inputs.middleware)) return 'none';
  if (!isMiddlewareWorkRequired(inputs)) return 'presenceOnly';
  if (inputs.whoImplements === 'roger_implements') return 'implementation';
  if (inputs.deliveryDepth === 'technical_support') return 'substantialSupport';
  return 'lightSupport';
}

function calculateTechnicalContribution(inputs, modelKey) {
  const model = ESTIMATOR_CONFIG.models[modelKey];
  let delivery = model.technical.delivery[inputs.deliveryDepth] || model.technical.delivery.audio_files;
  let qa = model.technical.qa[inputs.qaSupport] || model.technical.qa.light;
  let implementation = model.technical.implementation[inputs.whoImplements] || model.technical.implementation.unknown;
  const middlewareLevel = getMiddlewareWorkLevel(inputs);
  let middleware = model.technical.middleware[middlewareLevel] || model.technical.middleware.none;

  const earlyPrototype = isEarlyValidationPrototype(inputs);
  if (modelKey === 'roger' && earlyPrototype) {
    delivery = multiplyRange(delivery, 0.55);
    qa = multiplyRange(qa, 0.70);
    implementation = multiplyRange(implementation, 0.40);
    middleware = multiplyRange(middleware, 0.40);
  }

  const platformMultiplier = inputs.targetPlatforms === 'multi_platform' ? (modelKey === 'roger' ? 1.08 : 1.14)
    : inputs.targetPlatforms === 'console' ? (modelKey === 'roger' ? 1.05 : 1.10)
      : inputs.targetPlatforms === 'unknown' ? 1.04
        : 1.00;

  // Engine only creates extra cost when Roger is involved technically. Technology alone does not create cost.
  const engineWorkMultiplier = ['roger_supports', 'roger_implements', 'unknown'].includes(inputs.whoImplements)
    && inputs.deliveryDepth === 'technical_support'
    ? (['custom', 'unknown'].includes(inputs.engine) ? 1.08 : 1.00)
    : 1.00;

  const total = multiplyRange(addRanges(addRanges(delivery, qa), addRanges(implementation, middleware)), platformMultiplier * engineWorkMultiplier);

  return {
    ...total,
    deliveryCost: delivery,
    qaCost: qa,
    middlewareCost: middleware,
    implementationCost: implementation,
    middlewarePresenceOnly: ['fmod', 'wwise'].includes(inputs.middleware) && middlewareLevel === 'presenceOnly',
    middlewareWorkRequired: isMiddlewareWorkRequired(inputs),
    middlewareWorkLevel: middlewareLevel,
    platformMultiplier,
    engineWorkMultiplier
  };
}

function calculateCommercialMultipliers(inputs, modelKey = 'roger') {
  const model = ESTIMATOR_CONFIG.models[modelKey];
  const rights = model.commercial.rights[inputs.rightsModel] || model.commercial.rights.unknown;
  const soundtrackUsageMultiplier = model.commercial.usage[inputs.soundtrackUsage] || model.commercial.usage.unknown;
  const marketingUsageMultiplier = model.commercial.usage[inputs.marketingUsage] || model.commercial.usage.unknown;
  const revisionMultiplier = model.commercial.revision[inputs.revisionRounds] || model.commercial.revision.unknown;
  const approvalMultiplier = model.commercial.approval[inputs.approvalStructure] || model.commercial.approval.unknown;
  const urgencyMultiplier = model.commercial.urgency[inputs.timelinePressure] || model.commercial.urgency.unknown;
  const uncertaintyMultiplier = inputs.routing.scopeLessDefined ? (modelKey === 'roger' ? 1.04 : 1.07) : 1.00;

  return {
    rights,
    soundtrackUsageMultiplier,
    marketingUsageMultiplier,
    revisionMultiplier,
    approvalMultiplier,
    urgencyMultiplier,
    uncertaintyMultiplier,
    combinedGlobal: revisionMultiplier * approvalMultiplier * urgencyMultiplier * uncertaintyMultiplier
  };
}

function calculateCommercialAdjustment(inputs, components, multipliers) {
  const musicRights = components.music.mid * (multipliers.rights.music - 1);
  const sfxRights = components.sfx.mid * (multipliers.rights.sfx - 1);
  const trailerRights = components.trailer.mid * (multipliers.rights.trailer - 1);
  const soundtrackUsage = components.music.mid * (multipliers.soundtrackUsageMultiplier - 1);
  const marketingUsage = (components.music.mid + components.trailer.mid) * (multipliers.marketingUsageMultiplier - 1);

  return musicRights + sfxRights + trailerRights + soundtrackUsage + marketingUsage;
}

function applyCommercialToRange(inputs, modelKey, subtotal, components, multipliers) {
  const rights = multipliers.rights;
  const musicRightsRange = multiplyRange(components.music, rights.music - 1);
  const sfxRightsRange = multiplyRange(components.sfx, rights.sfx - 1);
  const trailerRightsRange = multiplyRange(components.trailer, rights.trailer - 1);
  const soundtrackRange = multiplyRange(components.music, multipliers.soundtrackUsageMultiplier - 1);
  const marketingRange = multiplyRange(addRanges(components.music, components.trailer), multipliers.marketingUsageMultiplier - 1);

  let adjusted = addRanges(subtotal, addRanges(addRanges(musicRightsRange, sfxRightsRange), addRanges(trailerRightsRange, addRanges(soundtrackRange, marketingRange))));
  adjusted = multiplyRange(adjusted, multipliers.combinedGlobal);

  return adjusted;
}

function getProfessionalMinimum(inputs, modelKey, scores, flags) {
  const model = ESTIMATOR_CONFIG.models[modelKey];
  let minimum = model.professionalFloors.any;
  if (inputs.trailerNeeded) minimum = Math.max(minimum, model.professionalFloors.trailer);
  if (flags.earlyValidationPrototype) minimum = Math.max(minimum, model.professionalFloors.earlyPrototype);
  if (inputs.musicNeeded && ['layered_stems', 'adaptive_system'].includes(inputs.musicBehavior)) minimum = Math.max(minimum, model.professionalFloors.adaptiveMusic);
  if (inputs.sfxNeeded && ['heavy', 'systemic'].includes(inputs.combatComplexity)) minimum = Math.max(minimum, model.professionalFloors.combatHeavy);
  if (inputs.audioNeed === 'full_audio_package' && flags.middlewareWorkRequired) minimum = Math.max(minimum, model.professionalFloors.fullAudioWithImplementation);
  return minimum;
}

function calculateScores(inputs) {
  const music = calculateMusicScore(inputs);
  const soundDesign = calculateSfxScore(inputs);
  const technical = calculateTechnicalScore(inputs);
  const commercial = calculateCommercialScore(inputs);
  const uncertainty = calculateUncertaintyScore(inputs);
  const trailer = inputs.trailerNeeded ? 35 + (inputs.trailerAudioScope === 'campaign_package' ? 30 : 0) : 0;

  return {
    music,
    soundDesign,
    trailer: Math.min(trailer, 100),
    technical,
    commercial,
    uncertainty,
    totalComplexity: Math.round(music * 0.22 + soundDesign * 0.30 + trailer * 0.10 + technical * 0.18 + commercial * 0.10 + uncertainty * 0.10)
  };
}

function calculateMusicScore(inputs) {
  if (!inputs.musicNeeded) return 0;
  const minutes = calculateMusicMinutes(inputs);
  const amountScore = Math.min(minutes.mid * 1.2, 45);
  const behaviorMap = { linear: 5, simple_loop: 8, seamless_loop_variations: 14, layered_stems: 28, adaptive_system: 40 };
  const adaptiveScore = Math.min(inputs.adaptiveFeatures.length * 6, 30);
  const productionMap = { simple_indie: 4, premium_indie: 8, cinematic_orchestral: 16, hybrid_epic: 18, highly_stylized: 14 };
  return Math.round(Math.min(amountScore + (behaviorMap[inputs.musicBehavior] || 8) + adaptiveScore + (productionMap[inputs.musicProductionLevel] || 8), 100));
}

function calculateSfxScore(inputs) {
  if (!inputs.sfxNeeded) return 0;
  const quantity = getSfxQuantity(inputs);
  const volumeScore = getSfxVolumeScore(quantity);
  const complexityScore = getSfxComplexityScore(inputs);
  const variationScore = getSfxVariationScore(inputs);
  const systemScore = getSfxSystemScore(inputs);
  return Math.round(Math.min(volumeScore * 0.35 + complexityScore * 0.30 + variationScore * 0.20 + systemScore * 0.15, 100));
}

function getSfxVolumeScore(quantity) {
  if (quantity.mid <= 25) return 12;
  if (quantity.mid <= 50) return 25;
  if (quantity.mid <= 100) return 40;
  if (quantity.mid <= 175) return 55;
  if (quantity.mid <= 300) return 72;
  return 90;
}

function getSfxComplexityScore(inputs) {
  const difficulty = calculateSfxDifficulty(inputs);
  return Math.round(clamp((difficulty - 0.70) / (1.85 - 0.70) * 100, 0, 100));
}

function getSfxVariationScore(inputs) {
  const map = { essential: 15, polished: 28, detailed_variations: 48, systemic: 68, hero: 82 };
  return map[inputs.sfxDepth] || 28;
}

function getSfxSystemScore(inputs) {
  let score = 0;
  const combat = { none: 0, light: 8, moderate: 20, heavy: 40, systemic: 58 }[inputs.combatComplexity] || 0;
  const ui = { none: 0, basic_menu: 4, full_hud: 10, inventory_economy: 18, systems_heavy: 28 }[inputs.uiComplexity] || 0;
  const ambience = { none: 0, one_area: 4, few_biomes: 10, many_biomes: 20, dynamic_world: 34 }[inputs.ambienceScope] || 0;
  const cinematic = { none: 0, few_moments: 6, several_scenes: 14, trailer_like: 20, narrative_heavy: 30 }[inputs.cinematicScope] || 0;
  const gameplay = { simple: 0, moderate: 6, systemic: 16, combat_heavy: 24, content_heavy: 18 }[inputs.gameplayComplexity] || 0;
  score += combat + ui + ambience + cinematic + gameplay;
  return Math.min(score, 100);
}

function calculateTechnicalScore(inputs) {
  const delivery = { audio_files: 5, production_ready: 18, technical_support: 38 }[inputs.deliveryDepth] || 10;
  const implementation = { client_team: 0, roger_supports: 18, roger_implements: 42, unknown: 15 }[inputs.whoImplements] || 0;
  const middleware = isMiddlewareWorkRequired(inputs) ? { lightSupport: 12, substantialSupport: 28, implementation: 45 }[getMiddlewareWorkLevel(inputs)] || 0 : 0;
  const qa = { none: 0, light: 4, standard: 10, launch_polish: 22 }[inputs.qaSupport] || 0;
  const platform = { pc: 0, web: 0, mobile: 5, console: 10, multi_platform: 16, unknown: 5 }[inputs.targetPlatforms] || 0;
  return Math.min(delivery + implementation + middleware + qa + platform, 100);
}

function calculateCommercialScore(inputs) {
  let score = 0;
  score += { standard_license: 0, exclusive_license: 16, work_for_hire_buyout: 35, unknown: 10 }[inputs.rightsModel] || 0;
  score += { one: 0, two: 5, three: 10, four_plus: 20, unknown: 8 }[inputs.revisionRounds] || 0;
  score += { solo_founder: 0, small_team: 4, multiple_stakeholders: 14, publisher_client: 20, unknown: 8 }[inputs.approvalStructure] || 0;
  score += { flexible: 0, normal: 2, fixed_milestone: 12, rush: 30, extreme_rush: 45, unknown: 8 }[inputs.timelinePressure] || 0;
  return Math.min(score, 100);
}

function calculateUncertaintyScore(inputs) {
  let score = 0;
  if (inputs.musicNeeded && (inputs.musicAmountBand === 'unknown' || calculateMusicMinutes(inputs).broad)) score += 15;
  if (inputs.sfxNeeded && inputs.sfxQuantityBand === 'unknown') score += 20;
  if (inputs.rightsModel === 'unknown') score += 8;
  if (inputs.whoImplements === 'unknown') score += 10;
  if (inputs.timelinePressure === 'unknown') score += 8;
  if (inputs.routing.scopeLessDefined) score += 12;
  score += Math.min(inputs.unknownAnswerCount * 3, 20);
  return Math.min(score, 100);
}

function calculateConfidence(inputs) {
  let score = 40;
  const materials = normalizeArray(inputs.availableMaterials);
  const materialPoints = {
    playable_build: 30,
    gameplay_video: 25,
    locked_trailer_cut: 25,
    rough_trailer_cut: 15,
    asset_list: 20,
    moodboard: 10,
    commented_music_references: 15,
    general_references: 8,
    no_clear_materials: -25
  };
  materials.forEach((material) => { score += materialPoints[material] || 0; });
  score += { clear: 20, partially_clear: 10, rough: 0, unknown: -10 }[inputs.scopeClarity] || 0;

  if (inputs.sfxNeeded && inputs.sfxQuantityBand === 'unknown') score -= 18;
  if (inputs.musicNeeded && inputs.musicAmountBand === 'unknown') score -= 14;
  if (inputs.musicNeeded && calculateMusicMinutes(inputs).broad) score -= 6;
  if (inputs.routing.scopeLessDefined) score -= 8;
  score -= inputs.unknownAnswerCount * 3;
  score = clamp(score, 0, 100);

  let level = 'Medium';
  if (score <= 44) level = 'Low';
  else if (score >= 75) level = 'High';

  const explanations = {
    Low: 'Several important scope details are still missing, so this estimate remains intentionally broad.',
    Medium: 'The estimate is useful as a planning range, but a build, video, asset list or clearer scope would make it more focused.',
    High: 'Scope and materials are clear enough to provide a focused preliminary range.'
  };

  return { level, score, explanation: explanations[level] };
}

function calculateUncertaintyBuffer(inputs, confidence) {
  if (confidence.level === 'Low') return 0.25;
  if (confidence.level === 'Medium') return 0.12;
  return 0;
}

function calculateCommercialMultiplier(inputs) {
  return calculateCommercialMultipliers(inputs, 'roger');
}

function getRangeControlSettings(inputs, modelKey, confidence, scores, rangeReasons) {
  const highKnown = confidence.level === 'High';
  let lowFactor;
  let highFactor;
  let maxRatio;

  if (modelKey === 'roger') {
    if (confidence.level === 'High') {
      lowFactor = 0.82;
      highFactor = 1.25;
      maxRatio = 1.65;
    } else if (confidence.level === 'Medium') {
      lowFactor = 0.68;
      highFactor = 1.38;
      maxRatio = 2.15;
    } else {
      lowFactor = 0.58;
      highFactor = 1.65;
      maxRatio = 3.00;
    }
  } else {
    if (confidence.level === 'High') {
      lowFactor = 0.68;
      highFactor = 1.48;
      maxRatio = 2.25;
    } else if (confidence.level === 'Medium') {
      lowFactor = 0.60;
      highFactor = 1.72;
      maxRatio = 2.85;
    } else {
      lowFactor = 0.50;
      highFactor = 2.05;
      maxRatio = 3.70;
    }
  }

  if (inputs.sfxNeeded && inputs.sfxQuantityBand === 'unknown') {
    highFactor += 0.20;
    maxRatio += 0.45;
    rangeReasons.push('SFX quantity unknown');
  }

  if (inputs.musicNeeded && inputs.musicAmountBand === 'unknown') {
    highFactor += 0.16;
    maxRatio += 0.35;
    rangeReasons.push('Music amount unknown');
  }

  if (inputs.musicNeeded && calculateMusicMinutes(inputs).broad) {
    highFactor += modelKey === 'roger' ? 0.08 : 0.12;
    maxRatio += modelKey === 'roger' ? 0.15 : 0.25;
    rangeReasons.push('Music amount band is broad');
  }

  if (['rush', 'extreme_rush'].includes(inputs.timelinePressure)) {
    highFactor += modelKey === 'roger' ? 0.12 : 0.20;
    maxRatio += 0.25;
    rangeReasons.push('Timeline pressure');
  }

  if (scores.totalComplexity >= 65) {
    highFactor += modelKey === 'roger' ? 0.12 : 0.18;
    maxRatio += 0.30;
    rangeReasons.push('High complexity scope');
  }

  if (isEarlyValidationPrototype(inputs) && modelKey === 'roger' && highKnown) {
    lowFactor = Math.max(lowFactor, 0.82);
    highFactor = Math.min(highFactor, 1.18);
    maxRatio = Math.min(maxRatio, 1.55);
  }

  return { lowFactor, highFactor, maxRatio };
}

function controlEstimateRange(inputs, modelKey, raw, confidence, scores, floor) {
  const rangeReasons = [];
  const settings = getRangeControlSettings(inputs, modelKey, confidence, scores, rangeReasons);
  const mid = Math.max(raw.mid, floor);

  let low = Math.max(raw.low, mid * settings.lowFactor, floor);
  let high = Math.min(Math.max(raw.high, mid * 1.05), mid * settings.highFactor);
  high = Math.max(high, low + 50);

  let rangeControlled = false;
  const ratioBefore = low > 0 ? high / low : Infinity;
  if (ratioBefore > settings.maxRatio) {
    high = low * settings.maxRatio;
    rangeControlled = true;
  }

  let rounded = outwardRoundRange(low, high);
  rounded = applyMinimumUsefulWidth(rounded, confidence.level);

  const ratioAfter = rounded.min > 0 ? rounded.max / rounded.min : Infinity;
  if (ratioAfter > settings.maxRatio) {
    rounded.max = roundUpBy(rounded.min * settings.maxRatio, getRoundingIncrement(rounded.min * settings.maxRatio));
    rangeControlled = true;
  }

  return {
    min: rounded.min,
    max: rounded.max,
    range: formatRange(rounded.min, rounded.max),
    rangeWidthRatio: rounded.min > 0 ? Number((rounded.max / rounded.min).toFixed(2)) : null,
    rangeWidthReasons: rangeReasons,
    rangeControlled,
    maxAllowedRatio: Number(settings.maxRatio.toFixed(2)),
    controlSettings: settings,
    raw
  };
}

function calculateModelEstimate(inputs, modelKey, scores, confidence, flags) {
  const baseline = calculateProjectBaseline(inputs, modelKey);
  const music = calculateMusicContribution(inputs, modelKey);
  const sfx = calculateSfxContribution(inputs, modelKey);
  const trailer = calculateTrailerContribution(inputs, modelKey);
  const technical = calculateTechnicalContribution(inputs, modelKey);
  const commercialMultipliers = calculateCommercialMultipliers(inputs, modelKey);

  const subtotal = addRanges(addRanges(baseline, music), addRanges(addRanges(sfx, trailer), technical));
  const components = { baseline, music, sfx, trailer, technical };
  const raw = applyCommercialToRange(inputs, modelKey, subtotal, components, commercialMultipliers);
  const commercialAdjustmentMid = raw.mid - subtotal.mid;
  const floor = getProfessionalMinimum(inputs, modelKey, scores, flags);
  const controlled = controlEstimateRange(inputs, modelKey, raw, confidence, scores, floor);

  return {
    min: controlled.min,
    max: controlled.max,
    range: controlled.range,
    components,
    raw,
    commercialMultipliers,
    commercialAdjustmentMid,
    rangeDiagnostics: controlled
  };
}

function calculateComponentPercentageBreakdown(modelEstimate) {
  const mid = modelEstimate.raw.mid || 1;
  const parts = {
    projectBaseline: modelEstimate.components.baseline.mid,
    music: modelEstimate.components.music.mid,
    soundDesign: modelEstimate.components.sfx.mid,
    trailer: modelEstimate.components.trailer.mid,
    technical: modelEstimate.components.technical.mid,
    commercialAdjustments: modelEstimate.commercialAdjustmentMid
  };
  return Object.fromEntries(Object.entries(parts).map(([key, value]) => [key, Math.round((value / mid) * 100)]));
}

function generateDiagnosis(inputs, scores, estimates) {
  const genre = ESTIMATOR_CONFIG.labels.gameGenre[inputs.gameGenre] || 'Game';
  const stage = ESTIMATOR_CONFIG.labels.projectStage[inputs.projectStage] || 'Project';
  const service = ESTIMATOR_CONFIG.labels.audioNeed[inputs.audioNeed] || 'Audio Scope';
  const flags = [];
  if (inputs.sfxNeeded && ['heavy', 'systemic'].includes(inputs.combatComplexity)) flags.push('combat-heavy');
  if (inputs.sfxNeeded && ['full_hud', 'inventory_economy', 'systems_heavy'].includes(inputs.uiComplexity)) flags.push('UI-focused');
  if (inputs.sfxNeeded && ['few_biomes', 'many_biomes', 'dynamic_world'].includes(inputs.ambienceScope)) flags.push('ambience-aware');
  if (inputs.musicNeeded && ['layered_stems', 'adaptive_system'].includes(inputs.musicBehavior)) flags.push('adaptive music');
  if (estimates.roger.components.technical.mid > estimates.roger.raw.mid * 0.18) flags.push('technical-support');

  let focus;
  if (inputs.audioNeed === 'music_only') focus = 'original music as the main audio focus';
  else if (inputs.audioNeed === 'sfx_only') focus = 'custom sound design as the main audio focus';
  else if (inputs.audioNeed === 'trailer_audio') focus = 'trailer audio as the main production focus';
  else focus = 'music and sound design working together';

  const qualifier = flags.length ? `, with ${flags.slice(0, 3).join(', ')} requirements` : '';
  return {
    label: `${genre} ${stage}`,
    serviceLabel: service,
    description: `Your project looks like a ${genre.toLowerCase()} ${stage.toLowerCase()} with ${focus}${qualifier}.`
  };
}

function generateIncluded(inputs) {
  const included = { creative: [], production: [], delivery: [], technical: [] };
  included.production.push('Audio Scope Review');
  included.production.push('Reference Alignment');
  included.production.push('Feedback & Revisions');
  included.production.push('Production Milestones');

  if (inputs.musicNeeded) {
    included.creative.push('Original Music');
    included.creative.push('Sonic Direction');
    if (['layered_stems', 'adaptive_system'].includes(inputs.musicBehavior)) included.creative.push('Adaptive Music Assets');
    if (inputs.musicBehavior === 'layered_stems' || inputs.adaptiveFeatures.includes('vertical_remixing')) included.creative.push('Stems / Layers');
    if (inputs.adaptiveFeatures.includes('transitions')) included.creative.push('Transitions');
    if (inputs.adaptiveFeatures.includes('stingers')) included.creative.push('Stingers');
  }

  if (inputs.sfxNeeded) {
    included.creative.push('Custom Sound Design');
    included.creative.push('Gameplay Audio Planning');
    if (inputs.sfxFamilies.includes('ui')) included.creative.push('UI Sound Design');
    if (['movement', 'jump_dash', 'pickups_rewards', 'notifications', 'environment_interactions'].some((f) => inputs.sfxFamilies.includes(f))) included.creative.push('Gameplay Feedback');
    if (inputs.sfxFamilies.includes('ambience')) included.creative.push('Ambience');
    if (['weapons', 'impacts_damage', 'enemies', 'abilities_magic'].some((f) => inputs.sfxFamilies.includes(f))) included.creative.push('Combat Audio');
    if (['polished', 'detailed_variations', 'systemic', 'hero'].includes(inputs.sfxDepth)) included.delivery.push('Sound Variations');
    included.production.push('Prioritized Asset Planning');
  }

  if (inputs.trailerNeeded) {
    included.creative.push('Trailer Audio');
    included.creative.push('Marketing Deliverables');
  }

  if (['audio_files', 'production_ready', 'technical_support'].includes(inputs.deliveryDepth)) {
    included.delivery.push('Organized Delivery');
    included.delivery.push('Game-ready Exports');
  }
  if (['production_ready', 'technical_support'].includes(inputs.deliveryDepth)) {
    included.delivery.push('Consistent File Naming');
    included.delivery.push('Delivery Notes');
  }
  if (inputs.deliveryDepth === 'technical_support' || inputs.whoImplements !== 'client_team') {
    included.technical.push('Implementation Notes');
    included.technical.push('Technical Support');
  }
  if (isMiddlewareWorkRequired(inputs)) {
    included.technical.push(`${inputs.middleware.toUpperCase()} Support`);
  }
  if (['standard', 'launch_polish'].includes(inputs.qaSupport) && inputs.whoImplements !== 'client_team') {
    included.technical.push('Testing / QA Support');
  }

  Object.keys(included).forEach((key) => {
    included[key] = [...new Set(included[key])];
  });
  return included;
}

function generatePriceDrivers(inputs, scores, confidence) {
  const rules = [
    {
      id: 'content_volume', label: 'Content volume', priority: 96,
      condition: (inputs.sfxNeeded && ['100_175', '175_300', '300_plus'].includes(inputs.sfxQuantityBand)) || (inputs.musicNeeded && ['20_30_min', '30_45_min', '45_60_min', '60_plus_min', '15_30_min'].includes(inputs.musicAmountBand)),
      message: 'This estimate reflects the selected amount of original music and/or custom sound design deliverables.'
    },
    {
      id: 'adaptive_music', label: 'Adaptive music', priority: 94,
      condition: inputs.musicNeeded && (['layered_stems', 'adaptive_system'].includes(inputs.musicBehavior) || inputs.adaptiveFeatures.length > 0),
      message: 'Dynamic music assets add production scope through layers, transitions, stingers or gameplay-reactive structure.'
    },
    {
      id: 'combat_systems', label: 'Combat systems', priority: 90,
      condition: inputs.sfxNeeded && ['moderate', 'heavy', 'systemic'].includes(inputs.combatComplexity),
      message: 'Combat audio involves more feedback layers, variations and system coverage than straightforward UI or ambience work.'
    },
    {
      id: 'technical_work', label: 'Technical work', priority: 86,
      condition: isMiddlewareWorkRequired(inputs) || inputs.whoImplements === 'roger_implements' || inputs.deliveryDepth === 'technical_support',
      message: 'The estimate includes technical support because Roger is involved in preparing or implementing the audio workflow.'
    },
    {
      id: 'production_ready', label: 'Production-ready delivery', priority: 80,
      condition: ['production_ready', 'technical_support'].includes(inputs.deliveryDepth),
      message: 'Delivery includes organized exports, consistent naming and production notes rather than loose WAV files.'
    },
    {
      id: 'timeline_pressure', label: 'Timeline pressure', priority: 78,
      condition: ['fixed_milestone', 'rush', 'extreme_rush'].includes(inputs.timelinePressure),
      message: 'A fixed or rushed milestone reduces scheduling flexibility and increases production pressure.'
    },
    {
      id: 'rights', label: 'Rights and usage', priority: 76,
      condition: ['exclusive_license', 'work_for_hire_buyout'].includes(inputs.rightsModel),
      message: 'Broader rights or buyout terms change the long-term value of the audio usage.'
    },
    {
      id: 'uncertainty', label: 'Scope uncertainty', priority: 70,
      condition: confidence.level === 'Low' || inputs.sfxQuantityBand === 'unknown' || inputs.musicAmountBand === 'unknown',
      message: 'The range stays wider where quantity, materials or scope details are still provisional.'
    }
  ];

  return rules
    .filter((r) => r.condition)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 4)
    .map(({ id, label, message }) => ({ id, label, message }));
}

function generateMissingInfo(inputs) {
  const materials = normalizeArray(inputs.availableMaterials);
  const missing = [];
  if (!materials.includes('playable_build') && !materials.includes('gameplay_video')) missing.push('Gameplay footage or playable build');
  if (inputs.musicNeeded && !materials.includes('commented_music_references') && !['commented_references', 'locked_direction'].includes(inputs.musicReferencesAvailable)) missing.push('Commented music references');
  if (inputs.sfxNeeded && !materials.includes('asset_list')) missing.push('Audio asset list or gameplay system breakdown');
  if (inputs.sfxNeeded && inputs.sfxQuantityBand === 'unknown') missing.push('Approximate SFX quantity');
  if (inputs.musicNeeded && inputs.musicAmountBand === 'unknown') missing.push('Approximate music duration');
  if (inputs.trailerNeeded && !materials.includes('locked_trailer_cut') && !materials.includes('rough_trailer_cut')) missing.push('Trailer cut or rough edit');
  if (inputs.rightsModel === 'unknown') missing.push('Preferred rights model');
  if (inputs.timelinePressure === 'unknown') missing.push('Target milestone or delivery timeline');
  if (isMiddlewareWorkRequired(inputs) && inputs.engine === 'unknown') missing.push('Engine and middleware workflow');
  return missing.slice(0, 6);
}

function generateRangeWidthReasons(inputs, rogerEstimate) {
  const reasons = [...rogerEstimate.rangeDiagnostics.rangeWidthReasons];
  if (inputs.sfxNeeded && inputs.sfxQuantityBand === 'unknown' && !reasons.includes('SFX quantity unknown')) reasons.push('SFX quantity unknown');
  if (inputs.musicNeeded && inputs.musicAmountBand === 'unknown' && !reasons.includes('Music amount unknown')) reasons.push('Music amount unknown');
  if (inputs.musicNeeded && calculateMusicMinutes(inputs).broad && !reasons.includes('Music amount band is broad')) reasons.push('Music amount band is broad');
  if (!reasons.length) reasons.push('Range width is mainly normal execution variance for the selected scope');
  return reasons;
}

function generateFinalEstimate(inputs) {
  const scores = calculateScores(inputs);
  const confidence = calculateConfidence(inputs);
  const flags = {
    earlyValidationPrototype: isEarlyValidationPrototype(inputs),
    middlewareWorkRequired: isMiddlewareWorkRequired(inputs),
    middlewarePresenceOnly: ['fmod', 'wwise'].includes(inputs.middleware) && !isMiddlewareWorkRequired(inputs),
    lowConfidenceWarning: confidence.level === 'Low'
  };

  const roger = calculateModelEstimate(inputs, 'roger', scores, confidence, flags);
  const market = calculateModelEstimate(inputs, 'market', scores, confidence, flags);
  flags.scopeExceedsTypicalStage = roger.components.music.scopeExceedsTypicalStage;
  flags.customQuoteRequired = roger.max >= 120000 || scores.totalComplexity > 88;

  const diagnosis = generateDiagnosis(inputs, scores, { roger, market });
  const included = generateIncluded(inputs);
  const priceDrivers = generatePriceDrivers(inputs, scores, confidence);
  const missingInfo = generateMissingInfo(inputs);
  const rangeWidthReasons = generateRangeWidthReasons(inputs, roger);

  const result = {
    projectProfile: {
      genre: ESTIMATOR_CONFIG.labels.gameGenre[inputs.gameGenre] || inputs.gameGenre,
      stage: ESTIMATOR_CONFIG.labels.projectStage[inputs.projectStage] || inputs.projectStage,
      serviceType: ESTIMATOR_CONFIG.labels.audioNeed[inputs.audioNeed] || inputs.audioNeed,
      diagnosis: diagnosis.description
    },
    diagnosis,
    estimate: {
      roger: {
        min: roger.min,
        max: roger.max,
        range: roger.range,
        label: 'Your Estimated Project Range',
        supportingCopy: 'Based on the scope you selected and Roger’s production structure for indie teams.'
      },
      market: {
        min: market.min,
        max: market.max,
        range: market.range,
        label: 'Typical Professional Range',
        supportingCopy: 'Comparable professional audio scopes often fall around this range.'
      }
    },
    confidence: {
      level: confidence.level,
      score: confidence.score,
      explanation: confidence.explanation
    },
    included,
    priceDrivers,
    missingInfo,
    suggestedNextStep: {
      label: "Let's Talk About Your Game",
      message: "Send me your project details, gameplay or build and I'll turn this estimate into a real production scope.",
      href: '#contact'
    },
    flags,
    scores,
    internalCosts: {
      projectBaseline: roger.components.baseline.mid,
      musicContribution: roger.components.music.mid,
      soundDesignContribution: roger.components.sfx.mid,
      trailerContribution: roger.components.trailer.mid,
      technicalContribution: roger.components.technical.mid,
      commercialAdjustment: roger.commercialAdjustmentMid
    },
    debug: {
      inputs,
      routing: inputs.routing,
      flags,
      confidence,
      scores,
      roger: {
        baseline: roger.components.baseline,
        musicContribution: roger.components.music,
        soundDesignContribution: roger.components.sfx,
        trailerContribution: roger.components.trailer,
        technicalContribution: roger.components.technical,
        commercialMultipliers: roger.commercialMultipliers,
        raw: roger.raw,
        rangeDiagnostics: roger.rangeDiagnostics,
        rangeWidthReasons,
        componentPercentages: calculateComponentPercentageBreakdown(roger),
        pricingCalibration: {
          music: {
            rogerRateLogic: roger.components.music.rogerRateLogic,
            baseLinearMusicRate: roger.components.music.baseLinearMusicRate,
            musicComplexityAdjustment: roger.components.music.musicComplexityAdjustment,
            musicAmountAdjustment: roger.components.music.musicAmountAdjustment,
            adaptiveAdjustment: roger.components.music.adaptiveAdjustment,
            technicalMusicAdjustment: roger.components.music.technicalMusicAdjustment
          },
          soundDesign: {
            rogerSfxBaseRate: roger.components.sfx.rogerSfxBaseRate,
            quantityAdjustment: roger.components.sfx.quantityAdjustment,
            complexityAdjustment: roger.components.sfx.complexityAdjustment,
            variationAdjustment: roger.components.sfx.variationAdjustment,
            systemAdjustment: roger.components.sfx.systemAdjustment
          },
          technical: {
            deliveryCost: roger.components.technical.deliveryCost,
            qaCost: roger.components.technical.qaCost,
            middlewareCost: roger.components.technical.middlewareCost,
            implementationCost: roger.components.technical.implementationCost
          }
        }
      },
      market: {
        baseline: market.components.baseline,
        musicContribution: market.components.music,
        soundDesignContribution: market.components.sfx,
        trailerContribution: market.components.trailer,
        technicalContribution: market.components.technical,
        commercialMultipliers: market.commercialMultipliers,
        raw: market.raw,
        rangeDiagnostics: market.rangeDiagnostics,
        componentPercentages: calculateComponentPercentageBreakdown(market)
      },
      sfx: {
        sfxQuantityBand: inputs.sfxQuantityBand,
        inferredSfxQuantity: roger.components.sfx.sfxQuantity,
        sfxVolumeScore: inputs.sfxNeeded ? getSfxVolumeScore(roger.components.sfx.sfxQuantity) : 0,
        sfxComplexityScore: inputs.sfxNeeded ? getSfxComplexityScore(inputs) : 0,
        sfxVariationScore: inputs.sfxNeeded ? getSfxVariationScore(inputs) : 0,
        sfxSystemScore: inputs.sfxNeeded ? getSfxSystemScore(inputs) : 0
      },
      music: {
        musicAmountBand: inputs.musicAmountBand,
        estimatedMusicMinutes: roger.components.music.minutes,
        musicBehaviorScore: inputs.musicNeeded ? ({ linear: 5, simple_loop: 8, seamless_loop_variations: 14, layered_stems: 28, adaptive_system: 40 }[inputs.musicBehavior] || 8) : 0,
        musicComplexityScore: scores.music,
        musicAdaptiveScore: inputs.musicNeeded ? Math.min(inputs.adaptiveFeatures.length * 6, 30) : 0
      }
    }
  };

  return result;
}

function calculateBaseRangeForCompatibility(inputs) {
  return calculateBaseRange(inputs);
}

function renderIncludedGroup(title, items) {
  if (!items || !items.length) return '';
  return `<article class="included-card"><h4>${title}</h4><ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul></article>`;
}

function renderResult(result) {
  const resultEl = document.getElementById('result');
  resultEl.classList.remove('hidden');

  const includedHtml = [
    renderIncludedGroup('Creative', result.included.creative),
    renderIncludedGroup('Production', result.included.production),
    renderIncludedGroup('Delivery', result.included.delivery),
    renderIncludedGroup('Technical', result.included.technical)
  ].join('');

  const driversHtml = result.priceDrivers.map((driver) => `<li><strong>${driver.label}:</strong> ${driver.message}</li>`).join('');
  const missingHtml = result.missingInfo.length
    ? result.missingInfo.map((item) => `<li>${item}</li>`).join('')
    : '<li>No major missing information for a preliminary estimate.</li>';

  resultEl.innerHTML = `
    <div class="result-header">
      <p class="eyebrow">Project Diagnosis</p>
      <h2>${result.diagnosis.label}</h2>
      <p class="service-label">${result.diagnosis.serviceLabel}</p>
      <p>${result.diagnosis.description}</p>
    </div>

    <div class="estimate-flow">
      <article class="range-card market-card">
        <h3>${result.estimate.market.label}</h3>
        <strong>${result.estimate.market.range}</strong>
        <p>${result.estimate.market.supportingCopy}</p>
      </article>

      <article class="range-card roger-card recommended">
        <h3>${result.estimate.roger.label}</h3>
        <strong>${result.estimate.roger.range}</strong>
        <p>${result.estimate.roger.supportingCopy}</p>
      </article>
    </div>

    <article class="info-card included-section">
      <h3>What's Included</h3>
      <div class="included-grid">${includedHtml}</div>
    </article>

    <div class="result-lists">
      <article class="info-card">
        <h3>Estimate Confidence</h3>
        <p><strong>${result.confidence.level}</strong></p>
        <p>${result.confidence.explanation}</p>
      </article>
      <article class="info-card">
        <h3>What Shapes This Estimate</h3>
        <ul>${driversHtml}</ul>
      </article>
    </div>

    <article class="info-card" style="margin-top: 14px;">
      <h3>To make this estimate more precise</h3>
      <ul>${missingHtml}</ul>
    </article>

    <article class="info-card cta-card" style="margin-top: 14px;">
      <h3>${result.suggestedNextStep.label}</h3>
      <p>${result.suggestedNextStep.message}</p>
      <a class="cta-link" href="${result.suggestedNextStep.href}">Continue to project form</a>
    </article>
  `;
}

function renderDebug(result) {
  const rawOutput = document.getElementById('rawOutput');
  const debugSummary = document.getElementById('debugSummary');
  if (!rawOutput || !debugSummary) return;
  rawOutput.textContent = JSON.stringify(result, null, 2);
  const r = result.debug.roger;
  debugSummary.innerHTML = `
    <div class="debug-grid">
      <div><strong>Roger range</strong><br>${result.estimate.roger.range}</div>
      <div><strong>Market range</strong><br>${result.estimate.market.range}</div>
      <div><strong>Range ratio</strong><br>${r.rangeDiagnostics.rangeWidthRatio}</div>
      <div><strong>Music mid</strong><br>${formatCurrency(r.musicContribution.mid)}</div>
      <div><strong>SFX mid</strong><br>${formatCurrency(r.soundDesignContribution.mid)}</div>
      <div><strong>Technical mid</strong><br>${formatCurrency(r.technicalContribution.mid)}</div>
    </div>
  `;
}

function updateModuleRoutingUI(form) {
  const audioNeed = form.elements.audioNeed.value;
  const routing = getServiceRouting(audioNeed);
  const modules = {
    music: routing.musicActive,
    sfx: routing.sfxActive,
    trailer: routing.trailerActive
  };

  Object.entries(modules).forEach(([module, active]) => {
    const panel = form.querySelector(`[data-module="${module}"]`);
    if (!panel) return;
    panel.classList.toggle('module-disabled', !active);
    panel.querySelectorAll('select, input, textarea, button').forEach((control) => {
      if (control.id === 'sfxScopeHelper') {
        control.disabled = !routing.sfxActive;
      } else {
        control.disabled = !active;
      }
    });
  });

  const message = document.getElementById('routingMessage');
  if (message) {
    const copy = [];
    if (routing.musicActive) copy.push('Music active');
    if (routing.sfxActive) copy.push('Sound design active');
    if (routing.trailerActive) copy.push('Trailer audio active');
    if (!copy.length) copy.push('No audio module active');
    message.textContent = `Routing: ${copy.join(' · ')}`;
  }
}

function initEstimator() {
  const form = document.getElementById('estimatorForm');
  const debugToggle = document.getElementById('debugToggle');
  const debugDetails = document.getElementById('debugDetails');
  if (!form) return;

  updateModuleRoutingUI(form);
  form.elements.audioNeed.addEventListener('change', () => updateModuleRoutingUI(form));

  if (debugToggle && debugDetails) {
    debugToggle.addEventListener('change', () => {
      debugDetails.classList.toggle('hidden', !debugToggle.checked);
    });
  }

  const helper = document.getElementById('sfxScopeHelper');
  if (helper) {
    helper.addEventListener('click', () => {
      alert('Placeholder: this will eventually open a guided SFX scope estimator.');
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputs = collectInputs(form);
    const result = generateFinalEstimate(inputs);
    console.clear();
    console.log('Game Audio Budget Estimator Result:', result);
    renderResult(result);
    renderDebug(result);
  });

  form.addEventListener('reset', () => {
    setTimeout(() => {
      updateModuleRoutingUI(form);
      document.getElementById('result')?.classList.add('hidden');
      const rawOutput = document.getElementById('rawOutput');
      const debugSummary = document.getElementById('debugSummary');
      if (rawOutput) rawOutput.textContent = 'Generate an estimate to see the final object.';
      if (debugSummary) debugSummary.innerHTML = '';
    }, 0);
  });
}

const GameAudioBudgetEstimator = {
  collectInputs,
  calculateBaseRange: calculateBaseRangeForCompatibility,
  calculateMusicScore,
  calculateSfxScore,
  calculateTechnicalScore,
  calculateCommercialMultiplier,
  calculateUncertaintyBuffer,
  generateDiagnosis,
  generatePriceDrivers,
  generateMissingInfo,
  generateFinalEstimate,
  _private: {
    calculateMusicContribution,
    calculateSfxContribution,
    calculateTechnicalContribution,
    calculateModelEstimate,
    getServiceRouting,
    getSfxQuantity,
    isMiddlewareWorkRequired,
    isEarlyValidationPrototype
  }
};

if (typeof window !== 'undefined') {
  window.GameAudioBudgetEstimator = GameAudioBudgetEstimator;
  document.addEventListener('DOMContentLoaded', initEstimator);
}

if (typeof module !== 'undefined') {
  module.exports = GameAudioBudgetEstimator;
}
