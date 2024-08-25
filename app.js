document.addEventListener("DOMContentLoaded", () => {
    const textArea = document.querySelector(".form__input");
    const imagenMuneco = document.querySelector(".result__img");
    const loader = document.querySelector(".loader");
    const resultadoTitulo = document.querySelector(".result__title");
    const resultadoText = document.querySelector(".result__text");
    const botones = document.querySelectorAll(".form__btn");
    const botonCopiar = document.querySelector(".result__btn");

    /* Llaves de encriptación */
    const llaves = [
        ["e", "enter"],
        ["i", "imes"],
        ["a", "ai"],
        ["o", "ober"],
        ["u", "ufat"],
    ];

    // Función para encriptar el mensaje
    const encriptarMensaje = (mensaje) => {
        return llaves.reduce(
            (encriptado, [normal, encriptadoVal]) =>
                encriptado.replace(new RegExp(normal, "g"), encriptadoVal),
            mensaje
        );
    };

    // Función para desencriptar el mensaje
    const desencriptarMensaje = (mensaje) => {
        return llaves.reduce(
            (desencriptado, [normal, encriptadoVal]) =>
                desencriptado.replace(new RegExp(encriptadoVal, "g"), normal),
            mensaje
        );
    };

    // Mostrar loader mientras se escribe
    textArea.addEventListener("input", () => {
        imagenMuneco.style.display = "none";
        loader.style.display = "block";
        resultadoTitulo.textContent = "Capturando Mensaje.";
        resultadoText.textContent = "";
    });

    // Manejo de botones de encriptar y desencriptar
    botones.forEach((boton, index) => {
        boton.addEventListener("click", (e) => {
            e.preventDefault();
            let mensaje = textArea.value.toLowerCase();
            let resultado =
                index === 0
                    ? encriptarMensaje(mensaje)
                    : desencriptarMensaje(mensaje);
            loader.style.display = "none";
            resultadoText.textContent = resultado;
            resultadoTitulo.textContent = "El resultado es:";
            botonCopiar.classList.remove("hidden");
        });
    });

    // Copiar texto al portapapeles
    botonCopiar.addEventListener("click", () => {
        // Asegúrate de que el texto que se copia es el contenido de resultadoText
        const textoParaCopiar = resultadoText.textContent;
        navigator.clipboard.writeText(textoParaCopiar).then(() => {
            imagenMuneco.style.display = "block";
            loader.style.display = "none";
            resultadoTitulo.textContent = "El texto se copió";
            botonCopiar.classList.add("hidden");
            resultadoText.textContent = "";
        });
    });
});
