const passwordInput = document.getElementById("password");

const copyBtn = document.getElementById("copyBtn");

const generateBtn = document.getElementById("generateBtn");

const lengthSlider = document.getElementById("length");

const lengthValue = document.getElementById("lengthValue");

const uppercaseCheckbox = document.getElementById("uppercase");

const lowercaseCheckbox = document.getElementById("lowercase");

const numbersCheckbox = document.getElementById("numbers");

const symbolsCheckbox = document.getElementById("symbols");

const strengthFill = document.getElementById("strengthFill");

const strengthText = document.getElementById("strengthText");


// Atualiza o valor do tamanho
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});


// Função para gerar senha
function generatePassword() {

  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";

  const numberChars = "0123456789";

  const symbolChars = "!@#$%^&*()_+[]{}<>?/|";

  let allChars = "";

  let password = "";

  if (uppercaseCheckbox.checked) {
    allChars += uppercaseChars;
  }

  if (lowercaseCheckbox.checked) {
    allChars += lowercaseChars;
  }

  if (numbersCheckbox.checked) {
    allChars += numberChars;
  }

  if (symbolsCheckbox.checked) {
    allChars += symbolChars;
  }

  // Verifica se pelo menos uma opção foi marcada
  if (allChars === "") {
    alert("Selecione pelo menos uma opção.");
    return;
  }

  const passwordLength = Number(lengthSlider.value);

  for (let i = 0; i < passwordLength; i++) {

    const randomIndex = Math.floor(Math.random() * allChars.length);

    password += allChars[randomIndex];
  }

  passwordInput.value = password;

  updateStrength(password);
}


// Função para copiar senha
copyBtn.addEventListener("click", async () => {

  if (passwordInput.value === "") {
    alert("Gere uma senha primeiro.");
    return;
  }

  try {

    await navigator.clipboard.writeText(passwordInput.value);

    copyBtn.textContent = "Copiado!";

    setTimeout(() => {
      copyBtn.textContent = "Copiar";
    }, 2000);

  } catch (error) {

    alert("Erro ao copiar a senha.");

  }

});


// Atualiza força da senha
function updateStrength(password) {

  let strength = 0;

  if (password.length >= 8) strength++;

  if (password.length >= 12) strength++;

  if (/[A-Z]/.test(password)) strength++;

  if (/[0-9]/.test(password)) strength++;

  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) {

    strengthFill.style.width = "33%";
    strengthFill.style.background = "#ff4d4d";

    strengthText.textContent = "Fraca";

  } else if (strength <= 4) {

    strengthFill.style.width = "66%";
    strengthFill.style.background = "#ffaa00";

    strengthText.textContent = "Média";

  } else {

    strengthFill.style.width = "100%";
    strengthFill.style.background = "#00ff88";

    strengthText.textContent = "Forte";

  }

}


// Evento do botão gerar
generateBtn.addEventListener("click", generatePassword);


// Gera senha inicial ao abrir
generatePassword();