/* ================= NAVBAR =================*/
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-hamburger]");
  if (!btn) return;
  btn.classList.toggle("active");
  const subHeader = document.querySelector("[data-sub-header]");
  if (subHeader) subHeader.classList.toggle("open");
}); /* ================= HERO VIDEO =================*/
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("heroVideo");
  if (!video) return;
  const LOOP_END = 29;
  video.addEventListener("loadedmetadata", () => {
    video.currentTime = 0;
    video.play().catch(() => {});
  });
  video.addEventListener("timeupdate", () => {
    if (video.currentTime >= LOOP_END) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  });
});
