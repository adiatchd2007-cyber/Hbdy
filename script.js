/* =========================================
   SOUND FX SYNTH (Web Audio API - No Files Needed!)
========================================= */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playCuteBoing() {
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(300, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.15);

  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.15);
}

/* =========================================
   PRELOADER
========================================= */
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 800);
    }
  }, 1000);
});

/* =========================================
   SCREEN CONTROLLER
========================================= */
function showScreen(id) {
  playCuteBoing();
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active");
  }
}

/* =========================================
   01. START JOURNEY & CAR SCENE
========================================= */
function startJourney() {
  const music = document.getElementById("bgMusic");
  if (music) {
    music.play().catch(() => {
      console.log("Audio needs user tap first.");
    });
  }

  showScreen("carSection");

  const carBox = document.getElementById("carBox");
  if (carBox) {
    carBox.classList.remove("drive");
    void carBox.offsetWidth; // trigger reflow
    carBox.classList.add("drive");
  }

  setTimeout(() => {
    const carText = document.getElementById("carText");
    if (carText) {
      carText.innerText = "Cruising into memory lane! 🌸🚗";
    }
  }, 2200);

  setTimeout(() => {
    showMemories();
  }, 4400);
}

/* =========================================
   MUSIC TOGGLE
========================================= */
function toggleMusic() {
  const music = document.getElementById("bgMusic");
  const icon = document.getElementById("musicIcon");

  if (!music) return;

  if (music.paused) {
    music.play();
    if (icon) icon.innerText = "🎵";
  } else {
    music.pause();
    if (icon) icon.innerText = "🔇";
  }
}

/* =========================================
   02. POLAROID MEMORIES
========================================= */
const memories = [
  {
    image: "assets/photos/01.jpg",
    caption: "Kisine sach hi kaha hai—Param Sundari! Frame me bas elegance aur grace dikh raha hai. ✨"
  },
  {
    image: "assets/photos/02.jpg",
    caption: "Itna aesthetic look! Bollywood walon ko casting ke liye direct idhar aana chahiye tha. 🤌📸"
  },
  {
    image: "assets/photos/03.jpg",
    caption: "Yeh smile 100 watt se bhi zyada bright hai! Pure positive and happy vibes. 🌸"
  },
  {
    image: "assets/photos/04.jpg",
    caption: "Royal aur sophisticated! Didi, is picture me aapka aura bilkul next-level lag raha hai. 👑"
  },
  {
    image: "assets/photos/05.jpg",
    caption: "Definition of perfection! Nazariya hi badal diya, ekdum iconic photo! 💖"
  }
];

let currentPhoto = 0;

function showMemories() {
  showScreen("memories");
  createDots();
  updatePhoto();
}

function updatePhoto() {
  const image = document.getElementById("memoryImage");
  const number = document.getElementById("memoryNumber");
  const caption = document.getElementById("memoryCaption");
  const polaroid = document.getElementById("polaroidCard");

  if (polaroid) {
    polaroid.style.transform = `rotate(${Math.random() * 6 - 3}deg) scale(0.96)`;
  }

  if (image) {
    image.style.opacity = "0";

    setTimeout(() => {
      image.src = memories[currentPhoto].image;
      if (caption) caption.innerText = memories[currentPhoto].caption;
      if (number) number.innerText = `POLAROID #${String(currentPhoto + 1).padStart(2, "0")}`;
      image.style.opacity = "1";
      if (polaroid) polaroid.style.transform = `rotate(${Math.random() * 6 - 3}deg) scale(1)`;
    }, 200);
  }

  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentPhoto);
  });
}

function createDots() {
  const container = document.getElementById("dots");
  if (!container) return;
  container.innerHTML = "";

  memories.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.onclick = () => {
      currentPhoto = index;
      updatePhoto();
    };
    container.appendChild(dot);
  });
}

function nextPhoto() {
  playCuteBoing();
  currentPhoto = (currentPhoto + 1) % memories.length;
  updatePhoto();
}

function previousPhoto() {
  playCuteBoing();
  currentPhoto = (currentPhoto - 1 + memories.length) % memories.length;
  updatePhoto();
}

/* =========================================
   03. VIDEO REEL
========================================= */
function showVideo() {
  showScreen("videoSection");
}

/* =========================================
   04. HANDWRITTEN LETTER
========================================= */
const letter = `Dear Didi,

Sach bolun toh mujhe nahi pata tha ki bina kisi bachpan ki dosti ya khoon ke rishte ke bhi koi itna apna ban sakta hai. 

Log kehte hain behen kismat se milti hai, par aapko Didi bana kar maine apni kismat khud upgrade kar li hai! 😂

Aapke hone se ek reassurance rehti hai ki haan, ek sensible insaan hai jo meri faltu baatein sun legi aur sahi time pe seedha rasta bhi dikha degi. 

Didi, main hamesha express nahi karta, but I genuinely respect and value you so much.

I hope ye birthday aapke liye dher saari khushiyan, success aur mental peace leke aaye. Aur haan... mujhe jhelne ki thodi extra patience bhi!

Stay amazing, stay crazy, Happy Birthday! 💖`;

