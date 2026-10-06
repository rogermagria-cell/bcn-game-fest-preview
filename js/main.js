/* =========================================================
  BUSINESS PAGES — SAFE REVEAL INIT
========================================================== */

(() => {
  document.body.classList.add("js-enabled");

  const revealItems = document.querySelectorAll(".bp-reveal");

  if (!revealItems.length) return;

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });

    return;
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -4% 0px"
  });

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
})();


/* =========================================================
      SLIDER CONTROLS
    ========================================================== */
    const slider = document.getElementById('projectSlider');
    const slideNext = document.getElementById('slideNext');
    const slidePrev = document.getElementById('slidePrev');

    if (slider && slideNext && slidePrev) {
      slideNext.addEventListener('click', () => {
        slider.scrollBy({ left: 560, behavior: 'smooth' });
      });

      slidePrev.addEventListener('click', () => {
        slider.scrollBy({ left: -560, behavior: 'smooth' });
      });
    }

/* =========================================================
  FAQ — DECISION SUPPORT ACCORDION
========================================================== */

(() => {
  const faqItems = document.querySelectorAll(".decision-faq-item");

  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const button = item.querySelector(".decision-faq-question");

    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      faqItems.forEach((otherItem) => {
        const otherButton = otherItem.querySelector(".decision-faq-question");

        otherItem.classList.remove("open");

        if (otherButton) {
          otherButton.setAttribute("aria-expanded", "false");
        }
      });

      if (!isOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
})();

    /* =========================================================
      PROJECT FLIP CARDS
      Desktop: click to flip. Mobile: tap to flip.
    ========================================================== */
    document.querySelectorAll('.flip-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        card.classList.toggle('flipped');
      });
    });

    /* =========================================================
      YEAR
    ========================================================== */
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }


    /* =========================================================
  FEATURED PROJECT MODAL + AUDIO
========================================================== */

const featuredProjects = {
  hammerfall: {
    title: "Hammerfall: Fallen Kingdom",
    genre: "Indie RPG",
    image: "images/Hammerfall.png",
    description: "Fantasy action roguelite featuring original music and sound effects for the game, plus original music for its trailer.",
    audios: [
      {
        title: "Main Theme",
        subtitle: "Fantasy RPG",
        src: "music/Hammerfall_Music.wav"
      },
      {
        title: "Boss Theme",
        subtitle: "Combat / Action",
        src: "music/Hammerfall_Boss.wav"
      },
      {
        title: "Trailer OST",
        subtitle: "Trailer Music",
        src: "music/Hammerfall_Trailer_OST.wav"
      }
    ]
  },

  littleJimmys: {
    title: "Little Jimmy's Nightmare",
    genre: "Action Roguelite",
    image: "images/Little_Jimmys_Nightmare_title.webp",
    description: "Hand-drawn action roguelite featuring sound effects and music for the game, plus music and sound design for its trailers.",
    trailerUrl: "https://www.youtube.com/watch?v=P8_vF7TXcn8",
    audios: [
      {
        title: "Little Jimmy's Nightmare 1",
        subtitle: "Game Music",
        src: "music/Little_Jimmys_Nightmare_1.wav"
      }
    ]
  },

  economicon: {
    title: "Economicon",
    genre: "Automation Tycoon",
    image: "images/Economicon_title.webp",
    description: "Automation and logistics game featuring original music, sound effects and ambient music.",
    audios: [
      {
        title: "Economicon 1",
        subtitle: "Original Music",
        src: "music/Economicon_1.mp3"
      },
      {
        title: "Economicon 2",
        subtitle: "Original Music",
        src: "music/Economicon_2.wav"
      },
      {
        title: "Ambient Music",
        subtitle: "Game Atmosphere",
        src: "music/Economicon Ambiental.mp3"
      }
    ]
  },

  newJourney: {
    title: "A New Journey",
    genre: "Adventure",
    image: "images/A_New_Journey.png",
    description: "Bright adventure music for exploration, discovery and heroic fantasy worlds.",
    audios: [
      {
        title: "Main Theme",
        subtitle: "Adventure / Exploration",
        src: "music/A_New_Journey.wav"
      }
    ]
  },

  astroSpace: {
    title: "Astro Space",
    genre: "SNES Style",
    image: "images/AstroSpace.png",
    description: "Retro sci-fi music inspired by classic console adventures, space travel and arcade energy.",
    audios: [
      {
        title: "Intro Theme",
        subtitle: "Retro Sci-Fi",
        src: "music/AstroSpace_1.wav"
      },
      {
        title: "Exploration Loop",
        subtitle: "Space Travel",
        src: "music/AstroSpace_2.wav"
      },
      {
        title: "Main Theme",
        subtitle: "Arcade Energy",
        src: "music/AstroSpace_3.wav"
      }
    ]
  },

  neonApex: {
    title: "Neon Apex",
    genre: "Synthwave",
    image: "images/Neon_Apex.png",
    description: "High-energy synthwave music for speed, futuristic racing and neon-driven gameplay.",
    audios: [
      {
        title: "Main Theme",
        subtitle: "Synthwave / Racing",
        src: "music/Neon_Apex_Main.wav"
      }
    ]
  },

  hoshiPiyo: {
    title: "Hoshi Piyo",
    genre: "Cute",
    image: "images/Hoshi_Piyo.png",
    description: "Cute, playful and colorful music for charming worlds, soft mechanics and cozy gameplay.",
    audios: [
      {
        title: "Main Theme",
        subtitle: "Cute / Cozy",
        src: "music/HoshiPiyo.wav"
      }
    ]
  },

  bitJourney: {
    title: "16-Bit Journey",
    genre: "16-Bit",
    image: "images/Bit.png",
    description: "Retro 16-bit inspired game music for pixel adventures, platformers and nostalgic worlds.",
    audios: [
      {
        title: "Main Theme",
        subtitle: "16-Bit / Retro",
        src: "music/16_Bit_Journey.wav"
      }
    ]
  },

  neonCity: {
    title: "Neon City",
    genre: "Cyberpunk",
    image: "images/Neon_City.png",
    description: "Dark cyberpunk music for futuristic cities, tension, atmosphere and nocturnal worlds.",
    audios: [
      {
        title: "Main Theme",
        subtitle: "Cyberpunk / Atmosphere",
        src: "music/Neon_City.wav"
      }
    ]
  },

  hellbreak: {
    title: "Hellbreak",
    genre: "Action",
    image: "images/Hellbreak.png",
    description: "Aggressive action music for combat, intensity, danger and high-pressure gameplay.",
    audios: [
      {
        title: "Main Theme",
        subtitle: "Action / Combat",
        src: "music/Hellbreak.wav"
      }
    ]
  },

  dybbuk: {
    title: "Dybbuk",
    genre: "Horror",
    image: "images/Dybbuk.png",
    description: "Dark horror music for tension, fear, mystery and unsettling game atmospheres.",
    audios: [
      {
        title: "Main Theme",
        subtitle: "Horror / Tension",
        src: "music/DYBBUK.wav"
      }
    ]
  }
};

const projectModal = document.getElementById("projectModal");
const projectModalOverlay = document.getElementById("projectModalOverlay");
const projectModalClose = document.getElementById("projectModalClose");
const projectModalBg = document.getElementById("projectModalBg");
const projectModalGenre = document.getElementById("projectModalGenre");
const projectModalTitle = document.getElementById("projectModalTitle");
const projectModalDescription = document.getElementById("projectModalDescription");
const projectModalAudios = document.getElementById("projectModalAudios");
const modalProjectLinks = document.getElementById("modalProjectLinks");

let currentAudio = null;
let currentButton = null;

/* =========================================================
  MODAL AUDIO VISUALIZER VARIABLES
========================================================== */

