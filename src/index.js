import Exclamation from "./assets/svg/Exclamation.js";
import ImageSearch from "./assets/svg/ImageSearch.js";
import Logo from "./assets/svg/Logo.js";

function App() {
  insertLogos();
  insertEvents();
  renderOutput();
}

function insertLogos() {
  HeaderLogo.innerHTML = Logo("header__logo");
  ExclamationLogo.innerHTML = Exclamation();
}

function insertEvents() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const textValue = form.elements.input_textarea.value;
    // If you want to encrypt text...
    if (e.submitter.id === "encrypter") {
      const textEncrypted = encrypt(textValue);
      renderOutput(textEncrypted);
      return;
    }
    // If you want to decrypt text...
    const textDecrypted = decrypt(textValue);
    renderOutput(textDecrypted);
  });
}

function renderOutput(text = "") {
  if (text) {
    output.innerHTML = `
    <div class="output-container--found">
      <p class="output__text-info output__text-info--results">${text}</p>
      <button class="app__btn app__btn--output">Copiar</button>
    </div>
    `;
    const buttonCopy = document.querySelector(".app__btn--output");
    buttonCopy.addEventListener("click", copy);
    return;
  }
  output.innerHTML = `
  <div class="output-container--not-found">
    ${ImageSearch()}
    <h2 class="output__title">Ningún mensaje fue encontrado</h2>
    <p class="output__text-info">Ingresa el texto que desees encriptar o desencriptar.</p>
  </div>
  `;
}

// Valid uppercase and accent from the textarea
function validFields(text) {
  let result = true;
  // Validate uppercase and accent
  for (let i = 0; i < text.length; i++) {
    const codeASCII = text[i].charCodeAt(0);
    const conditionUppercase = codeASCII >= 65 && codeASCII <= 90;
    const conditionAccent =
      codeASCII === 130 || (codeASCII >= 160 && codeASCII <= 163);
    if (conditionUppercase || conditionAccent) {
      result = false;
      break;
    }
  }

  return result;
}

// Return a text encrypted
function encrypt(text) {
  const textArray = text.split("");
  if (validFields(text)) {
    const textEncrypted = textArray.reduce((acc, word) => {
      if (word === "a") acc += "ai";
      if (word === "e") acc += "enter";
      if (word === "i") acc += "imes";
      if (word === "o") acc += "ober";
      if (word === "u") acc += "ufat";
      if (!["a", "e", "i", "o", "u"].includes(word)) acc += word;
      return acc;
    }, "");
    return textEncrypted;
  }
  return "";
}

// Return a text decrypted
function decrypt(text) {
  const arrayDecrypted = ["ai", "enter", "imes", "ober", "ufat"];
  const arrayToDecrypt = ["a", "e", "i", "o", "u"];
  if (validFields(text)) {
    let textDecrypt = text;
    for (let i = 0; i < arrayDecrypted.length; i++) {
      textDecrypt = textDecrypt.replaceAll(
        arrayDecrypted[i],
        arrayToDecrypt[i]
      );
    }
    return textDecrypt;
  }
  return "";
}

// Copy text
function copy() {
  const outputContent = document.querySelector(".output__text-info--results");
  navigator.clipboard.writeText(outputContent.innerText);
}

const HeaderLogo = document.querySelector(".header__logo-container");
const ExclamationLogo = document.querySelector(".input__information-logo");
const form = document.querySelector(".input__form");
const output = document.querySelector(".output-container");

App();
