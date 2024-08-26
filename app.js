const d = document;
const textArea = d.querySelector(".form__input");
const imagenMuneco = d.querySelector(".result__img");
const loaderBatman = d.querySelector(".loader");
const resultadoTitulo = d.querySelector(".result__title");
const resultadoText = d.querySelector(".result__text");
const botonEncriptar = d.querySelector(".form__btn");
const botonDesencriptar = d.querySelectorAll(".form__btn");
const botonCopiar = d.querySelector(".result__btn");

const llaves = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"],
];

// Función para encriptar
function ecriptartexto(texto) {
  let textoEncriptado = "";
  for (let i = 0; i < texto.length; i++) {
    let letra = texto[i];
    let encriptada = letra;
    for (let j = 0; j < llaves.length; j++) {
      if (letra === llaves[j][0]) {
        encriptada = llaves[j][1]; // Reemplaza la letra por su equivalente encriptado
        break; // Termina el bucle cuando se encuentra la correspondencia
      }
    }
    textoEncriptado += encriptada;
  }
  return textoEncriptado;
}

// Función para desencriptar
function desencriptartexto(texto) {
  let textoDesencriptado = texto;
  for (let i = 0; i < llaves.length; i++) {
    let regex = new RegExp(llaves[i][1], "g");
    textoDesencriptado = textoDesencriptado.replace(regex, llaves[i][0]); // Reemplaza el texto encriptado por su equivalente original
  }
  return textoDesencriptado; // Devuelve el texto desencriptado
}

// Función para validación de texto
function checkString(text) {
  const validRegex = /^[a-z\s]+$/; // Solo letras minúsculas y espacios
  if (!validRegex.test(text)) {
    alert("El texto no puede contener letras mayúsculas, acentos, o caracteres especiales.");
    return false;
  }
  return true;
}

// Función del botón encriptar
botonEncriptar.addEventListener("click", (e) => {
  e.preventDefault();
  let texto = textArea.value; // NO transformar a minúsculas antes de la validación
  if (checkString(texto)) {
    texto = texto.toLowerCase(); // Ahora transformamos a minúsculas
    let textoEncriptado = ecriptartexto(texto);
    resultadoText.textContent = textoEncriptado;
    botonCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "El resultado es:";
  }
});

botonDesencriptar[1].addEventListener("click", (e) => {
  e.preventDefault();
  let texto = textArea.value; // NO transformar a minúsculas antes de la validación
  if (checkString(texto)) {
    texto = texto.toLowerCase(); // Ahora transformamos a minúsculas
    let textoDesencriptado = desencriptartexto(texto);
    resultadoText.textContent = textoDesencriptado;
    resultadoTitulo.textContent = "El resultado es:";
    botonCopiar.classList.remove("hidden");
  }
});

botonCopiar.addEventListener("click", () => {
  let textoCopiado = resultadoText.textContent;
  navigator.clipboard.writeText(textoCopiado).then(() => {
    imagenMuneco.style.display = "block";
    loaderBatman.classList.add("hidden");
    resultadoTitulo.textContent = "El texto se copió";
    botonCopiar.classList.add("hidden");
    resultadoText.textContent = "";
  });
});
