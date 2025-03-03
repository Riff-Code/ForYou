// Konfigurasi Responsif Partikel
const getParticleConfig = () => ({
  particles: {
    number: {
      value: window.innerWidth < 768 ? 50 : 100,
    },
    color: { value: "#ff85c0" },
    shape: { type: "circle" },
    opacity: {
      value: 0.5,
      random: true,
    },
    size: {
      value: window.innerWidth < 768 ? 2 : 2.5,
      random: true,
    },
    move: {
      enable: true,
      speed: window.innerWidth < 768 ? 1 : 1.5,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      smooth: true,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
        distance: window.innerWidth < 768 ? 80 : 120,
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: window.innerWidth < 768 ? 50 : 80,
        duration: 0.6,
      },
    },
  },
});

// Konfigurasi Lirik
const lyricsConfig = [
  {
    text: "For You❤️",
    start: 0,
    fadeIn: 1,
    fadeOut: 1,
  },
  {
    text: "Kumulai lagu ini dengan bernyanyi",
    start: 18,
    fadeIn: 1,
    fadeOut: 1,
  },
  { text: "Du-dudu-dudu-dudu", start: 21.5, fadeIn: 0.5, fadeOut: 0.5 },
  {
    text: "Waktu berhenti khayal menari-nari",
    start: 25,
    fadeIn: 1,
    fadeOut: 1,
  },
  {
    text: "Hanyut ke dalam senyummu",
    start: 30,
    fadeIn: 1.2,
    fadeOut: 0.8,
  },
  {
    text: "Tak peduli langit menertawakanku",
    start: 34,
    fadeIn: 1,
    fadeOut: 1,
  },
  {
    text: "Kau mencuri hatiku, mimpiku, semua rinduku",
    start: 43,
    fadeIn: 1.5,
    fadeOut: 1.5,
  },
  { text: "Kar'na kamu cantik", start: 52, fadeIn: 0.8, fadeOut: 0.8 },
  {
    text: "'Kan kuberi s'galanya apa yang kupunya",
    start: 56,
    fadeIn: 1,
    fadeOut: 1,
  },
  { text: "Dan hatimu baik", start: 61, fadeIn: 0.7, fadeOut: 0.7 },
  {
    text: "Sempurnalah duniaku saat kau di sisiku",
    start: 64.5,
    fadeIn: 1.5,
    fadeOut: 1.5,
  },
  {
    text: "Bukan kar'na make up di wajahmu",
    start: 73,
    fadeIn: 1,
    fadeOut: 1,
  },
  {
    text: "Atau lipstik merah itu (di bibirmu)",
    start: 77,
    fadeIn: 1,
    fadeOut: 1,
  },
  { text: "Lembut hati tutur kata", start: 81.5, fadeIn: 1, fadeOut: 1 },
  {
    text: "Terciptalah cinta yang kupuja",
    start: 85,
    fadeIn: 1,
    fadeOut: 1,
  },
  {
    text: "Tak peduli langit menertawakanku",
    start: 90,
    fadeIn: 1,
    fadeOut: 1,
  },
  {
    text: "Kau mencuri hatiku, mimipiku, semua rinduku",
    start: 98,
    fadeIn: 1.2,
    fadeOut: 1.2,
  },
  { text: "Kar'na kamu cantik", start: 108.5, fadeIn: 0.8, fadeOut: 0.8 },
  {
    text: "'Kan kuberi s'galanya apa yang kupunya",
    start: 112.5,
    fadeIn: 1,
    fadeOut: 1,
  },
  { text: "Dan hatimu baik", start: 117, fadeIn: 0.7, fadeOut: 0.7 },
  {
    text: "Sempurnalah duniaku saat kau di sisiku",
    start: 120.5,
    fadeIn: 1.5,
    fadeOut: 1.5,
  },
];

// Sistem Utama
let floatingElements = [];
let currentLyric = -1;
const audio = document.getElementById("background-music");
const lyricsContainer = document.getElementById("lyrics-container");

const initParticles = () => particlesJS("particles-js", getParticleConfig());

const createFloatingElements = () => {
  floatingElements.forEach((el) => el.remove());
  floatingElements = [];

  const elements = ["🌸", "💮", "🌺", "🌷", "💖", "✨"];
  const count = window.innerWidth < 768 ? 15 : 20;

  for (let i = 0; i < count; i++) {
    const element = document.createElement("div");
    element.className = "floating-element";
    element.textContent = elements[Math.floor(Math.random() * elements.length)];

    gsap.set(element, {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: Math.random() * 0.4 + 0.6,
      rotation: Math.random() * 360,
    });

    gsap.to(element, {
      y: "+=300",
      rotation: 360,
      duration: Math.random() * 8 + 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    document.body.appendChild(element);
    floatingElements.push(element);
  }
};

const generateLyrics = () => {
  lyricsConfig.forEach((lyric, index) => {
    const div = document.createElement("div");
    div.className = `lyric${index === 0 ? " active" : ""}`;
    div.textContent = lyric.text;
    lyricsContainer.appendChild(div);
  });
};

const handleResize = () => {
  initParticles();
  createFloatingElements();
  gsap.set(".lyric", { clearProps: "all" });
};

const updateLyric = (newIndex) => {
  if (currentLyric >= 0) {
    gsap.to(lyrics[currentLyric], {
      opacity: 0,
      duration: lyricsConfig[currentLyric].fadeOut,
      ease: "power2.out",
    });
  }

  currentLyric = newIndex;
  gsap.fromTo(
    lyrics[currentLyric],
    { opacity: 0 },
    {
      opacity: 1,
      duration: lyricsConfig[currentLyric].fadeIn,
      ease: "power2.in",
    }
  );
};

// Event Listeners
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(handleResize, 500);
});

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const newLyricIndex = lyricsConfig.findIndex(
    (lyric, index) =>
      currentTime >= lyric.start &&
      (index === lyricsConfig.length - 1 ||
        currentTime < lyricsConfig[index + 1].start)
  );

  if (newLyricIndex !== -1 && newLyricIndex !== currentLyric) {
    updateLyric(newLyricIndex);
  }
});

// Inisialisasi
initParticles();
generateLyrics();
createFloatingElements();
const lyrics = document.querySelectorAll(".lyric");

// Auto-play handling
const playAudio = () =>
  audio.play().catch(() => {
    document.body.addEventListener("click", playAudio, { once: true });
  });
window.addEventListener("DOMContentLoaded", playAudio);
document.addEventListener("click", playAudio, { once: true });
