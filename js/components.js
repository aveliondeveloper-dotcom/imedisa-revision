async function loadComponent(selector, url) {
  const container = document.querySelector(selector);
  if (!container) return;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error loading ${url}`);
    container.innerHTML = await res.text();
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("#navbar", "partials/navbar.html");

  loadComponent("#footer", "partials/footer.html");
});
