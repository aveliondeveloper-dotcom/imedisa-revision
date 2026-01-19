document.addEventListener("DOMContentLoaded", () => {
  const chat = document.getElementById("chat");
  const form = document.getElementById("chat-form");

  init();

  function init() {
    chat.innerHTML = "";
    IMEDISA_BRAIN.reset();
    push(
      "Asistente técnico IMEDISA. Iniciamos evaluación avanzada del equipo.",
      "bot"
    );
    next();
  }

  function next() {
    const step = IMEDISA_BRAIN.getCurrentStep();
    if (!step) return;
    push(step.q, "bot");
    render(step);
  }

  function render(step) {
    form.innerHTML = "";

    if (step.options) {
      const box = document.createElement("div");
      box.className = "chat-buttons";

      step.options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = opt;
        btn.onclick = () => select(opt);
        box.appendChild(btn);
      });

      form.appendChild(box);
      return;
    }

    form.innerHTML = `
      <input id="user-input" placeholder="Respuesta técnica…" />
      <button type="submit">Enviar</button>
    `;

    const input = form.querySelector("#user-input");
    input.focus();

    form.onsubmit = (e) => {
      e.preventDefault();
      if (input.value.trim()) select(input.value.trim());
    };
  }

  function select(value) {
    push(value, "user");

    const res = IMEDISA_BRAIN.handleInput(value);

    if (!res.done) {
      next();
      return;
    }

    push("Evaluación técnica completada.", "bot");
    push("Resumen listo para ingeniería IMEDISA.", "bot");

    form.innerHTML = `
      <div class="chat-actions">
        <button class="btn-whatsapp">Enviar a WhatsApp</button>
        <button class="btn-mail">Enviar por Email</button>
        <button class="btn-reset">Limpiar chat</button>
      </div>
    `;

    form.querySelector(".btn-whatsapp").onclick = () => {
      window.open(res.whatsapp, "_blank");
      setTimeout(init, 300);
    };

    form.querySelector(".btn-mail").onclick = () => {
      window.location.href = res.email;
      setTimeout(init, 300);
    };

    form.querySelector(".btn-reset").onclick = init;
  }

  function push(text, who) {
    const div = document.createElement("div");
    div.className = `message ${who}`;
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }
});
