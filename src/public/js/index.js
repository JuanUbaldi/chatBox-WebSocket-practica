const socket = io();

//codigo del front

let nombreUsuario = "";
let gender = "";
async function pedirNombre() {
  const { value: formValues } = await Swal.fire({
    title: "coloca tu nombre y tu genero",
    html:
      '<input id="swal-input1" placeholder="nombre" class="swal2-input">' +
      '<input id="swal-input2" placeholder="genero (hombre, mujer, otro)"  class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value,
      ];
    },
  });

  if (formValues) {
    nombreUsuario = formValues[0];
    gender = formValues[1];
  }
}
pedirNombre();

const chatBox = document.getElementById("chat-box");
chatBox.addEventListener("keyup", ({ key }) => {
  if (key == "Enter") {
    socket.emit("FrontToBack", {
      user: nombreUsuario,
      msg: chatBox.value,
      genero: gender,
    });
    chatBox.value = "";
  }
});

socket.on("BackToFront", (msgs) => {
  let msgsFormateados = "";
  msgs.forEach((msg) => {
    if (msg.genero === "hombre") {
      msgsFormateados += `  <div class="clase1" >
 <p> ${msg.user} </p>
 
<p> ${msg.msg}</p> </div>
`;
    } else if (msg.genero === "mujer") {
      msgsFormateados += `  <div class="clase2" >
 <p> ${msg.user} </p>
 
<p> ${msg.msg}</p> </div>
`;
    } else if (msg.genero === "otro") {
      msgsFormateados += `  <div class="clase3" >
 <p> ${msg.user} </p>
 
<p> ${msg.msg}</p> </div>
`;
    }

    const divMsgs = document.getElementById("div-msgs");
    divMsgs.innerHTML = msgsFormateados;
  });
});