const visualizerCanvas = document.getElementById("modalVisualizerCanvas");
const visualizerCtx = visualizerCanvas.getContext("2d");

let visualizerAudioContext = null;
let visualizerAnalyser = null;
let visualizerSource = null;
let visualizerAudioElement = null;
let visualizerFrequencyData = null;
let visualizerAnimationId = null;

let visualizerOrbs = [];
let visualizerIsActive = false;

let visualizerPreviousEnergy = 0;
let visualizerPreviousBass = 0;
let visualizerPreviousMids = 0;
let visualizerPreviousTreble = 0;

let visualizerLastBeatTime = 0;
let visualizerBeatPulse = 0;
let visualizerGroovePulse = 0;

let visualizerSmoothedBass = 0;
let visualizerSmoothedLowMids = 0;
let visualizerSmoothedMids = 0;
let visualizerSmoothedHighMids = 0;
let visualizerSmoothedTreble = 0;
let visualizerSmoothedEnergy = 0;
let visualizerSmoothedBrightness = 0;
let visualizerSmoothedDensity = 0;
let visualizerSmoothedRhythm = 0;

let visualizerPalette = {
  bassHue: 18,
  midHue: 220,
  trebleHue: 185,
  accentHue: 178
};

const visualizerState = {
  width: 0,
  height: 0,
  pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
  time: 0
};

function resizeModalVisualizer() {
  if (!visualizerCanvas) return;

  visualizerState.width = window.innerWidth;
  visualizerState.height = window.innerHeight;
  visualizerState.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  visualizerCanvas.width = visualizerState.width * visualizerState.pixelRatio;
  visualizerCanvas.height = visualizerState.height * visualizerState.pixelRatio;

  visualizerCtx.setTransform(
    visualizerState.pixelRatio,
    0,
    0,
    visualizerState.pixelRatio,
    0,
    0
  );
}

window.addEventListener("resize", resizeModalVisualizer);

function resetModalVisualizer() {
  visualizerOrbs = [];

  visualizerPreviousEnergy = 0;
  visualizerPreviousBass = 0;
  visualizerPreviousMids = 0;
  visualizerPreviousTreble = 0;

  visualizerLastBeatTime = 0;
  visualizerBeatPulse = 0;
  visualizerGroovePulse = 0;

  visualizerSmoothedBass = 0;
  visualizerSmoothedLowMids = 0;
  visualizerSmoothedMids = 0;
  visualizerSmoothedHighMids = 0;
  visualizerSmoothedTreble = 0;
  visualizerSmoothedEnergy = 0;
  visualizerSmoothedBrightness = 0;
  visualizerSmoothedDensity = 0;
  visualizerSmoothedRhythm = 0;

  visualizerPalette = {
    bassHue: 10 + Math.random() * 18,
    midHue: 210 + Math.random() * 34,
    trebleHue: 170 + Math.random() * 44,
    accentHue: 175 + Math.random() * 40
  };

  createModalAmbientOrbs();
}

function getVisualizerAverage(start, end) {
  if (!visualizerFrequencyData) return 0;

  let sum = 0;
  let count = 0;

  for (let i = start; i < end; i++) {
    sum += visualizerFrequencyData[i];
    count++;
  }

  return count ? sum / count / 255 : 0;
}

function getVisualizerDensity() {
  if (!visualizerFrequencyData) return 0;

  let activeBins = 0;
  let totalBins = 0;

  for (let i = 4; i < 900; i++) {
    if (visualizerFrequencyData[i] > 38) activeBins++;
    totalBins++;
  }

  return activeBins / totalBins;
}

function getVisualizerBrightness() {
  if (!visualizerFrequencyData) return 0;

  let weightedSum = 0;
  let total = 0;

  for (let i = 10; i < 1000; i++) {
    const value = visualizerFrequencyData[i] / 255;
    weightedSum += value * i;
    total += value;
  }

  if (total === 0) return 0;

  return Math.min(1, weightedSum / total / 700);
}

function updateVisualizerPalette() {
  const targetBassHue =
    8 +
    visualizerSmoothedBass * 20 +
    visualizerSmoothedLowMids * 12;

  const targetMidHue =
    215 +
    visualizerSmoothedMids * 34 -
    visualizerSmoothedBass * 7;

  const targetTrebleHue =
    165 +
    visualizerSmoothedTreble * 60 +
    visualizerSmoothedBrightness * 42;

  const targetAccentHue =
    178 +
    visualizerSmoothedHighMids * 42 +
    visualizerSmoothedDensity * 30;

  visualizerPalette.bassHue += (targetBassHue - visualizerPalette.bassHue) * 0.018;
  visualizerPalette.midHue += (targetMidHue - visualizerPalette.midHue) * 0.018;
  visualizerPalette.trebleHue += (targetTrebleHue - visualizerPalette.trebleHue) * 0.02;
  visualizerPalette.accentHue += (targetAccentHue - visualizerPalette.accentHue) * 0.018;
}

function createSilentVisualizerState() {
  return {
    bass: 0.06,
    lowMids: 0.05,
    mids: 0.06,
    highMids: 0.05,
    treble: 0.05,
    energy: 0.055,
    brightness: 0.25,
    density: 0.06,
    rhythm: 0
  };
}

function analyzeModalAudio() {
  if (!visualizerAnalyser || !visualizerFrequencyData) {
    return createSilentVisualizerState();
  }

  visualizerAnalyser.getByteFrequencyData(visualizerFrequencyData);

  const bass = getVisualizerAverage(2, 22);
  const lowMids = getVisualizerAverage(22, 70);
  const mids = getVisualizerAverage(70, 190);
  const highMids = getVisualizerAverage(190, 420);
  const treble = getVisualizerAverage(420, 1100);

  const density = getVisualizerDensity();
  const brightness = getVisualizerBrightness();

  const energy = Math.min(
    1,
    bass * 0.36 +
      lowMids * 0.22 +
      mids * 0.2 +
      highMids * 0.13 +
      treble * 0.09
  );

  const energyJump = Math.max(0, energy - visualizerPreviousEnergy);
  const bassJump = Math.max(0, bass - visualizerPreviousBass);
  const midsJump = Math.max(0, mids - visualizerPreviousMids);
  const trebleJump = Math.max(0, treble - visualizerPreviousTreble);

  visualizerPreviousEnergy = energy;
  visualizerPreviousBass = bass;
  visualizerPreviousMids = mids;
  visualizerPreviousTreble = treble;

  const rhythm = Math.min(
    1,
    energyJump * 7.5 +
      bassJump * 5.2 +
      midsJump * 1.8 +
      trebleJump * 1.2
  );

  visualizerSmoothedBass += (bass - visualizerSmoothedBass) * 0.08;
  visualizerSmoothedLowMids += (lowMids - visualizerSmoothedLowMids) * 0.08;
  visualizerSmoothedMids += (mids - visualizerSmoothedMids) * 0.08;
  visualizerSmoothedHighMids += (highMids - visualizerSmoothedHighMids) * 0.09;
  visualizerSmoothedTreble += (treble - visualizerSmoothedTreble) * 0.1;
  visualizerSmoothedEnergy += (energy - visualizerSmoothedEnergy) * 0.07;
  visualizerSmoothedBrightness += (brightness - visualizerSmoothedBrightness) * 0.045;
  visualizerSmoothedDensity += (density - visualizerSmoothedDensity) * 0.055;
  visualizerSmoothedRhythm += (rhythm - visualizerSmoothedRhythm) * 0.18;

  updateVisualizerPalette();

  return {
    bass: visualizerSmoothedBass,
    lowMids: visualizerSmoothedLowMids,
    mids: visualizerSmoothedMids,
    highMids: visualizerSmoothedHighMids,
    treble: visualizerSmoothedTreble,
    energy: visualizerSmoothedEnergy,
    brightness: visualizerSmoothedBrightness,
    density: visualizerSmoothedDensity,
    rhythm: visualizerSmoothedRhythm
  };
}