let letterOpened = false;

function showLetter() {
  showScreen("letterSection");
}

function openLetter() {
  if (letterOpened) return;
  letterOpened = true;
  playCuteBoing();

  const envelopeCard = document.querySelector(".magic-envelope-card");
  if (envelopeCard) envelopeCard.classList.add("opened");

  const textElement = document.getElementById("letterText");
  if (!textElement) return;

  let index = 0;
  textElement.innerHTML = "";

  const typing = setInterval(() => {
    textElement.innerHTML += letter[index];
    index++;

    if (index >= letter.length) {
      clearInterval(typing);
      const nextBtn = document.getElementById("letterNext");
      if (nextBtn) nextBtn.classList.remove("hidden");
    }
  }, 22);
}

/* =========================================
   05. FLIP CARDS
========================================= */
function showThings() {
  showScreen("thingsSection");
}

function flipCard(card) {
  playCuteBoing();
  if (card) card.classList.toggle("flipped");
}

/* =========================================
   06. MYSTERY CAPSULES
========================================= */
function showMystery() {
  showScreen("mysterySection");
}

function openGift(number) {
  playCuteBoing();
  let emoji = "🎁";
  let message = "";

  if (number === 1) {
    emoji = "🏆";
    message = "CONGRATULATIONS: You won the 'Best Sister on Earth' trophy. (Non-refundable, no exchanges allowed!)";
  } else if (number === 2) {
    emoji = "🤫";
    message = "SECRET UNLOCKED: Even when we quarrel over TV remotes, I always brag about how awesome my Didi is!";
  } else if (number === 3) {
    emoji = "🚨";
    message = "Caught red handed! I told you NOT to tap this one! Your penalty: You owe me a treat today! 🍕😂";
  }

  showPopup(emoji, message);
}

function showPopup(emoji, message) {
  const popupEmoji = document.getElementById("popupEmoji");
  const popupText = document.getElementById("popupText");
  const popup = document.getElementById("popup");

  if (popupEmoji) popupEmoji.innerText = emoji;
  if (popupText) popupText.innerText = message;
  if (popup) popup.classList.add("show");
}

function closePopup() {
  playCuteBoing();
  const popup = document.getElementById("popup");
  if (popup) popup.classList.remove("show");
}

/* =========================================
   07. GRAND FINALE & CELEBRATION
========================================= */
function showFinal() {
  showScreen("finalSection");
  createStars();
}

function revealBirthday() {
  playCuteBoing();
  const reveal = document.getElementById("birthdayReveal");
  const btn = document.getElementById("revealBtn");

  if (reveal) reveal.classList.add("show");
  if (btn) btn.style.display = "none";

  launchConfetti();
}

/* =========================================
   CANVAS TWINKLE STARS
========================================= */
function createStars() {
  const canvas = document.getElementById("stars");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      alpha: Math.random()
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 209, 102, ${star.alpha})`;
      ctx.fill();

      star.alpha += (Math.random() - 0.5) * 0.05;
      star.alpha = Math.max(0.1, Math.min(1, star.alpha));
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* =========================================
   CARTOON CANNON CONFETTI
========================================= */
function launchConfetti() {
  const canvas = document.getElementById("confetti");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ["#ff6b9d", "#ffd166", "#06d6a0", "#4cc9f0", "#ffffff", "#c77dff"];

  for (let i = 0; i < 200; i++) {
    pieces.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: Math.random() * 10 + 6,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 18,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3; // Gravity
      p.rotation += 8;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

/* =========================================
   VIDEO AUDIO SMART SYNC
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const memoryVideo = document.getElementById("memoryVideo");
  const bgMusic = document.getElementById("bgMusic");

  if (memoryVideo) {
    // Video play hote hi background music pause
    memoryVideo.addEventListener("play", () => {
      if (bgMusic && !bgMusic.paused) {
        bgMusic.pause();
      }
    });

    // Video pause hone par background music resume
    memoryVideo.addEventListener("pause", () => {
      if (bgMusic && bgMusic.paused && !memoryVideo.ended) {
        bgMusic.play().catch(() => {});
      }
    });

    // Video khatam hote hi music resume aur letter screen open
    memoryVideo.addEventListener("ended", () => {
      if (bgMusic) {
        bgMusic.play().catch(() => {});
      }
      setTimeout(() => {
        showLetter();
      }, 1000);
    });
  }
});