/* ═══════════════════════════════════════════════════════════
   Apu Barua — Portfolio JavaScript
   Static Site  |  GitHub Pages Ready
   ═══════════════════════════════════════════════════════════ */

// ─── Custom Cursor ───────────────────────────────────────
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;
let rx = mx,
  ry = my;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});

function animateRing() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover effect on interactive elements
document
  .querySelectorAll("a, button, .skill-card, .project-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hovered");
      ring.classList.add("hovered");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hovered");
      ring.classList.remove("hovered");
    });
  });

// ─── Scroll Reveal ───────────────────────────────────────
const reveals = document.querySelectorAll(".reveal");
reveals.forEach((el) => el.classList.add("hidden"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("hidden");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);
reveals.forEach((el) => observer.observe(el));

// ─── Smooth Scroll ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ─── Nav Background on Scroll ───────────────────────────
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    nav.style.background = "rgba(10, 10, 15, 0.95)";
  } else {
    nav.style.background =
      "linear-gradient(to bottom, rgba(10,10,15,0.95), transparent)";
  }
});

// ─── Hero Role Text Animation ───────────────────────────
(function () {
  const roles = document.querySelectorAll(".hero-role");
  const wrapper = document.querySelector(".hero-role-animated");
  if (!roles.length || !wrapper) return;

  let current = 0;
  const total = roles.length;

  // Measure width by temporarily making role visible off-screen
  function measureRole(roleEl) {
    const clone = roleEl.cloneNode(true);
    clone.style.position = "fixed";
    clone.style.top = "-9999px";
    clone.style.left = "-9999px";
    clone.style.opacity = "1";
    clone.style.transform = "none";
    clone.style.visibility = "hidden";
    clone.style.display = "inline-block";
    clone.style.whiteSpace = "nowrap";
    clone.style.fontSize = window.getComputedStyle(roleEl.parentElement).fontSize;
    clone.style.fontFamily = window.getComputedStyle(roleEl.parentElement).fontFamily;
    clone.style.fontWeight = window.getComputedStyle(roleEl.parentElement).fontWeight;
    clone.style.letterSpacing = window.getComputedStyle(roleEl.parentElement).letterSpacing;
    document.body.appendChild(clone);
    const w = clone.offsetWidth;
    document.body.removeChild(clone);
    return w;
  }

  function setWidth() {
    const w = measureRole(roles[current]);
    wrapper.style.width = (w + 12) + "px"; // +12 for cursor space
  }

  // Wait for fonts then measure
  document.fonts.ready.then(() => {
    setWidth();
  });
  window.addEventListener("resize", setWidth);

  setInterval(() => {
    // Current one exits up
    roles[current].classList.remove("active");
    roles[current].classList.add("exit-up");

    // Next one enters
    const next = (current + 1) % total;
    roles[next].classList.add("active");

    // Clean up exit class after animation
    const prev = current;
    setTimeout(() => {
      roles[prev].classList.remove("exit-up");
    }, 600);

    current = next;

    // Update width for new text
    const w = measureRole(roles[current]);
    wrapper.style.width = (w + 12) + "px";
  }, 2500);
})();