class ModalLightOrb {
  constructor(audio, type = "ambient", isAmbient = false) {
    this.type = type;
    this.isAmbient = isAmbient;

    this.x = Math.random() * visualizerState.width;
    this.y = Math.random() * visualizerState.height;

    if (type === "bass") {
      this.baseSize = 120 + audio.bass * 300 + Math.random() * 170;
      this.hue = visualizerPalette.bassHue + Math.random() * 22;
      this.alpha = 0.07 + audio.bass * 0.16;
      this.lifeMax = 220 + Math.random() * 260;
      this.speed = 0.08 + audio.rhythm * 0.16;
    } else if (type === "mid") {
      this.baseSize = 85 + audio.mids * 210 + Math.random() * 130;
      this.hue = visualizerPalette.midHue + Math.random() * 38;
      this.alpha = 0.06 + audio.mids * 0.14;
      this.lifeMax = 200 + Math.random() * 250;
      this.speed = 0.08 + audio.energy * 0.16;
    } else if (type === "treble") {
      this.baseSize = 16 + audio.treble * 36 + Math.random() * 20;
      this.hue = visualizerPalette.trebleHue + Math.random() * 44;
      this.alpha = 0.12 + audio.treble * 0.22;
      this.lifeMax = 90 + Math.random() * 100;
      this.speed = 0.22 + audio.treble * 0.48;
    } else if (type === "spark") {
      this.baseSize = 8 + Math.random() * 16 + audio.density * 16;
      this.hue = visualizerPalette.accentHue + Math.random() * 36;
      this.alpha = 0.12 + audio.density * 0.16;
      this.lifeMax = 90 + Math.random() * 120;
      this.speed = 0.18 + audio.energy * 0.32;
    } else {
      this.baseSize = 160 + Math.random() * 230;
      this.hue =
        Math.random() < 0.5
          ? visualizerPalette.trebleHue + Math.random() * 34
          : visualizerPalette.midHue + Math.random() * 30;
      this.alpha = 0.05 + Math.random() * 0.06;
      this.lifeMax = 360 + Math.random() * 360;
      this.speed = 0.035 + Math.random() * 0.05;
    }

    this.life = 0;
    this.angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;

    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = 0.004 + Math.random() * 0.012;
    this.breath = Math.random() * Math.PI * 2;
  }

  update(audio) {
    this.life++;
    this.wobble += this.wobbleSpeed;
    this.breath += 0.008 + audio.energy * 0.018;

    const rhythmMovement =
      0.65 +
      audio.energy * 0.55 +
      visualizerGroovePulse * 0.35;

    this.x += this.vx * rhythmMovement + Math.cos(this.wobble) * 0.18;
    this.y += this.vy * rhythmMovement + Math.sin(this.wobble) * 0.18;

    const margin = 320;

    if (this.x < -margin) this.x = visualizerState.width + margin;
    if (this.x > visualizerState.width + margin) this.x = -margin;
    if (this.y < -margin) this.y = visualizerState.height + margin;
    if (this.y > visualizerState.height + margin) this.y = -margin;
  }

  draw(ctx, audio) {
    const progress = this.life / this.lifeMax;
    const fade = this.isAmbient ? 1 : Math.sin(progress * Math.PI);

    const pulseScale =
      1 +
      Math.sin(this.breath) * 0.035 +
      visualizerGroovePulse * (this.type === "treble" || this.type === "spark" ? 0.05 : 0.09);

    const radius = this.baseSize * pulseScale;

    const saturation =
      this.type === "bass"
        ? 68 + audio.energy * 10
        : 58 + audio.energy * 18 + audio.brightness * 12;

    const lightness =
      this.type === "treble" || this.type === "spark"
        ? 52 + audio.treble * 12
        : 38 + audio.energy * 10;

    const alpha =
      this.alpha *
      fade *
      (1 + visualizerGroovePulse * 0.22);

    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      radius
    );

    gradient.addColorStop(
      0,
      `hsla(${this.hue}, ${saturation}%, ${lightness}%, ${alpha})`
    );

    gradient.addColorStop(
      0.28,
      `hsla(${this.hue + 8}, ${Math.max(45, saturation - 8)}%, ${Math.max(30, lightness - 6)}%, ${alpha * 0.48})`
    );

    gradient.addColorStop(
      0.65,
      `hsla(${this.hue + 20}, ${Math.max(38, saturation - 18)}%, ${Math.max(22, lightness - 13)}%, ${alpha * 0.16})`
    );

    gradient.addColorStop(
      1,
      `hsla(${this.hue + 32}, ${Math.max(32, saturation - 24)}%, ${Math.max(16, lightness - 18)}%, 0)`
    );

    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  get dead() {
    return !this.isAmbient && this.life >= this.lifeMax;
  }
}

function createModalAmbientOrbs() {
  const amount = visualizerState.width < 640 ? 3 : 6;

  for (let i = 0; i < amount; i++) {
    visualizerOrbs.push(
      new ModalLightOrb(createSilentVisualizerState(), "ambient", true)
    );
  }
}

function spawnModalOrbs(audio) {
 // disabled
}



function drawModalVisualizerBackground(audio) {
  visualizerCtx.globalCompositeOperation = "source-over";

  const fade = visualizerIsActive
    ? 0.11 - audio.energy * 0.025 + visualizerGroovePulse * 0.006
    : 0.12;

  visualizerCtx.fillStyle = `rgba(5, 5, 10, ${fade})`;
  visualizerCtx.fillRect(0, 0, visualizerState.width, visualizerState.height);

  const gradient = visualizerCtx.createRadialGradient(
    visualizerState.width * 0.5,
    visualizerState.height * 0.48,
    0,
    visualizerState.width * 0.5,
    visualizerState.height * 0.5,
    Math.max(visualizerState.width, visualizerState.height)
  );

  gradient.addColorStop(
    0,
    `hsla(${visualizerPalette.midHue}, 60%, 13%, ${0.035 + audio.mids * 0.045})`
  );

  gradient.addColorStop(
    0.42,
    `hsla(${visualizerPalette.trebleHue}, 58%, 10%, ${0.02 + audio.treble * 0.035})`
  );

  gradient.addColorStop(
    1,
    `hsla(${visualizerPalette.bassHue}, 56%, 7%, 0)`
  );

  visualizerCtx.globalCompositeOperation = "lighter";
  visualizerCtx.fillStyle = gradient;
  visualizerCtx.fillRect(0, 0, visualizerState.width, visualizerState.height);
}

function drawModalOrbs(audio) {
  visualizerOrbs.forEach((orb) => {
    orb.update(audio);
    orb.draw(visualizerCtx, audio);
  });

  visualizerOrbs = visualizerOrbs.filter((orb) => !orb.dead);
}

let softLightOrbs = [];

function createSoftLightOrb(audio) {
  const bass = audio.bass || 0;
  const mids = audio.mids || 0;
  const treble = audio.treble || 0;
  const energy = audio.energy || 0;

  let hue;

  if (bass > mids && bass > treble) {
    hue = 25 + bass * 25; // warm/orange
  } else if (treble > mids) {
    hue = 180 + treble * 45; // cyan/blue
  } else {
    hue = 245 + mids * 45; // blue/purple
  }

  return {
    x: Math.random() * visualizerState.width,
    y: Math.random() * visualizerState.height,
    vx: (Math.random() - 0.5) * (0.25 + energy * 0.6),
    vy: (Math.random() - 0.5) * (0.25 + energy * 0.6),
    size: 120 + energy * 260 + Math.random() * 180,
    hue,
    alpha: 0.025 + energy * 0.13,
    life: 0,
    maxLife: 160 + Math.random() * 160
  };
}

