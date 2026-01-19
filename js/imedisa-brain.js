const IMEDISA_BRAIN = {
  state: {},
  flow: [],
  stepIndex: 0,

  reset() {
    this.state = {
      empresa: null,
      contacto: null,
      telefono: null,
      ubicacion: null,

      numeroEquipos: null,
      impactoOperacion: null,

      equipo: null,
      energia: null,
      marca: null,
      modelo: null,
      capacidad: null,
      horasUso: null,

      estadoOperacion: null,
      entorno: null,
      cargaTrabajo: null,

      sistema: null,
      subSistema: null,
      sintomas: null,
      ruido: null,
      fugas: null,
      erroresElectronicos: null,
      severidadFalla: null,

      promoDetectado: null,
      nivelCriticidad: null,
      narrativaIngenieria: null,
    };

    this.flow = this.buildFlow();
    this.stepIndex = 0;
  },

  getCurrentStep() {
    return this.flow[this.stepIndex];
  },

  handleInput(value) {
    const step = this.getCurrentStep();
    this.state[step.key] = value;
    this.stepIndex++;

    if (this.stepIndex < this.flow.length) {
      return { done: false };
    }

    this.resolveDiagnosis();
    return this.buildConclusion();
  },

  /* ================= FLOW DINÁMICO ================= */

  buildFlow() {
    return [
      { key: "empresa", q: "Empresa o razón social." },
      { key: "contacto", q: "Responsable técnico." },
      { key: "telefono", q: "Teléfono de contacto." },
      { key: "ubicacion", q: "Ubicación del sitio." },

      {
        key: "numeroEquipos",
        q: "Número de equipos afectados.",
        options: ["1", "2", "3", "4", "5+"],
      },
      {
        key: "impactoOperacion",
        q: "Impacto en la operación.",
        options: ["Local", "Área", "Operación completa"],
      },

      {
        key: "equipo",
        q: "Tipo de equipo.",
        options: ["Montacargas", "Reach", "Patín"],
      },
      {
        key: "energia",
        q: "Tipo de energía.",
        options: ["Gas LP", "Gasolina"],
      },
      { key: "marca", q: "Marca del equipo." },
      { key: "modelo", q: "Modelo." },
      { key: "capacidad", q: "Capacidad nominal." },
      { key: "horasUso", q: "Horas acumuladas aproximadas." },

      {
        key: "estadoOperacion",
        q: "Estado del equipo.",
        options: ["Operando", "Operando con fallas", "Detenido"],
      },
      {
        key: "entorno",
        q: "Entorno de operación.",
        options: ["Interior", "Exterior", "Mixto"],
      },
      {
        key: "cargaTrabajo",
        q: "Nivel de carga habitual.",
        options: ["Ligera", "Media", "Alta"],
      },

      {
        key: "sistema",
        q: "Sistema principal afectado.",
        options: [
          "Motor",
          "Transmisión",
          "Hidráulico",
          "Eléctrico",
          "Control electrónico",
        ],
      },

      {
        key: "subSistema",
        q: "Parte específica del sistema.",
      },

      {
        key: "sintomas",
        q: "Describe el síntoma principal (pérdida de potencia, lentitud, vibración, error, etc.).",
      },

      {
        key: "ruido",
        q: "¿Se presentan ruidos anormales?",
        options: ["Sí", "No"],
      },
      {
        key: "fugas",
        q: "¿Existen fugas visibles?",
        options: ["Sí", "No"],
      },
      {
        key: "erroresElectronicos",
        q: "¿Presenta códigos o alarmas?",
        options: ["Sí", "No"],
      },
      {
        key: "severidadFalla",
        q: "Nivel de severidad.",
        options: ["Leve", "Media", "Crítica"],
      },
    ];
  },

  /* ================= DIAGNÓSTICO ================= */

  resolveDiagnosis() {
    const s = this.state;

    if (
      s.estadoOperacion === "Detenido" &&
      s.impactoOperacion === "Operación completa"
    ) {
      s.promoDetectado = "Panic Button";
      s.nivelCriticidad = "CRÍTICA";
      s.narrativaIngenieria =
        "Paro total con impacto operativo crítico. Se recomienda intervención inmediata con prioridad máxima.";
      return;
    }

    if (Number(s.horasUso) >= 8000 && s.severidadFalla === "Crítica") {
      s.promoDetectado = "Overhaul Industrial";
      s.nivelCriticidad = "ALTA";
      s.narrativaIngenieria =
        "Equipo con desgaste acumulado severo. La condición indica pérdida de confiabilidad estructural y alto riesgo de falla mayor.";
      return;
    }

    if (Number(s.numeroEquipos) >= 3) {
      s.promoDetectado = "Control de Flota";
      s.nivelCriticidad = "MEDIA";
      s.narrativaIngenieria =
        "Múltiples equipos con condiciones similares. Se recomienda estrategia integral de estabilización operativa.";
      return;
    }

    s.promoDetectado = "Ingeniería Focalizada";
    s.nivelCriticidad = "BAJA";
    s.narrativaIngenieria =
      "Falla localizada identificada. Intervención puntual recomendada para reducir tiempo y costo de paro.";
  },

  buildConclusion() {
    const s = this.state;

    const resumen = `
🛠️ PRE-DIAGNÓSTICO IMEDISA

Cliente:
• ${s.empresa}
• ${s.contacto}
• ${s.ubicacion}

Equipo:
• ${s.equipo} ${s.marca} ${s.modelo}
• Energía: ${s.energia}
• Horas: ${s.horasUso}

Falla:
• Sistema: ${s.sistema}
• Sub-sistema: ${s.subSistema}
• Síntomas: ${s.sintomas}

Recomendación:
• ${s.promoDetectado}
• Criticidad: ${s.nivelCriticidad}

Evaluación:
${s.narrativaIngenieria}
`.trim();

    return {
      done: true,
      whatsapp: `https://wa.me/525661621222?text=${encodeURIComponent(
        resumen
      )}`,
      email: `mailto:ingenieria@imedisa.com?subject=Pre-Diagnóstico Técnico IMEDISA&body=${encodeURIComponent(
        resumen
      )}`,
    };
  },
};

IMEDISA_BRAIN.reset();
