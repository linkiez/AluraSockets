import { atualizaTextoEditor } from "./documento.js";

const socket = io();

export function selecionarDocumento(nomeDocumento) {
  socket.emit("selecionar-documento", nomeDocumento, (texto) => {
    atualizaTextoEditor(texto);
  });
}

export function emitirTextoEditor(dados) {
  socket.emit("texto-editor", dados);
}

socket.on("texto-editor-clientes", (texto) => {
  atualizaTextoEditor(texto);
});