function renderModalVisualizer(audio) {
  if (!visualizerCtx) return;

  const ctx = visualizerCtx;
  const w = visualizerState.width;
  const h = visualizerState.height;

  ctx.globalCompositeOperation = "source-over";

  // Soft fade, instead of hard clear. This makes movement smoother.
  
  ctx.clearRect(0, 0, w, h);

  if (!visualizerIsActive) {
    softLightOrbs = softLightOrbs.filter((orb) => orb.alpha > 0.003);
  } else {
    const energy = audio.energy || 0;
    const rhythm = audio.rhythm || 0;

    // More music energy = more light creation
    const spawnChance = 0.015 + energy * 0.08 + rhythm * 0.12;

    if (Math.random() < spawnChance) {
      softLightOrbs.push(createSoftLightOrb(audio));
    }

    // Small chance for extra pulse on musical peaks
    if (rhythm > 0.22 && Math.random() < 0.35) {
      softLightOrbs.push(createSoftLightOrb(audio));
    }
  }

  ctx.globalCompositeOperation = "lighter";

  softLightOrbs.forEach((orb) => {
    orb.life++;

    const progress = orb.life / orb.maxLife;
    const fade = Math.sin(progress * Math.PI);

    orb.x += orb.vx;
    orb.y += orb.vy;

    const pulse = 1 + (audio.energy || 0) * 0.18 + (audio.rhythm || 0) * 0.25;
    const radius = orb.size * pulse;

    const alpha = orb.alpha * fade * (visualizerIsActive ? 1 : 0.82);

    const gradient = ctx.createRadialGradient(
      orb.x,
      orb.y,
      0,
      orb.x,
      orb.y,
      radius
    );

    gradient.addColorStop(0, `hsla(${orb.hue}, 85%, 64%, ${alpha})`);
    gradient.addColorStop(0.35, `hsla(${orb.hue + 18}, 80%, 52%, ${alpha * 0.38})`);
    gradient.addColorStop(1, `hsla(${orb.hue + 30}, 70%, 35%, 0)`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, radius, 0, Math.PI * 2);
    ctx.fill();
  });

  softLightOrbs = softLightOrbs.filter((orb) => orb.life < orb.maxLife);

  // Limit amount
  if (softLightOrbs.length > 36) {
    softLightOrbs = softLightOrbs.slice(softLightOrbs.length - 36);
  }
}

function animateModalVisualizer(timestamp = 0) {
  visualizerState.time = timestamp;

  visualizerBeatPulse *= 0.85;
  visualizerGroovePulse += (visualizerBeatPulse - visualizerGroovePulse) * 0.07;

  if (visualizerBeatPulse < 0.001) visualizerBeatPulse = 0;
  if (visualizerGroovePulse < 0.001) visualizerGroovePulse = 0;

  const audio = visualizerIsActive
    ? analyzeModalAudio()
    : createSilentVisualizerState();

  renderModalVisualizer(audio);

  visualizerAnimationId = requestAnimationFrame(animateModalVisualizer);
}

async function startModalVisualizer(audioElement) {
  if (!visualizerCanvas || !audioElement) return;

  resizeModalVisualizer();

  try {
    if (!visualizerAudioContext) {
      visualizerAudioContext = new AudioContext();
    }

    if (visualizerAudioContext.state === "suspended") {
      await visualizerAudioContext.resume();
    }

    if (!visualizerAnalyser) {
      visualizerAnalyser = visualizerAudioContext.createAnalyser();
      visualizerAnalyser.fftSize = 4096;
      visualizerAnalyser.smoothingTimeConstant = 0.76;
      visualizerFrequencyData = new Uint8Array(visualizerAnalyser.frequencyBinCount);
    }

    if (visualizerAudioElement) {
      visualizerAudioElement.pause();
      visualizerAudioElement.src = "";
      visualizerAudioElement.load();
    }

    visualizerAudioElement = new Audio(audioElement.src);
    visualizerAudioElement.crossOrigin = "anonymous";
    visualizerAudioElement.volume = 0;
    visualizerAudioElement.currentTime = audioElement.currentTime || 0;

    if (visualizerSource) {
      try {
        visualizerSource.disconnect();
      } catch (error) {}
    }

    visualizerSource = visualizerAudioContext.createMediaElementSource(visualizerAudioElement);
    visualizerSource.connect(visualizerAnalyser);

    visualizerIsActive = true;
    resetModalVisualizer();

    if (!visualizerAnimationId) {
      animateModalVisualizer();
    }

    await visualizerAudioElement.play();

  } catch (error) {
    console.warn("Visualizer disabled, audio will still play:", error);
    visualizerIsActive = false;
  }
}

function pauseModalVisualizer() {
  visualizerIsActive = false;

  if (visualizerAudioElement) {
    visualizerAudioElement.pause();
  }
}

function stopModalVisualizer() {
  visualizerIsActive = false;
  softLightOrbs = [];

  if (visualizerAudioElement) {
    visualizerAudioElement.pause();
    visualizerAudioElement.src = "";
    visualizerAudioElement.load();
    visualizerAudioElement = null;
  }

  if (visualizerSource) {
    try {
      visualizerSource.disconnect();
    } catch (error) {}

    visualizerSource = null;
  }

  if (visualizerAnimationId) {
    cancelAnimationFrame(visualizerAnimationId);
    visualizerAnimationId = null;
  }

  if (visualizerCtx && visualizerCanvas) {
    visualizerCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
  }

  resetModalVisualizer();
}

function stopCurrentAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  if (currentButton) {
    currentButton.textContent = "▶";
  }

  currentAudio = null;
  currentButton = null;
}

