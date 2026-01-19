export async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Error cargando ${path}`);
  return res.json();
}

export function qs(selector) {
  return document.querySelector(selector);
}

export function createEl(tag, className, content) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (content) el.textContent = content;
  return el;
}
