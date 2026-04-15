const bookingForm = document.querySelector("[data-booking-form]");

if (bookingForm) {
  const feedback = bookingForm.querySelector("[data-form-feedback]");
  const arrivalInput = bookingForm.querySelector("#arrival");
  const departureInput = bookingForm.querySelector("#departure");
  const whatsappNumber = "39098520209";
  const today = new Date().toISOString().split("T")[0];

  arrivalInput.min = today;
  departureInput.min = today;

  arrivalInput.addEventListener("change", () => {
    departureInput.min = arrivalInput.value || today;
    if (departureInput.value && departureInput.value <= arrivalInput.value) departureInput.value = "";
  });

  function setFieldError(field, message) {
    const errorNode = bookingForm.querySelector(`[data-error-for="${field.id}"]`);
    field.setAttribute("aria-invalid", String(Boolean(message)));
    if (errorNode) errorNode.textContent = message || "";
  }

  function validateForm() {
    let isValid = true;
    const requiredFields = bookingForm.querySelectorAll("[required]");
    requiredFields.forEach((field) => {
      const value = field.value.trim();
      if (!value) {
        setFieldError(field, "Compila questo campo.");
        isValid = false;
        return;
      }
      setFieldError(field, "");
    });

    if (arrivalInput.value && departureInput.value && departureInput.value <= arrivalInput.value) {
      setFieldError(departureInput, "La partenza deve essere successiva all'arrivo.");
      isValid = false;
    }

    return isValid;
  }

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback.textContent = "";
    feedback.classList.remove("is-error");

    if (!validateForm()) {
      feedback.textContent = "Controlla i campi evidenziati prima di continuare.";
      feedback.classList.add("is-error");
      const firstInvalid = bookingForm.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData.entries());
    const message = [
      "Buongiorno, vorrei richiedere informazioni per una prenotazione.",
      `Nome: ${data.name}`,
      `Cognome: ${data.surname}`,
      `Arrivo: ${data.arrival}`,
      `Partenza: ${data.departure}`,
      `Camera: ${data.roomType}`,
      `Numero persone: ${data.guests}`,
      `Telefono: ${data.phone || "Non indicato"}`,
      `Richieste aggiuntive: ${data.notes || "Nessuna richiesta aggiuntiva"}`
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    feedback.textContent = "Ti stiamo portando su WhatsApp con il messaggio gia' compilato.";
    window.open(whatsappUrl, "_blank", "noopener");
  });
}