function formatAudioTime(seconds) {
  if (!seconds || !isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");

  return `${minutes}:${secs}`;
}

function openProjectModal(project) {
  stopCurrentAudio();

  projectModalBg.style.backgroundImage = `url('${project.image}')`;
  projectModalGenre.textContent = project.genre;
  projectModalTitle.textContent = project.title;
  projectModalDescription.textContent = project.description;

  projectModalAudios.innerHTML = "";

  modalProjectLinks.innerHTML = "";
  modalProjectLinks.hidden = true;

  if (project.trailerUrl) {
    const trailerLink = document.createElement("a");
    trailerLink.className = "modal-trailer-link";
    trailerLink.href = project.trailerUrl;
    trailerLink.target = "_blank";
    trailerLink.rel = "noopener noreferrer";
    trailerLink.setAttribute("aria-label", `Watch the ${project.title} trailer on YouTube`);

    const trailerIcon = document.createElement("span");
    trailerIcon.setAttribute("aria-hidden", "true");
    trailerIcon.textContent = "▶";

    const trailerText = document.createElement("strong");
    trailerText.textContent = "Watch Trailer on YouTube";

    trailerLink.appendChild(trailerIcon);
    trailerLink.appendChild(trailerText);
    modalProjectLinks.appendChild(trailerLink);
    modalProjectLinks.hidden = false;
  }

  project.audios.forEach((audioItem) => {
  const audioRow = document.createElement("div");
  audioRow.className = "modal-audio";

  const playButton = document.createElement("button");
  playButton.className = "modal-play";
  playButton.textContent = "▶";

  const textWrap = document.createElement("div");
  textWrap.innerHTML = `
    <div class="modal-audio-title">${audioItem.title}</div>
    <div class="modal-audio-sub">${audioItem.subtitle}</div>
  `;

  const progressWrap = document.createElement("div");
  progressWrap.className = "modal-progress-wrap";

  const timeRow = document.createElement("div");
  timeRow.className = "modal-time-row";

  const currentTimeEl = document.createElement("span");
  currentTimeEl.textContent = "0:00";

  const durationEl = document.createElement("span");
  durationEl.textContent = "0:00";

  const progressInput = document.createElement("input");
  progressInput.className = "modal-progress";
  progressInput.type = "range";
  progressInput.min = "0";
  progressInput.max = "100";
  progressInput.value = "0";

  timeRow.appendChild(currentTimeEl);
  timeRow.appendChild(durationEl);

  progressWrap.appendChild(timeRow);
  progressWrap.appendChild(progressInput);

  const audio = new Audio(audioItem.src);

  audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatAudioTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    const percent = (audio.currentTime / audio.duration) * 100;
    progressInput.value = percent;
    currentTimeEl.textContent = formatAudioTime(audio.currentTime);
  });

  progressInput.addEventListener("input", () => {
    if (!audio.duration) return;

    const newTime = (progressInput.value / 100) * audio.duration;
    audio.currentTime = newTime;
    if (visualizerAudioElement) {
  visualizerAudioElement.currentTime = newTime;
}
  });

 playButton.addEventListener("click", async () => {
  if (currentAudio === audio && !audio.paused) {
    audio.pause();
    playButton.textContent = "▶";
    pauseModalVisualizer();
    return;
  }

  stopCurrentAudio();

  currentAudio = audio;
  currentButton = playButton;

  try {
  await audio.play();
  playButton.textContent = "❚❚";

  visualizerIsActive = true;
  await startModalVisualizer(audio);

} catch (error) {
  console.warn("Audio could not play:", error);
  playButton.textContent = "▶";
}
});

  audio.addEventListener("ended", () => {
    playButton.textContent = "▶";
    progressInput.value = "0";
    currentTimeEl.textContent = "0:00";
    currentAudio = null;
    currentButton = null;
    pauseModalVisualizer();
  });

  audioRow.appendChild(playButton);
  audioRow.appendChild(textWrap);
  audioRow.appendChild(progressWrap);
  projectModalAudios.appendChild(audioRow);
});

  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  stopCurrentAudio();
  stopModalVisualizer();

  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const projectKey = card.dataset.project;
    const project = featuredProjects[projectKey];

    if (!project) return;

    openProjectModal(project);
  });
});

projectModalOverlay.addEventListener("click", closeProjectModal);
projectModalClose.addEventListener("click", closeProjectModal);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectModal.classList.contains("open")) {
    closeProjectModal();
  }
});

const modalContactBtn = document.getElementById("modalContactBtn");

if (modalContactBtn) {
  modalContactBtn.addEventListener("click", () => {
    closeProjectModal();
  });
}

document.addEventListener("DOMContentLoaded", () => {

  let projectPageAudio = null;
  let projectPageButton = null;

  const buttons = document.querySelectorAll(".mini-play[data-audio]");

  buttons.forEach((button) => {

    button.addEventListener("click", (event) => {

      event.preventDefault();
      event.stopPropagation();

      const audioSrc = button.dataset.audio;

      // Pause same audio
      if (
        projectPageAudio &&
        projectPageButton === button &&
        !projectPageAudio.paused
      ) {

        projectPageAudio.pause();

        button.innerHTML = button.innerHTML.replace("❚❚", "▶");

        return;
      }

      // Stop previous audio
      if (projectPageAudio) {
        projectPageAudio.pause();
        projectPageAudio.currentTime = 0;
      }

      // Reset previous button
      if (projectPageButton) {
        projectPageButton.innerHTML =
          projectPageButton.innerHTML.replace("❚❚", "▶");
      }

      // Create audio
      projectPageAudio = new Audio(audioSrc);

      projectPageAudio.volume = 1;

      projectPageAudio.play();

      projectPageButton = button;

      button.innerHTML =
        button.innerHTML.replace("▶", "❚❚");

      projectPageAudio.addEventListener("ended", () => {

        button.innerHTML =
          button.innerHTML.replace("❚❚", "▶");

        projectPageAudio = null;
        projectPageButton = null;

      });

    });

  });

});

/* =========================================================
  HERO SHOWREEL VIDEO MODAL
========================================================== */

const heroShowreelButton = document.getElementById("heroShowreelButton");
const showreelVideoModal = document.getElementById("showreelVideoModal");
const showreelVideoOverlay = document.getElementById("showreelVideoOverlay");
const showreelVideoClose = document.getElementById("showreelVideoClose");
const showreelVideo = document.getElementById("showreelVideo");

function openShowreelVideo() {
  if (!showreelVideoModal || !showreelVideo) return;

  showreelVideoModal.classList.add("open");
  showreelVideoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  showreelVideo.currentTime = 0;
  showreelVideo.play();
}

function closeShowreelVideo() {
  if (!showreelVideoModal || !showreelVideo) return;

  showreelVideo.pause();
  showreelVideo.currentTime = 0;

  showreelVideoModal.classList.remove("open");
  showreelVideoModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (heroShowreelButton) {
  heroShowreelButton.addEventListener("click", openShowreelVideo);
}

const heroShowreelCta = document.getElementById("heroShowreelCta");

if (heroShowreelCta) {
  heroShowreelCta.addEventListener("click", openShowreelVideo);
}

if (showreelVideoOverlay) {
  showreelVideoOverlay.addEventListener("click", closeShowreelVideo);
}

if (showreelVideoClose) {
  showreelVideoClose.addEventListener("click", closeShowreelVideo);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeShowreelVideo();
  }
});

/* =========================================================
  REAL INFINITE LOGO MARQUEE
========================================================== */

function initLogoMarquee() {
  const track = document.getElementById("logoMarqueeTrack");
  if (!track) return;

  const originalSet = track.querySelector(".studio-logo-set");
  if (!originalSet) return;

  track.querySelectorAll(".studio-logo-set.clone").forEach((clone) => clone.remove());

  const setWidth = originalSet.offsetWidth;
  const marqueeWidth = track.parentElement.offsetWidth;

  if (!setWidth || !marqueeWidth) return;

  track.style.setProperty("--logo-set-width", `${setWidth}px`);

  const copiesNeeded = Math.ceil((marqueeWidth * 2) / setWidth) + 2;

  for (let i = 0; i < copiesNeeded; i++) {
    const clone = originalSet.cloneNode(true);
    clone.classList.add("clone");
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  }
}

window.addEventListener("load", initLogoMarquee);
window.addEventListener("resize", () => {
  clearTimeout(window.logoMarqueeResizeTimer);
  window.logoMarqueeResizeTimer = setTimeout(initLogoMarquee, 200);
});

/* =========================================================
  COUNT UP METRIC
========================================================== */

const countUpElements = document.querySelectorAll(".count-up");

function animateCountUp(element) {
  const target = Number(element.dataset.target);
  const duration = 1400;
  const startTime = performance.now();

  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(easedProgress * target);

    element.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

const countObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    animateCountUp(entry.target);
    observer.unobserve(entry.target);
  });
}, {
  threshold: 0.45
});

countUpElements.forEach((element) => {
  countObserver.observe(element);
});

/* =========================================================
  CONTEXT REEL REVEAL
========================================================== */

const contextReelCard = document.getElementById("contextReelCard");
const contextReelBtn = document.getElementById("contextReelBtn");
const contextReelVideo = document.getElementById("contextReelVideo");

