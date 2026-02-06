const messages = [
  "💖 Happy Valentine’s Day",
  "🌸 You make my days brighter",
  "😊 Your smile means more than you know",
  "✨ I’m really lucky to have you",
  "❤️ Scroll down for something special"
];

let current = 0;
let startX = 0;
let dragging = false;

const swipeBox = document.getElementById("swipeBox");
const swipeText = document.getElementById("swipeText");
const scrollHint = document.getElementById("scrollHint");
const finalSection = document.getElementById("final");

function unlock() {
  swipeBox.classList.remove("hidden");
  swipeText.textContent = messages[0];
}

/* TOUCH */
swipeBox.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

swipeBox.addEventListener("touchend", e => {
  handleSwipe(startX, e.changedTouches[0].clientX);
});

/* MOUSE */
swipeBox.addEventListener("mousedown", e => {
  startX = e.clientX;
  dragging = true;
});

swipeBox.addEventListener("mouseup", e => {
  if (!dragging) return;
  dragging = false;
  handleSwipe(startX, e.clientX);
});

/* Swipe Logic */
function handleSwipe(start, end) {
  const diff = start - end;
  if (Math.abs(diff) < 60) return;

  if (diff > 0 && current < messages.length - 1) {
    current++;
  } else if (diff < 0 && current > 0) {
    current--;
  }

  swipeText.textContent = messages[current];

  if (current === messages.length - 1) {
    scrollHint.textContent = "⬇ Scroll down 💕";
  }
}

/* Reveal photo on scroll */
window.addEventListener("scroll", () => {
  const trigger = finalSection.offsetTop - window.innerHeight + 120;
  if (window.scrollY > trigger) {
    finalSection.classList.add("show");
  }
});

/* Floating Hearts */
const hearts = document.querySelector(".hearts");

setInterval(() => {
  const heart = document.createElement("span");
  heart.textContent = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 4 + Math.random() * 3 + "s";
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}, 600);
