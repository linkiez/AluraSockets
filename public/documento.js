import { emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

const textoEditor = document.querySelector("#texto-editor");
const tituloDocumento = document.querySelector("#titulo-documento");

selecionarDocumento(nomeDocumento)

tituloDocumento.textContent = nomeDocumento || "Novo documento";

textoEditor.addEventListener("keyup", (evento) => {
    emitirTextoEditor({
        texto: textoEditor.value,
        nomeDocumento,
    });
});

export function atualizaTextoEditor(texto) {
    textoEditor.value = texto;
}