if (contextReelBtn && contextReelCard && contextReelVideo) {
  contextReelBtn.addEventListener("click", () => {

     const buttonAudio = document.getElementById("contextButtonAudio");

      if (buttonAudio) {
        buttonAudio.currentTime = 0;
        buttonAudio.volume = 0.8;
        buttonAudio.play();
      }

    contextReelCard.classList.add("is-revealing");

    setTimeout(() => {
      contextReelCard.classList.add("is-open");
      contextReelVideo.currentTime = 0;
      contextReelVideo.play();
    }, 1750);
  });
}

const contextVideoClose = document.getElementById("contextVideoClose");

function closeContextReel() {
  const closeAudio = document.getElementById("contextCloseAudio");

  if (closeAudio) {
    closeAudio.currentTime = 0;
    closeAudio.volume = 0.85;
    closeAudio.play();
  }

  if (contextReelVideo) {
    contextReelVideo.pause();
    contextReelVideo.currentTime = 0;
  }

  if (contextReelCard) {
    contextReelCard.classList.remove("is-open");
    contextReelCard.classList.remove("is-revealing");
  }
}

if (contextVideoClose) {
  contextVideoClose.addEventListener("click", closeContextReel);
}

/* =========================================================
  IF THIS SOUNDS FAMILIAR — ANIMATED LIST
========================================================== */

const familiarList = document.getElementById("familiarAnimatedList");

if (familiarList) {
  const familiarItems = familiarList.querySelectorAll(".familiar-list-item");

  const familiarListObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      familiarItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("is-visible");
        }, index * 260);
      });

      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.35
  });

  familiarListObserver.observe(familiarList);
}

/* =========================================================
  WORKING TOGETHER — PROCESS MAP INTERACTION
========================================================== */

(() => {
  const section = document.querySelector(".process-map-section");
  const map = document.getElementById("processMap");

  if (!section || !map) return;

  const points = map.querySelectorAll(".process-point");

  const revealProcessMap = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      section.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.28
  });

  revealProcessMap.observe(section);

  function activatePoint(point) {
    const pointNumber = point.dataset.point;

    map.dataset.active = pointNumber;
    map.classList.add("is-interacting");

    points.forEach((item) => {
      item.classList.toggle("is-active", item === point);
    });
  }

  function clearPoint() {
    map.removeAttribute("data-active");
    map.classList.remove("is-interacting");

    points.forEach((item) => {
      item.classList.remove("is-active");
    });
  }

  points.forEach((point) => {
    point.addEventListener("mouseenter", () => activatePoint(point));
    point.addEventListener("focus", () => activatePoint(point));

    point.addEventListener("mouseleave", clearPoint);
    point.addEventListener("blur", clearPoint);
  });
})();

/* =========================================================
  CLIENT FEEDBACK — SIMULATED MESSAGING APP / SAFE LOOP
========================================================== */

