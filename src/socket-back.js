import io from "./servidor.js";

const documentos = [
  {
    nome: "JavaScript",
    texto: "texto do documento JavaScript",
  },
  {
    nome: "Node",
    texto: "texto do documento node",
  },
  {
    nome: "Socket.io",
    texto: "texto do documento socket.io",
  },
];

io.on("connection", (socket) => {
  console.log("Novo usuário conectado! ID:", socket.id);

  socket.on("selecionar-documento", (nomeDocumento, devolverTexto) => {
    socket.join(nomeDocumento);
    const documento = encontrarTextoDocumento(nomeDocumento);

    if (documento) {
      devolverTexto(documento.texto);
    }
  });

  socket.on("texto-editor", ({ texto, nomeDocumento }) => {
    const documento = encontrarTextoDocumento(nomeDocumento);

    if (documento) {
      documento.texto = texto;
      socket.to(nomeDocumento).emit("texto-editor-clientes", texto);
    }
  });
});

function encontrarTextoDocumento(nomeDocumento) {
  const documento = documentos.find(
    (documento) => documento.nome === nomeDocumento
  );
  return documento.texto;
}
