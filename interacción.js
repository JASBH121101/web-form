
"use strict";

/* =========================================
   CONTACT FORM UI
   Bilingual form, validation and demo state
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const subjectSelect = document.getElementById("subject");
  const characterCount = document.getElementById("character-count");
  const statusBox = document.getElementById("form-status");
  const submitButton = document.getElementById("submit-button");
  const buttonText = document.getElementById("button-text");
  const spanishButton = document.getElementById("lang-es");
  const englishButton = document.getElementById("lang-en");

  if (
    !form || !nameInput || !emailInput || !messageInput ||
    !subjectSelect || !characterCount || !statusBox ||
    !submitButton || !buttonText || !spanishButton || !englishButton
  ) {
    console.error("Contact Form UI: faltan elementos HTML. Revisá que los tres archivos correspondan a la misma versión.");
    return;
  }

  let currentLanguage = "es";
  let currentStatusKey = "";

  const translations = {
    es: {
      languageLabel: "Idioma",
      availability: "DISPONIBLE PARA NUEVOS PROYECTOS",
      eyebrow: "HABLEMOS DE TU PRÓXIMA IDEA",
      heroTitle: "Hagámoslo",
      heroDescription: "¿Tenés un proyecto en mente? Contame qué estás construyendo. Me encantaría conocer tu idea.",
      infoKicker: "CONECTEMOS",
      infoTitle: "Las grandes ideas empiezan con una conversación.",
      infoDescription: "Compartí tus ideas, hacé una consulta o contame qué desafío querés resolver.",
      emailTitle: "Escribime",
      emailDescription: "Contame qué necesitás.",
      responseTitle: "Respuesta rápida",
      responseDescription: "La meta es responder en 1–2 días hábiles.",
      demoLabel: "PROYECTO DEMO",
      portfolioLabel: "Diseñado para portafolio frontend",
      formKicker: "FORMULARIO DE CONTACTO",
      requiredText: "Obligatorio",
      formTitle: "Mandame un mensaje",
      formDescription: "Completá los campos y contame un poco sobre tu proyecto.",
      nameLabel: "Nombre completo",
      namePlaceholder: "Tu nombre",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "vos@ejemplo.com",
      subjectLabel: "¿Sobre qué querés hablar?",
      subjectGeneral: "Consulta general",
      subjectDesign: "Diseño web",
      subjectDevelopment: "Desarrollo web",
      subjectCollaboration: "Colaboración",
      subjectOther: "Otro",
      messageLabel: "Tu mensaje",
      messagePlaceholder: "Contame un poco sobre tu proyecto...",
      submitButton: "Enviar mensaje",
      disclaimer: "Esta es una demostración de portafolio. No se enviará ningún correo.",
      footerText: "Diseñado y desarrollado como proyecto de portafolio frontend.",
      bottomCaption: "DISEÑADO PARA CONECTAR · CONSTRUIDO PARA DESTACAR",
      nameRequired: "El nombre completo es obligatorio.",
      nameMin: "El nombre debe tener al menos 2 caracteres.",
      nameMax: "El nombre no puede superar los 80 caracteres.",
      emailRequired: "El correo electrónico es obligatorio.",
      emailInvalid: "Ingresá una dirección de correo válida.",
      emailMax: "El correo no puede superar los 254 caracteres.",
      messageRequired: "El mensaje es obligatorio.",
      messageMin: "El mensaje debe tener al menos 10 caracteres.",
      messageMax: "El mensaje no puede superar los 1000 caracteres.",
      selectFields: "Revisá los campos marcados e intentá de nuevo.",
      demoSuccess: "¡Validación correcta! Esta es una demostración; no se envió ningún correo.",
      validatedButton: "Validado correctamente"
    },

    en: {
      languageLabel: "Language",
      availability: "AVAILABLE FOR NEW PROJECTS",
      eyebrow: "LET'S TALK ABOUT YOUR NEXT IDEA",
      heroTitle: "Let's build",
      heroDescription: "Have a project in mind? Tell me what you're building. I'd love to hear your idea.",
      infoKicker: "LET'S CONNECT",
      infoTitle: "Great ideas start with a conversation.",
      infoDescription: "Share your ideas, ask a question, or tell me about a challenge you want to solve.",
      emailTitle: "Email me",
      emailDescription: "Tell me what you need.",
      responseTitle: "Quick response",
      responseDescription: "The goal is to respond within 1–2 business days.",
      demoLabel: "DEMO PROJECT",
      portfolioLabel: "Designed for a frontend portfolio",
      formKicker: "CONTACT FORM",
      requiredText: "Required",
      formTitle: "Send me a message",
      formDescription: "Complete the fields below and tell me a little about your project.",
      nameLabel: "Full name",
      namePlaceholder: "Your name",
      emailLabel: "Email address",
      emailPlaceholder: "you@example.com",
      subjectLabel: "What would you like to discuss?",
      subjectGeneral: "General inquiry",
      subjectDesign: "Web design",
      subjectDevelopment: "Web development",
      subjectCollaboration: "Collaboration",
      subjectOther: "Other",
      messageLabel: "Your message",
      messagePlaceholder: "Tell me a little about your project...",
      submitButton: "Send message",
      disclaimer: "This is a portfolio demo. No email will be sent.",
      footerText: "Designed and developed as a frontend portfolio project.",
      bottomCaption: "DESIGNED TO CONNECT · BUILT TO STAND OUT",
      nameRequired: "Full name is required.",
      nameMin: "Full name must contain at least 2 characters.",
      nameMax: "Full name cannot exceed 80 characters.",
      emailRequired: "Email address is required.",
      emailInvalid: "Please enter a valid email address.",
      emailMax: "Email address cannot exceed 254 characters.",
      messageRequired: "Your message is required.",
      messageMin: "Your message must contain at least 10 characters.",
      messageMax: "Your message cannot exceed 1000 characters.",
      selectFields: "Please check the highlighted fields and try again.",
      demoSuccess: "Validation successful! This is a demo, so no email was sent.",
      validatedButton: "Validated successfully"
    }
  };

  const fields = [
    { input: nameInput, errorId: "name-error", key: "name" },
    { input: emailInput, errorId: "email-error", key: "email" },
    { input: messageInput, errorId: "message-error", key: "message" }
  ];

  function t(key) {
    return translations[currentLanguage][key] || key;
  }

  /* Language selector */

  function applyTranslations() {
    document.documentElement.lang = currentLanguage;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;

      if (Object.prototype.hasOwnProperty.call(translations[currentLanguage], key)) {
        element.textContent = t(key);
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.dataset.i18nPlaceholder;

      if (Object.prototype.hasOwnProperty.call(translations[currentLanguage], key)) {
        element.placeholder = t(key);
      }
    });

    spanishButton.classList.toggle("active", currentLanguage === "es");
    englishButton.classList.toggle("active", currentLanguage === "en");

    spanishButton.setAttribute("aria-pressed", String(currentLanguage === "es"));
    englishButton.setAttribute("aria-pressed", String(currentLanguage === "en"));

    spanishButton.setAttribute("aria-label", currentLanguage === "es" ? "Español seleccionado" : "Cambiar a español");
    englishButton.setAttribute("aria-label", currentLanguage === "en" ? "English selected" : "Switch to English");

    fields.forEach((field) => {
      if (field.input.classList.contains("is-invalid")) {
        validateField(field);
      }
    });

    updateCharacterCount();

    if (currentStatusKey) {
      showStatus(
        t(currentStatusKey),
        currentStatusKey === "demoSuccess" ? "success" : "error",
        currentStatusKey
      );
    }

    buttonText.textContent = submitButton.classList.contains("is-success")
      ? t("validatedButton")
      : t("submitButton");
  }

  function changeLanguage(language) {
    if (!Object.prototype.hasOwnProperty.call(translations, language)) return;
    if (language === currentLanguage) return;

    currentLanguage = language;
    applyTranslations();
  }

  spanishButton.addEventListener("click", () => changeLanguage("es"));
  englishButton.addEventListener("click", () => changeLanguage("en"));

  /* Character counter */

  function updateCharacterCount() {
    const currentLength = messageInput.value.length;
    const maximumLength = messageInput.maxLength;

    characterCount.textContent = `${currentLength} / ${maximumLength}`;
    characterCount.classList.toggle(
      "near-limit",
      currentLength >= maximumLength * 0.8 && currentLength < maximumLength
    );
    characterCount.classList.toggle("at-limit", currentLength >= maximumLength);
  }

  messageInput.addEventListener("input", updateCharacterCount);

  /* Status messages */

  function showStatus(message, type, key = "") {
    statusBox.textContent = message;
    currentStatusKey = key;

    statusBox.classList.remove("hidden", "status-success", "status-error");
    statusBox.classList.add(type === "success" ? "status-success" : "status-error");
  }

  function hideStatus() {
    statusBox.textContent = "";
    currentStatusKey = "";
    statusBox.classList.add("hidden");
    statusBox.classList.remove("status-success", "status-error");
  }

  /* Field error helpers */

  function setFieldError(input, errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (!errorElement) return;

    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    input.setAttribute("aria-invalid", "true");

    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
  }

  function clearFieldError(input, errorId) {
    const errorElement = document.getElementById(errorId);
    if (!errorElement) return;

    input.classList.remove("is-invalid");
    input.removeAttribute("aria-invalid");
    errorElement.textContent = "";
    errorElement.classList.add("hidden");
  }

  function markFieldValid(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    input.setAttribute("aria-invalid", "false");
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* Field validation */

  function validateField(field) {
    const input = field.input;
    const value = input.value.trim();
    const prefix = field.key;

    clearFieldError(input, field.errorId);

    if (input.required && value.length === 0) {
      setFieldError(input, field.errorId, t(`${prefix}Required`));
      return false;
    }

    if (input.minLength > 0 && value.length < input.minLength) {
      setFieldError(input, field.errorId, t(`${prefix}Min`));
      return false;
    }

    if (input.maxLength > 0 && value.length > input.maxLength) {
      setFieldError(input, field.errorId, t(`${prefix}Max`));
      return false;
    }

    if (input === emailInput && !isValidEmail(value)) {
      setFieldError(input, field.errorId, t("emailInvalid"));
      return false;
    }

    markFieldValid(input);
    return true;
  }

  /* Live validation */

  fields.forEach((field) => {
    field.input.addEventListener("input", () => {
      if (
        field.input.classList.contains("is-invalid") ||
        field.input.classList.contains("is-valid")
      ) {
        validateField(field);
      }

      hideStatus();
    });

    field.input.addEventListener("blur", () => {
      if (field.input.value.trim().length > 0) {
        validateField(field);
      }
    });
  });

  subjectSelect.addEventListener("change", hideStatus);

  /* Submit: demonstration only */

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    hideStatus();

    const valid = fields.map(validateField).every(Boolean);

    if (!valid) {
      const firstInvalid = fields.find((field) =>
        field.input.classList.contains("is-invalid")
      );

      if (firstInvalid) firstInvalid.input.focus();

      showStatus(t("selectFields"), "error", "selectFields");
      return;
    }

    showStatus(t("demoSuccess"), "success", "demoSuccess");
    buttonText.textContent = t("validatedButton");
    submitButton.classList.add("is-success");
    statusBox.focus();

    console.info("Contact Form UI: demo validation completed. No email was sent.");
  });

  /* Reset */

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      fields.forEach((field) => {
        clearFieldError(field.input, field.errorId);
        field.input.classList.remove("is-valid");
      });

      updateCharacterCount();
      hideStatus();
      buttonText.textContent = t("submitButton");
      submitButton.classList.remove("is-success");
    }, 0);
  });

  /* Initial state */

  applyTranslations();
  updateCharacterCount();

  console.info("Contact Form UI initialized successfully.");
});
