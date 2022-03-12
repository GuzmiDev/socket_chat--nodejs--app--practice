let usuario = null;
let socket = null;
const url = "http://localhost:8080/api/auth/";

// Referencias html
const txtUid = document.querySelector("#txtUid");
const txtMensaje = document.querySelector("#txtMensaje");
const ulUsuario = document.querySelector("#ulUsuario");
const ulMensajes = document.querySelector("#ulMensajes");
const btnSalir = document.querySelector("#btnSalir");

// validar el token del localstorage
const validarJWT = async () => {
  const token = localStorage.getItem("token") || "";

  if (token.length <= 10) {
    window.location = "index.html";
    throw new Error("No hay token en el servidor");
  }

  const resp = await fetch(url, {
    headers: { "x-token": token },
  });

  const { usuario: userDB, token: tokenDB } = await resp.json();
  localStorage.setItem("token", tokenDB);
  usuario = userDB;
  document.title = usuario.nombre;

  await conectarSocket();
};

const conectarSocket = async () => {
  socket = io({
    extraHeaders: {
      "x-token": localStorage.getItem("token"),
    },
  });

  socket.on("connect", () => {
    console.log("Sockets online");
  });

  socket.on("disconnect", () => {
    console.log("Sockets offline");
  });

  socket.on("recibir-mensaje", () => {
    // TODO:
  });

  socket.on("usuarios-activos", () => {
    // TODO:
  });

  socket.on("mensaje-privado", () => {
    // TODO:
  });
};

const main = async () => {
  await validarJWT();
};

main();