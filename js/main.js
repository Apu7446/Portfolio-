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