(() => {
const chatWindow = document.getElementById("clientChatWindow");
const messagesContainer = document.getElementById("clientChatMessages");

if (!chatWindow || !messagesContainer) return;

  const reviews = [
    {
      country: "Canada",
      flag: "🇨🇦",
      username: "steveco",
      project: "WildSlab Studio",
      rating: 5,
      review: "Second project working with Roger, he took the time to really understand our needs and delivered exceptional sounds and music that really fits our game perfectly.",
      date: "1 month ago",
      repeatClient: true
    },
    {
      country: "United States",
      flag: "🇺🇸",
      username: "robIns_wing_ven",
      project: "Whisker Wars: For Glory",
      rating: 5,
      review: "Took on a massive job and did incredible work. He went above and beyond in making sure things lined up well in the game and responded promptly to the very few revisions needed. Communicated very well what he needed to get things done right.",
      date: "1 month ago",
      repeatClient: true
    },
    {
      country: "United States",
      flag: "🇺🇸",
      username: "louls_arc",
      project: "Fat Samurai Games • Fedorable Life",
      rating: 5,
      review: "So I had a very vague prompt of 'something Persona 4 sounding' for my comedy game, but honestly when I clicked play and the music started, I couldn't help but smile at how he was able to capture the sound of it so well. For $25, this was a great deal!",
      date: "2 months ago",
      repeatClient: false
    },
    {
      country: "United States",
      flag: "🇺🇸",
      username: "novaughn111",
      project: "Astro5",
      rating: 5,
      review: "The delivered music demonstrates exceptional technical proficiency and a deep understanding of the game's atmospheric requirements. Your attention to detail and ability to translate complex conceptual briefs into polished audio assets provided exactly the nuance this project required. Given the high quality of the work delivered, I look forward to collaborating again.",
      date: "2 months ago",
      repeatClient: false
    },
    {
      country: "Canada",
      flag: "🇨🇦",
      username: "lafim_md",
      project: "Professional Animator",
      rating: 5,
      review: "Roger is responsive and got the concept of the project being worked on right away. Safe to say he delivered. Thanks.",
      date: "1 month ago",
      repeatClient: false
    },
    {
      country: "Mexico",
      flag: "🇲🇽",
      username: "donbonk",
      project: "Voxel Video Game",
      rating: 5,
      review: "Communication was great and the delivery time exceeded expectations. Roger perfectly captured the sound style I was looking for. He's incredibly easy to work with, and I will definitely hire him again in the future!",
      date: "1 month ago",
      repeatClient: false
    },
    {
      country: "United States",
      flag: "🇺🇸",
      username: "unlxity634",
      project: "Eterna Online Studios",
      rating: 5,
      review: "Holy f***... this guy is insane... well worth every dime.",
      date: "3 weeks ago",
      repeatClient: false
    },
    {
      country: "United States",
      flag: "🇺🇸",
      username: "Jacksont17",
      project: "Memorize Bible App",
      rating: 5,
      review: "Very high quality!",
      date: "1 month ago",
      repeatClient: false
    },
    {
      country: "Spain",
      flag: "🇪🇸",
      username: "kledd_al",
      project: "Fortnite Miner Simulator",
      rating: 5,
      review: "Exactly what I was looking for. Highly recommended.",
      date: "2 months ago",
      repeatClient: false
    },
    {
      country: "United States",
      flag: "🇺🇸",
      username: "unlxity634",
      project: "Eterna Online Studios",
      rating: 5,
      review: "TIP THIS MAN, HIS SOUNDS ARE NEXT LEVEL.",
      date: "2 months ago",
      repeatClient: false
    },
    {
      country: "United Kingdom",
      flag: "🇬🇧",
      username: "mlkeje111",
      project: "",
      rating: 5,
      review: "Roger understood exactly what I was after and knew what to do.",
      date: "3 months ago",
      repeatClient: false
    },
    {
      country: "United States",
      flag: "🇺🇸",
      username: "unlxity634",
      project: "Eterna Online Studios",
      rating: 5,
      review: "AMAZING JOB AS ALWAYS.",
      date: "3 months ago",
      repeatClient: false
    },
    {
      country: "Canada",
      flag: "🇨🇦",
      username: "steveco",
      project: "WildSlab Studio",
      rating: 5,
      review: "Second time working with Roger, exceptional work just like the last time. Great attention to detail and quick delivery.",
      date: "3 months ago",
      repeatClient: true
    },
    {
      country: "Netherlands",
      flag: "🇳🇱",
      username: "Aruna Ray",
      project: "Sillyversum Games",
      rating: 5,
      review: "It is very fun working with Roger. He works not only fast, but is very open to ideas and learns quickly. For the price, it's definitely a good deal.",
      date: "3 months ago",
      repeatClient: false
    },
    {
      country: "France",
      flag: "🇫🇷",
      username: "tayko88",
      project: "Minecraft Mod",
      rating: 5,
      review: "Fast delivery and very well priced for the quality. Highly recommended.",
      date: "3 months ago",
      repeatClient: false
    },
    {
      country: "Spain",
      flag: "🇪🇸",
      username: "iron_anvil_game",
      project: "Iron Anvil Studio • HammerFall: Fallen Kingdom",
      rating: 5,
      review: "Resultado final excelente y siempre abierto a revisiones y mejorar.",
      date: "3 months ago",
      repeatClient: false
    },
    {
      country: "United States",
      flag: "🇺🇸",
      username: "unlxity634",
      project: "Eterna Online Studios",
      rating: 5,
      review: "HE DID IT INSANELY WELL. I AM IMPRESSED. HE RUSHED DELIVERY TOO AND STILL HIT THE MARK!",
      date: "3 months ago",
      repeatClient: false
    },
    {
      country: "Canada",
      flag: "🇨🇦",
      username: "steveco",
      project: "WildSlab Studio",
      rating: 5,
      review: "It was my first time ordering music and SFX work. Roger was very helpful in understanding our needs and delivered exceptional results.",
      date: "3 months ago",
      repeatClient: false
    },
    {
      country: "Spain",
      flag: "🇪🇸",
      username: "iron_anvil_game",
      project: "Iron Anvil Studio • HammerFall: Fallen Kingdom",
      rating: 5,
      review: "Nunca pensé que encontraría un profesional que adaptase tan bien la música a mi videojuego. Un artista como pocos he visto.",
      date: "3 months ago",
      repeatClient: false
    },
    {
      country: "Netherlands",
      flag: "🇳🇱",
      username: "Aruna Ray",
      project: "Sillyversum Games",
      rating: 5,
      review: "Very kind dude. Responds quickly and comes up with ideas quickly while you communicate.",
      date: "3 months ago",
      repeatClient: false
    },
    {
      country: "Italy",
      flag: "🇮🇹",
      username: "gwynbledd95",
      project: "",
      rating: 5,
      review: "Great seller, great communication.",
      date: "4 months ago",
      repeatClient: false
    },
    {
      country: "Spain",
      flag: "🇪🇸",
      username: "iron_anvil_game",
      project: "Iron Anvil Studio • HammerFall: Fallen Kingdom",
      rating: 5,
      review: "Un profesional como pocos he visto. Entendió enseguida lo que queríamos y fue ágil y rápido en su trabajo. La calidad del sonido superó mis expectativas.",
      date: "4 months ago",
      repeatClient: false
    },
    {
      country: "Netherlands",
      flag: "🇳🇱",
      username: "andrevz",
      project: "Music Producer",
      rating: 5,
      review: "This is the second time I have worked with Roger and once again I am absolutely satisfied with his professionalism, speed of delivery, and the genuine care he puts into his work. Many thanks again, and I will definitely be back soon.",
      date: "5 months ago",
      repeatClient: true
    },
    {
      country: "United Kingdom",
      flag: "🇬🇧",
      username: "townofdudleyslx",
      project: "",
      rating: 5,
      review: "Roger was a star to work with! Really understood what I was after and went above and beyond in offering a clean loop soundtrack. He kept me informed throughout the process, asked questions to make sure we were heading in the right direction, and summarized the project before starting to ensure everything was aligned.",
      date: "5 months ago",
      repeatClient: false
    },
    {
      country: "Netherlands",
      flag: "🇳🇱",
      username: "andrevz",
      project: "Music Producer",
      rating: 5,
      review: "I am extremely happy with Roger's input and support. He made sure that the track I am currently working on sounds much more refined and expansive, adding exactly the goosebump moment it needed. Looking forward to collaborating again.",
      date: "5 months ago",
      repeatClient: false
    },
    {
      country: "Sweden",
      flag: "🇸🇪",
      username: "sherzul",
      project: "Little Jimmy's Nightmare",
      rating: 5,
      review: "Roger showed a strong understanding of the exact feeling and atmosphere we wanted to create in our game. With relatively few and somewhat vague references, he delivered fantastic sound effects in a short amount of time. After a constructive dialogue, the results became exactly what we were looking for.",
      date: "5 months ago",
      repeatClient: false
    },
    {
      country: "Brazil",
      flag: "🇧🇷",
      username: "meusnegclos724",
      project: "Over Delivery Mobile App",
      rating: 5,
      review: "Roger was exceptional! He perfectly understood the specific needs of our app and guided us through the selection process with great patience. He delivered high-quality sounds, was technically precise, and the final result exceeded our expectations.",
      date: "6 months ago",
      repeatClient: false
    },
    {
      country: "Argentina",
      flag: "🇦🇷",
      username: "emanueldcosmo",
      project: "Fracturas • Tower Defense Roguelite",
      rating: 5,
      review: "Excelente trabajo de Roger. Entendió a la perfección el pedido que le hice. La entrega fue en tiempo y forma y la calidad de los SFX es premium. Su tiempo de respuesta es súper rápido. Sin duda volveré a trabajar con Roger.",
      date: "2 days ago",
      repeatClient: false
    }
  ];

if (!reviews.length) return;

const MAX_STORED_MESSAGES = 40;
const INITIAL_VISIBLE_MESSAGES = 3;

const fallbackReview = reviews[0];

let messageHistory = [];
let started = false;
let nextSide = "right";
let nextCycleTimer = null;

const timers = new Set();

function setSafeTimeout(callback, delay) {
  const timer = window.setTimeout(() => {
    timers.delete(timer);
    callback();
  }, delay);

  timers.add(timer);
  return timer;
}

function clearSafeTimeout(timer) {
  if (!timer) return;

  window.clearTimeout(timer);
  timers.delete(timer);
}

function clearAllTimers() {
  timers.forEach((timer) => window.clearTimeout(timer));
  timers.clear();
  nextCycleTimer = null;
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getSafeRandomReview() {
  if (!reviews.length) return fallbackReview;

  const randomIndex = Math.floor(Math.random() * reviews.length);
  return reviews[randomIndex] || fallbackReview;
}

function getStars(rating) {
  const safeRating = Number.isFinite(rating) ? rating : 5;
  return "★".repeat(Math.max(1, Math.min(5, safeRating)));
}

function getBubbleSize(review) {
  const length = review?.review?.length || 0;

  if (length < 70) return "short";
  if (length < 180) return "medium";

  return "long";
}

function getNextSide() {
  nextSide = nextSide === "left" ? "right" : "left";
  return nextSide;
}

function createMessageObject(review) {
  return {
    id: `review-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    side: getNextSide(),
    review: review || fallbackReview
  };
}

function isNearBottom() {
  const distanceFromBottom =
    messagesContainer.scrollHeight -
    messagesContainer.scrollTop -
    messagesContainer.clientHeight;

  return distanceFromBottom < 90;
}

function scrollChatToBottom(behavior = "smooth") {
  messagesContainer.scrollTo({
    top: messagesContainer.scrollHeight,
    behavior
  });
}

function buildMessageElement(message) {
  const item = message.review || fallbackReview;

  const messageElement = document.createElement("div");
  messageElement.className = `client-chat-message from-${message.side}`;
  messageElement.dataset.messageId = message.id;

  const project = item.project
    ? `<span class="client-chat-project">${escapeHTML(item.project)}</span>`
    : "";

  messageElement.innerHTML = `
    <article class="client-chat-bubble size-${getBubbleSize(item)}">
      <div class="client-chat-info">
        <div>
          <span class="client-chat-country">${escapeHTML(item.flag)} ${escapeHTML(item.country)}</span>
          <span class="client-chat-user">${escapeHTML(item.username)}</span>
          ${project}
        </div>

        ${item.repeatClient ? `<span class="client-chat-repeat">Repeat Client</span>` : ""}
      </div>

      <div class="client-chat-stars">${getStars(item.rating)}</div>

      <p class="client-chat-review">${escapeHTML(item.review)}</p>

      <span class="client-chat-date">${escapeHTML(item.date)}</span>
    </article>
  `;

  return messageElement;
}

function syncMessagesDOM(shouldStickToBottom = false) {
  const activeIds = new Set(messageHistory.map((message) => message.id));
  const existingNodes = Array.from(messagesContainer.querySelectorAll(".client-chat-message"));

  messageHistory.forEach((message) => {
    let node = messagesContainer.querySelector(`[data-message-id="${message.id}"]`);

    if (!node) {
      node = buildMessageElement(message);
      messagesContainer.appendChild(node);

      requestAnimationFrame(() => {
        node.classList.add("is-visible");
      });

      return;
    }

    messagesContainer.appendChild(node);
  });

  existingNodes.forEach((node) => {
    if (activeIds.has(node.dataset.messageId)) return;
    node.remove();
  });

  if (shouldStickToBottom) {
    requestAnimationFrame(() => {
      scrollChatToBottom("smooth");
    });
  }
}

function setMessageHistory(updater, options = {}) {
  const previousMessages = Array.isArray(messageHistory)
    ? [...messageHistory]
    : [];

  let nextMessages = updater(previousMessages);

  if (!Array.isArray(nextMessages) || !nextMessages.length) {
    nextMessages = previousMessages.length
      ? previousMessages
      : [createMessageObject(fallbackReview)];
  }

  messageHistory = nextMessages.slice(-MAX_STORED_MESSAGES);

  syncMessagesDOM(options.stickToBottom);
}

function addNextReview() {
  if (!reviews.length) return;

  const selectedReview = getSafeRandomReview();
  const nextMessage = createMessageObject(selectedReview);
  const shouldAutoScroll = isNearBottom();

  setMessageHistory((previousMessages) => {
    const safePreviousMessages = previousMessages.length
      ? previousMessages
      : [createMessageObject(fallbackReview)];

    return [...safePreviousMessages, nextMessage];
  }, {
    stickToBottom: shouldAutoScroll
  });

  scheduleNextReview();
}

function scheduleNextReview() {
  if (!started || !reviews.length) return;

  clearSafeTimeout(nextCycleTimer);

  nextCycleTimer = setSafeTimeout(() => {
    addNextReview();
  }, 2800 + Math.random() * 1800);
}

function startChat() {
  if (started || !reviews.length) return;

  started = true;

  messageHistory = Array.from({ length: INITIAL_VISIBLE_MESSAGES }, () => {
    return createMessageObject(getSafeRandomReview());
  });

  syncMessagesDOM(true);
  scheduleNextReview();
}

function stopChat() {
  clearAllTimers();
}

chatWindow.addEventListener("wheel", (event) => {
  const isInsideMessages = messagesContainer.contains(event.target);

  if (isInsideMessages) return;

  messagesContainer.scrollTop += event.deltaY;
  event.preventDefault();
}, {
  passive: false
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    startChat();
  });
}, {
  threshold: 0.24
});

observer.observe(chatWindow);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopChat();
    return;
  }

  if (started) {
    scheduleNextReview();
  }
});

window.addEventListener("pagehide", stopChat);
window.addEventListener("beforeunload", stopChat);
})();

/* =========================================================
  ABOUT — EDITORIAL EXPAND STORY + PORTRAIT
========================================================== */

(() => {
  const about = document.getElementById("editorialAbout");
  const expanded = document.getElementById("editorialAboutExpanded");
  const toggle = document.getElementById("editorialAboutToggle");
  const portrait = document.getElementById("editorialAboutPortrait");

  if (!about || !expanded || !toggle) return;

  const paragraphs = about.querySelectorAll(".editorial-about-story p");

  const paragraphObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
    });
  }, {
    threshold: 0.14,
    rootMargin: "0px 0px -6% 0px"
  });

  paragraphs.forEach((paragraph, index) => {
    paragraph.style.transitionDelay = `${Math.min(index * 18, 140)}ms`;
    paragraphObserver.observe(paragraph);
  });

  function scrollToAboutTop() {
    about.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function openAbout() {
    about.classList.remove("is-collapsing");
    about.classList.add("is-expanded");

    toggle.setAttribute("aria-expanded", "true");
    toggle.textContent = "Show less ↑";
  }

  function closeAbout() {
    about.classList.add("is-collapsing");

    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Continue reading ↓";

    setTimeout(() => {
      about.classList.remove("is-expanded");
      about.classList.remove("is-collapsing");

      scrollToAboutTop();
    }, 320);
  }

  function updatePortraitShift() {
    if (!portrait || window.innerWidth <= 900) return;

    const section = document.getElementById("about");
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const progress = total > 0
      ? Math.min(1, Math.max(0, Math.abs(rect.top) / total))
      : 0;

    const shift = progress * -20;
    portrait.style.setProperty("--about-photo-shift", `${shift}px`);
  }

  toggle.addEventListener("click", () => {
    const isExpanded = about.classList.contains("is-expanded");

    if (isExpanded) {
      closeAbout();
      return;
    }

    openAbout();
  });

  window.addEventListener("scroll", updatePortraitShift, { passive: true });
  window.addEventListener("resize", updatePortraitShift);

  updatePortraitShift();
})();

/* =========================================================
  FINAL CTA — SCROLL, REVEAL + CONTACT FOCUS
========================================================== */

(() => {
  const finalSection = document.getElementById("final-conversation");
  const finalCard = document.getElementById("finalConversationCard");
  const finalCta = document.getElementById("finalConversationCta");
  const contactSection = document.getElementById("contact");

  if (!finalSection || !finalCard) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      finalCard.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.28
  });

  revealObserver.observe(finalSection);

  if (!finalCta || !contactSection) return;

  finalCta.addEventListener("click", (event) => {
    event.preventDefault();

    contactSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    window.setTimeout(() => {
      const contactCard = contactSection.querySelector(".card");
      const firstField = contactSection.querySelector("input, textarea, select");

      if (contactCard) {
        contactCard.classList.remove("contact-form-highlight");
        void contactCard.offsetWidth;
        contactCard.classList.add("contact-form-highlight");
      }

      if (firstField) {
        firstField.focus({ preventScroll: true });
      }
    }, 850);
  });
})();

/* =========================================================
  CONTACT — PROJECT CONVERSATION FORM
========================================================== */

(() => {
  const contactSection = document.getElementById("contact");
  const contactForm = document.getElementById("conversationContactForm");

  if (!contactSection || !contactForm) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      contactSection.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.18
  });

  revealObserver.observe(contactSection);

  contactForm.querySelectorAll(".conversation-pill-group").forEach((group) => {
    const groupName = group.dataset.pillGroup;
    const hiddenInput = contactForm.querySelector(`input[name="${groupName}"]`);

    group.querySelectorAll(".conversation-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        group.querySelectorAll(".conversation-pill").forEach((item) => {
          item.classList.remove("is-selected");
        });

        pill.classList.add("is-selected");

        if (hiddenInput) {
          hiddenInput.value = pill.dataset.value || pill.textContent.trim();
        }
      });
    });
  });
})();

/* =========================================================
  BUSINESS PAGES — REVEAL + UI PLACEHOLDERS
========================================================== */

(() => {
  const revealItems = document.querySelectorAll(".bp-reveal");

  if (revealItems.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.16,
      rootMargin: "0px 0px -6% 0px"
    });

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  }

  document.querySelectorAll(".estimator-pills").forEach((group) => {
    const buttons = group.querySelectorAll("button");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((item) => {
          item.classList.remove("is-selected");
        });

        button.classList.add("is-selected");
      });
    });
  });

  document.querySelectorAll("[data-scroll-contact]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const contact = document.getElementById("contact");

      if (!contact) return;

      event.preventDefault();

      contact.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
})();
